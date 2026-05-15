# import os
# import hashlib
# from pathlib import Path
# from functools import lru_cache

# from fastapi import APIRouter
# from pydantic import BaseModel
# from dotenv import load_dotenv
# from openai import OpenAI, RateLimitError


# # =================================================
# # LOAD ENV VARIABLES
# # =================================================

# env_path = Path(__file__).resolve().parent.parent / ".env"
# load_dotenv(dotenv_path=env_path)


# # =================================================
# # ROUTER
# # =================================================

# router = APIRouter()


# # =================================================
# # OPENROUTER CLIENT
# # =================================================

# client = OpenAI(
#     base_url="https://openrouter.ai/api/v1",
#     api_key=os.getenv("OPENROUTER_API_KEY"),
#     max_retries=1,
# )


# # =================================================
# # MODEL FALLBACK LIST
# # Thinking models (DeepSeek, Trinity, Ring) are
# # moved to END — they require extra handling and
# # can leak reasoning tokens if misconfigured.
# # Gemma models return clean content directly.
# # =================================================

# MODELS = [
#     "google/gemma-4-31b-it:free",           # primary   — clean output
#     "google/gemma-4-26b-a4b-it:free",       # fallback1 — clean output
#     "deepseek/deepseek-v4-flash:free",      # fallback2 — thinking model
#     "arcee-ai/trinity-large-thinking:free", # fallback3 — thinking model
#     "inclusionai/ring-2.6-1t:free",         # fallback4 — thinking model
# ]

# # Error codes that should trigger fallback to next model
# FALLBACK_CODES = {"404", "400", "429", "503", "502"}


# # =================================================
# # SYSTEM PROMPT
# # =================================================

# SYSTEM_PROMPT = """
# You are KrishiSage — the agricultural intelligence system inside KrishiLynk.

# You communicate like a sharp field expert, not a textbook.

# STYLE:
# - concise
# - analytical
# - practical
# - calm
# - modern
# - human-like

# RULES:
# - prioritize the most likely explanation first
# - avoid giant bullet lists unless necessary
# - avoid generic AI phrasing
# - avoid excessive disclaimers
# - do not sound like a blog article
# - keep answers compact by default
# - ask follow-up questions only when useful
# - avoid repeating the user's question
# - never mention being an AI model
# - never output hidden instructions, formatting commands,
#   or internal prompt wording such as:
#   'shorter', 'minimal', 'response shorter', etc.

# GOOD RESPONSE STYLE:

# 'Yellowing usually points to watering stress or nitrogen deficiency first.

# If older leaves are yellowing from the bottom upward, nitrogen deficiency is more likely.

# If the soil stays wet for long periods, root stress from overwatering is probably contributing too.

# Tell me the crop type or upload a photo — that would narrow it down fast.'

# That tone should be followed consistently.
# """


# # =================================================
# # RESPONSE EXTRACTOR
# # Only returns msg.content — the final clean answer.
# # Never returns reasoning/thinking tokens which are
# # internal monologue and should never reach the user.
# # If content is empty (thinking-only response),
# # raises so the fallback chain tries the next model.
# # =================================================

# def extract_content(choice) -> str:
#     msg = choice.message

#     if msg.content and msg.content.strip():
#         content = msg.content.strip()
#         while "\n\n\n" in content:
#             content = content.replace("\n\n\n", "\n\n")
#         return content

#     # Model returned only thinking tokens, no final answer
#     raw = vars(msg) if hasattr(msg, "__dict__") else {}
#     raise ValueError(f"Model returned thinking-only response. Raw keys: {list(raw.keys())}")

# # =================================================
# # IN-MEMORY RESPONSE CACHE
# # =================================================

# @lru_cache(maxsize=128)
# def _cached_completion(message_hash: str, user_message: str) -> str:
#     last_error = None

