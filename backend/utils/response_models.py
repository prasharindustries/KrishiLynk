"""
utils/response_models.py
Pydantic schemas that define the full API contract.
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class XAIVisuals(BaseModel):
    """Base64-encoded explanation images for one model."""
    
    grad_cam: str = Field(
        ...,
        description="Grad-CAM heatmap overlay as base64 data-URI"
    )

    lime: str = Field(
        ...,
        description="LIME superpixel explanation as base64 data-URI"
    )

    ig: str = Field(
        ...,
        description="Integrated Gradients attribution map as base64 data-URI"
    )


class Top5Prediction(BaseModel):
    """Single top-5 prediction entry."""

    class_name: str = Field(
        ...,
        description="Plant disease class label"
    )

    confidence: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Prediction confidence score"
    )


class ModelResult(BaseModel):
    """Inference + XAI result for a single model."""

    model_key: str = Field(
        ...,
        description="Internal key, e.g. 'efficientnet_b0'"
    )

    model_name: str = Field(
        ...,
        description="Human-readable model name"
    )

    prediction: str = Field(
        ...,
        description="Predicted class label"
    )

    confidence: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Softmax confidence [0,1]"
    )

    top5: List[Top5Prediction] = Field(
        default_factory=list,
        description="Top-5 class predictions with confidence scores"
    )

    xai: XAIVisuals

    reliable: bool = Field(
        False,
        description="True for EfficientNet-B0 — best AOPC fidelity model"
    )

    inference_ms: float = Field(
        ...,
        description="Inference time in milliseconds"
    )


class PredictionResponse(BaseModel):
    """Top-level response returned by POST /api/v1/predict."""

    status: str = Field(
        default="success"
    )

    original_image: str = Field(
        ...,
        description="Uploaded image as base64 data-URI"
    )

    model_results: List[ModelResult]

    recommended_model: str = Field(
        default="efficientnet_b0",
        description="Recommended model based on AOPC fidelity research"
    )

    class_names: List[str]


class ErrorResponse(BaseModel):
    """Error response schema."""

    status: str = Field(
        default="error"
    )

    detail: str

    error: Optional[str] = None