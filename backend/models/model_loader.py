import logging
import os
import requests
import torch
import zipfile
import io
from pathlib import Path
from typing import Dict, Tuple
from models.architectures import ALL_ARCHITECTURES, ArchitectureConfig

logger = logging.getLogger(__name__)

# Points to the weights directory on Render
WEIGHTS_DIR = Path("weights")

# Hugging Face Zip Links - Verified
WEIGHTS_MAP = {
    "resnet18_best.pth": "https://huggingface.co/prasharindustries/krishilynk-weights/resolve/main/resnet18_best.pth.zip",
    "efficientnet_best.pth": "https://huggingface.co/prasharindustries/krishilynk-weights/resolve/main/efficientnet_best.pth.zip",
    "densenet121_best.pth": "https://huggingface.co/prasharindustries/krishilynk-weights/resolve/main/densenet121_best.pth.zip"
}

class ModelRegistry:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.loaded_models: Dict[str, Tuple[torch.nn.Module, ArchitectureConfig]] = {}

    def _ensure_weights(self, filename: str):
        """Downloads and unzips the .pth file if it is missing."""
        target_path = WEIGHTS_DIR / filename
        if not target_path.exists():
            url = WEIGHTS_MAP.get(filename)
            if not url:
                return

            logger.info(f"📥 Downloading and unzipping {filename}...")
            WEIGHTS_DIR.mkdir(parents=True, exist_ok=True)
            
            response = requests.get(url)
            response.raise_for_status()
            
            # Extracting the zip content directly into the weights folder
            with zipfile.ZipFile(io.BytesIO(response.content)) as z:
                z.extractall(WEIGHTS_DIR)
            logger.info(f"✅ {filename} extracted and ready.")

    def load_all(self):
        for key, builder in ALL_ARCHITECTURES.items():
            config = builder()
            self._ensure_weights(config.weight_key)
            path = WEIGHTS_DIR / config.weight_key
            if path.exists():
                state = torch.load(path, map_location=self.device)
                state_dict = state.get("model_state_dict", state)
                config.model.load_state_dict(state_dict, strict=False)
                self.loaded_models[key] = (config.model.to(self.device).eval(), config)
                logger.info(f"✓ {config.name} loaded successfully.")
            else:
                logger.error(f"❌ Failed to find {path} after extraction attempt.")

    def get_all(self):
        """Fix: Added missing method required by the inference pipeline."""
        return self.loaded_models

    @property
    def device_name(self) -> str:
        return str(self.device)