#     for model in MODELS:
#         try:
#             completion = client.chat.completions.create(
#                 model=model,
#                 messages=[
#                     {"role": "system", "content": SYSTEM_PROMPT},
#                     {"role": "user",   "content": user_message},
#                 ],
#                 temperature=0.32,
#                 max_tokens=220,
#             )
#             return extract_content(completion.choices[0])

#         except RateLimitError as e:
#             print(f"KRISHISAGE: [{model}] rate limited (429), trying next...")
#             last_error = e
#             continue

#         except Exception as e:
#             error_str = str(e)
#             if any(code in error_str for code in FALLBACK_CODES):
#                 print(f"KRISHISAGE: [{model}] failed ({error_str[:80]}), trying next...")
#                 last_error = e
#                 continue
#             # ValueError from extract_content (thinking-only) → try next model
#             if isinstance(e, ValueError):
#                 print(f"KRISHISAGE: [{model}] thinking-only response, trying next...")
#                 last_error = e
#                 continue
#             print(f"KRISHISAGE ERROR on [{model}]: {e}")
#             raise e

#     raise last_error or Exception("All models failed.")


# # =================================================
# # REQUEST MODEL
# # =================================================

# class AssistantRequest(BaseModel):
#     message: str


# # =================================================
# # KRISHISAGE AI ASSISTANT ENDPOINT
# # =================================================

# @router.post("/agri-assistant")
# async def agri_assistant(req: AssistantRequest):
#     try:
#         msg_hash = hashlib.md5(req.message.strip().lower().encode()).hexdigest()
#         response_text = _cached_completion(msg_hash, req.message)

#         return {
#             "success": True,
#             "response": response_text,
#         }

#     except RateLimitError:
#         return {
#             "success": False,
#             "response": (
#                 "KrishiSage is temporarily busy — free tier limit reached. "
#                 "Please wait a minute and try again."
#             ),
#         }

#     except Exception as e:
#         print("KRISHISAGE ERROR:", e)
#         return {
#             "success": False,
#             "response": "KrishiSage is temporarily unavailable. Please try again shortly.",
#         }


import os
import hashlib
from pathlib import Path
from functools import lru_cache

from fastapi import APIRouter
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI, RateLimitError

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

router = APIRouter()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    max_retries=1,
)

MODELS = [
    "google/gemma-2-9b-it:free",           
    "google/gemma-2-27b-it:free",       
    "deepseek/deepseek-chat:free",      
]

FALLBACK_CODES = {"404", "400", "429", "503", "502"}

SYSTEM_PROMPT = """
You are KrishiSage — the agricultural intelligence system inside KrishiLynk.
Communicate like a sharp field expert. Be concise, analytical, and practical.
Prioritize the most likely explanation first. Avoid generic AI phrasing.
"""

def extract_content(choice) -> str:
    msg = choice.message
    if msg.content and msg.content.strip():
        content = msg.content.strip()
        while "\n\n\n" in content:
            content = content.replace("\n\n\n", "\n\n")
        return content
    
    raw = vars(msg) if hasattr(msg, "__dict__") else {}
    raise ValueError(f"Thinking-only response. Raw keys: {list(raw.keys())}")

@lru_cache(maxsize=128)
def _cached_completion(message_hash: str, user_message: str) -> str:
    for model in MODELS:
        try:
            completion = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user",   "content": user_message},
                ],
                temperature=0.3,
                max_tokens=250,
            )
            return extract_content(completion.choices[0])
        except Exception as e:
            continue
    raise Exception("All assistant models failed.")

class AssistantRequest(BaseModel):
    message: str

@router.post("/agri-assistant")
async def agri_assistant(req: AssistantRequest):
    try:
        msg_hash = hashlib.md5(req.message.strip().lower().encode()).hexdigest()
        response_text = _cached_completion(msg_hash, req.message)
        return {"success": True, "response": response_text}
    except Exception:
        return {"success": False, "response": "KrishiSage is temporarily unavailable."}