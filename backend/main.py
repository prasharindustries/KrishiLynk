"""
Crop Disease XAI Detection API
FastAPI entry point - production grade
"""
import sys
import os
import logging
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse

# Ensure the backend directory is in the path for module imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models.model_loader import ModelRegistry
from routes.predict import router as predict_router
from routes.assistant import router as assistant_router

# ── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("crop_xai")


# ── Lifespan (startup / shutdown) ────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🌱 Starting Crop Disease XAI API …")
    registry = ModelRegistry()
    registry.load_all()          # warm-up: load all 3 models once
    app.state.model_registry = registry
    logger.info("✅ All models loaded and cached.")
    yield
    logger.info("🛑 Shutting down …")


# ── App factory ───────────────────────────────────────────────────────────────
app = FastAPI(
    title="Crop Disease XAI API",
    description=(
        "Explainable AI-powered crop disease detection using ResNet-18, "
        "EfficientNet-B0, and DenseNet-121 with Grad-CAM, LIME, and "
        "Integrated Gradients."
    ),
    version="1.0.0",
    lifespan=lifespan,
)


# ── Middleware ───────────────────────────────────────────────────────────────

# Corrected CORS for your actual production URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://krishi-lynk.vercel.app"  # Fixed URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(GZipMiddleware, minimum_size=1024)


# ── Request timing middleware ─────────────────────────────────────────────────
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    elapsed = (time.perf_counter() - start) * 1000
    response.headers["X-Process-Time-Ms"] = f"{elapsed:.1f}"
    return response


# ── Routes ────────────────────────────────────────────────────────────────────

# Standard Prediction routes with versioning
app.include_router(predict_router, prefix="/api/v1", tags=["Prediction"])

# Assistant router (No prefix, as per your original structure)
app.include_router(assistant_router)


# Merged Health/Root Route - Support both GET and HEAD for Render's stability
@app.api_route("/", methods=["GET", "HEAD"], tags=["Health"])
async def root():
    return {
        "status": "ok", 
        "service": "Crop Disease XAI API", 
        "version": "1.0.0"
    }


@app.get("/health", tags=["Health"])
async def health(request: Request):
    # This checks if models are actually in memory
    registry: ModelRegistry = request.app.state.model_registry
    return {
        "status": "healthy",
        "models_loaded": list(registry.loaded_models.keys()),
        "device": str(registry.device),
    }


# ── Global exception handler ──────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "detail": "An internal server error occurred.", 
            "error": str(exc)
        },
    )