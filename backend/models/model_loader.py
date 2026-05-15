# import logging
# import os
# import threading
# import requests
# import zipfile
# import io
# from pathlib import Path
# from typing import Dict, Optional, Tuple

# import torch
# import torch.nn as nn

# from models.architectures import (
#     ALL_ARCHITECTURES,
#     ArchitectureConfig,
#     CLASS_NAMES,
# )

# logger = logging.getLogger(__name__)

# # Weights directory — defaults to 'weights' folder
# WEIGHTS_DIR = Path(os.getenv("WEIGHTS_DIR", "weights"))

# # Your Hugging Face Zip Links
# WEIGHTS_MAP = {
#     "densenet121_best.pth": "https://huggingface.co/prasharindustries/krishilynk-weights/resolve/main/densenet121_best.pth.zip",
#     "efficientnet_best.pth": "https://huggingface.co/prasharindustries/krishilynk-weights/resolve/main/efficientnet_best.pth.zip",
#     "resnet18_best.pth": "https://huggingface.co/prasharindustries/krishilynk-weights/resolve/main/resnet18_best.pth.zip"
# }

# class ModelRegistry:
#     _instance: Optional["ModelRegistry"] = None
#     _lock = threading.Lock()

#     def __new__(cls):
#         if cls._instance is None:
#             with cls._lock:
#                 if cls._instance is None:
#                     cls._instance = super().__new__(cls)
#                     cls._instance._initialized = False
#         return cls._instance

#     def __init__(self):
#         if self._initialized:
#             return
#         self._initialized = True
#         self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#         self.device_name = str(self.device)
#         self.loaded_models: Dict[str, Tuple[nn.Module, ArchitectureConfig]] = {}
#         logger.info(f"ModelRegistry initialised on device: {self.device}")

#     def _ensure_weights(self, filename: str):
#         """Downloads and extracts the zip if the .pth file is missing."""
#         target_path = WEIGHTS_DIR / filename
#         if not target_path.exists():
#             url = WEIGHTS_MAP.get(filename)
#             if not url:
#                 return

#             logger.info(f"📥 Downloading and unzipping {filename}...")
#             WEIGHTS_DIR.mkdir(parents=True, exist_ok=True)
            
#             response = requests.get(url)
#             response.raise_for_status()
            
#             # Extract zip content directly into the weights folder
#             with zipfile.ZipFile(io.BytesIO(response.content)) as z:
#                 z.extractall(WEIGHTS_DIR)
#             logger.info(f"✅ {filename} is ready.")

#     def load_all(self):
#         for key in ALL_ARCHITECTURES:
#             self._load(key)

#     def get(self, key: str) -> Tuple[nn.Module, ArchitectureConfig]:
#         if key not in self.loaded_models:
#             self._load(key)
#         return self.loaded_models[key]

#     def get_all(self) -> Dict[str, Tuple[nn.Module, ArchitectureConfig]]:
#         return dict(self.loaded_models)

#     def _load(self, key: str):
#         builder = ALL_ARCHITECTURES[key]
#         config: ArchitectureConfig = builder()
#         model = config.model

#         # Ensure the .pth file exists (downloading if necessary)
#         self._ensure_weights(config.weight_key)

#         weight_path = WEIGHTS_DIR / config.weight_key
#         if weight_path.exists():
#             logger.info(f"Loading weights from {weight_path}")
#             state = torch.load(weight_path, map_location=self.device)
#             state_dict = state.get("model_state_dict", state)
#             model.load_state_dict(state_dict, strict=False)
#         else:
#             logger.warning(f"⚠️ Could not find {weight_path} even after download attempt.")

#         model.to(self.device)
#         model.eval()
#         self.loaded_models[key] = (model, config)
#         logger.info(f"✓ {config.name} ready.")

import logging
import os
import requests
import torch
from pathlib import Path
from models.architectures import ALL_ARCHITECTURES

logger = logging.getLogger(__name__)
# Points to the persistent weights directory on Render
WEIGHTS_DIR = Path("weights")

# REPLACE THESE WITH YOUR RAW HUGGING FACE LINKS
WEIGHTS_MAP = {
    "resnet18_best.pth": "https://huggingface.co/prasharindustries/krishilynk-weights/resolve/main/resnet18_best.pth.zip",
    "efficientnet_best.pth": "https://huggingface.co/prasharindustries/krishilynk-weights/resolve/main/efficientnet_best.pth.zip",
    "densenet121_best.pth": "https://huggingface.co/prasharindustries/krishilynk-weights/resolve/main/densenet121_best.pth.zip"
}

class ModelRegistry:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.loaded_models = {}

    def _ensure_weights(self, filename):
        target = WEIGHTS_DIR / filename
        if not target.exists():
            url = WEIGHTS_MAP.get(filename)
            if not url: return
            WEIGHTS_DIR.mkdir(exist_ok=True)
            logger.info(f"📥 Downloading {filename}...")
            r = requests.get(url, stream=True)
            r.raise_for_status()
            with open(target, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
            logger.info(f"✅ {filename} downloaded.")

    def load_all(self):
        for key, builder in ALL_ARCHITECTURES.items():
            config = builder()
            self._ensure_weights(config.weight_key)
            path = WEIGHTS_DIR / config.weight_key
            if path.exists():
                state = torch.load(path, map_location=self.device)
                # Load the state dict (handles cases where it's wrapped in a dict or raw)
                config.model.load_state_dict(state.get("model_state_dict", state), strict=False)
                self.loaded_models[key] = (config.model.to(self.device).eval(), config)
                logger.info(f"✓ {config.name} loaded successfully.")

    @property
    def device_name(self) -> str:
        return str(self.device)