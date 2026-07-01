# Environment Setup

This document describes how to prepare the server environment required to deploy the **Qwen3-14B** model using **vLLM**.

---

# Overview

The environment setup includes:

- Verifying GPU availability
- Verifying CUDA installation
- Creating a Python virtual environment
- Installing PyTorch
- Installing vLLM
- Installing Transformers
- Installing required dependencies
- Verifying the installation

---

# System Requirements

| Component | Requirement |
|-----------|-------------|
| Operating System | Ubuntu 22.04 or later |
| Python | 3.11+ |
| GPU | NVIDIA L40S (48 GB VRAM recommended) |
| CUDA Driver | CUDA 12.x Compatible |
| NVIDIA Driver | 535.309.01 or later |
| Internet Access | Required for package installation |

---

# Verify GPU

Ensure the NVIDIA GPU is detected correctly.

```bash
nvidia-smi
```

Example Output

```text
Driver Version : 535.309.01
CUDA Version   : 12.2
GPU            : NVIDIA L40S
```

If the GPU is not detected, verify that the NVIDIA driver is installed correctly before proceeding.

---

# Verify CUDA Runtime

Check whether the CUDA toolkit is installed.

```bash
nvcc --version
```

If the command is unavailable, install the CUDA toolkit.

```bash
sudo apt update

sudo apt install -y nvidia-cuda-toolkit
```

---

# Navigate to Deployment Directory

Move to the directory where the deployment environment will be created.

```bash
cd /opt/deployments/services/dbtbot/q4dooh-datascience-bot
```

---

# Create a Python Virtual Environment

Create an isolated Python environment for the model.

```bash
python3 -m venv qwen3_vllm_clean
```

Activate the environment.

```bash
source qwen3_vllm_clean/bin/activate
```

Your terminal should now display something similar to:

```text
(qwen3_vllm_clean)
```

---

# Upgrade Python Packaging Tools

Install the latest versions of pip, setuptools, and wheel.

```bash
pip install --upgrade pip setuptools wheel
```

---

# Install PyTorch

Install the CUDA-enabled PyTorch build.

```bash
pip install torch==2.5.1 \
torchvision==0.20.1 \
torchaudio==2.5.1 \
--index-url https://download.pytorch.org/whl/cu121
```

---

# Verify PyTorch Installation

Run the following command.

```bash
python -c "
import torch

print('Torch Version:', torch.__version__)
print('CUDA Available:', torch.cuda.is_available())
print('GPU:', torch.cuda.get_device_name(0))
"
```

Expected Output

```text
CUDA Available: True
GPU: NVIDIA L40S
```

---

# Install vLLM

Install the tested vLLM version.

```bash
pip install vllm==0.11.1
```

---

# Install Transformers

Install the compatible Transformers version.

```bash
pip install transformers==4.56.1
```

---

# Install Additional Dependencies

Install commonly required libraries.

```bash
pip install accelerate

pip install sentencepiece

pip install protobuf
```

---

# Verify Installed Packages

Run the following command.

```bash
python - <<EOF
import torch
import transformers
import vllm

print("Torch        :", torch.__version__)
print("CUDA Runtime :", torch.version.cuda)
print("Transformers :", transformers.__version__)
print("vLLM         :", vllm.__version__)
EOF
```

Example Output

```text
Torch        : 2.9.0+cu128
CUDA Runtime : 12.8
Transformers : 4.56.1
vLLM         : 0.11.1
```

> **Note**
>
> Although PyTorch was installed using the CUDA 12.1 wheel index, it reports CUDA Runtime **12.8** because the wheel bundles CUDA 12.8 libraries. This is expected and works correctly as long as the installed NVIDIA driver supports the runtime.

---

# Installed Software Summary

| Package | Version |
|----------|---------|
| Python | 3.11 |
| PyTorch | 2.9.0+cu128 |
| Transformers | 4.56.1 |
| vLLM | 0.11.1 |
| Accelerate | Latest |
| SentencePiece | Latest |
| Protobuf | Latest |

---

# Virtual Environment Structure

```text
qwen3_vllm_clean/
├── bin/
├── include/
├── lib/
└── pyvenv.cfg
```

---

# Verification Checklist

Ensure all of the following have been completed successfully.

- ✅ NVIDIA GPU detected
- ✅ CUDA runtime available
- ✅ Python virtual environment created
- ✅ PyTorch installed
- ✅ Transformers installed
- ✅ vLLM installed
- ✅ Required dependencies installed

---

# Next Step

The environment is now ready.

Proceed to **vLLM Deployment.md** to start the Qwen3-14B model using vLLM.
