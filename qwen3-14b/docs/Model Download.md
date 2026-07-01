# Qwen3-14B Model Download

This document describes the steps required to download the **Qwen3-14B** model from Hugging Face and verify a successful installation.

---

# Model Information

| Property | Value |
|----------|-------|
| Model Name | Qwen3-14B |
| Hugging Face Repository | `Qwen/Qwen3-14B` |
| Local Model Path | `/opt/models/qwen3-14b` |
| Approximate Size | ~29.6 GB |
| License | Apache 2.0 |
| Model Type | Causal Language Model |
| Languages | Multilingual |
| Instruction Tuned | Yes |
| Thinking Mode | Supported |
| Non-Thinking Mode | Supported |

## Context Length

| Mode | Tokens |
|------|--------|
| Native | 32K |
| Extended (YaRN) | 131K |

---

# System Requirements

## GPU

- NVIDIA L40S (48 GB VRAM recommended)

## Driver Information

```text
Driver Version : 535.309.01
CUDA Version   : 12.2
```

Verify using:

```bash
nvidia-smi
```

Example output:

```text
GPU: NVIDIA L40S
Driver Version: 535.309.01
CUDA Version: 12.2
```

---

# Step 1 — Create Model Directory

```bash
cd /opt/models

mkdir -p qwen3-14b

cd qwen3-14b
```

Verify:

```bash
pwd
```

Expected:

```text
/opt/models/qwen3-14b
```

---

# Step 2 — Verify Hugging Face Authentication

Check whether Hugging Face CLI is already authenticated.

```bash
hf auth login
```

Expected:

```text
User is already logged in.
Use `hf auth login --force` to force re-login.
```

If authentication is not configured, log in using your Hugging Face access token.

---

# Step 3 — Check Offline Environment Variables

Inspect the current Hugging Face environment.

```bash
env | grep -E "HF|TRANSFORMERS"
```

Example:

```text
TRANSFORMERS_OFFLINE=1
HF_DATASETS_OFFLINE=1
HF_TOKEN=hf_xxxxxxxxxxxxxxxxx
```

Also verify:

```bash
printenv | grep OFFLINE
```

Example:

```text
TRANSFORMERS_OFFLINE=1
HF_DATASETS_OFFLINE=1
```

---

# Step 4 — Disable Offline Mode

Unset existing offline variables.

```bash
unset HF_HUB_OFFLINE
unset TRANSFORMERS_OFFLINE
unset HF_DATASETS_OFFLINE
```

Set them to online mode.

```bash
export TRANSFORMERS_OFFLINE=0
export HF_DATASETS_OFFLINE=0
export HF_HUB_OFFLINE=0
```

Verify:

```bash
env | grep OFFLINE
```

Expected:

```text
TRANSFORMERS_OFFLINE=0
HF_DATASETS_OFFLINE=0
HF_HUB_OFFLINE=0
```

---

# Step 5 — Download the Model

Execute:

```bash
python3 -c "
from huggingface_hub import snapshot_download

snapshot_download(
    repo_id='Qwen/Qwen3-14B',
    local_dir='/opt/models/qwen3-14b'
)
"
```

The download may take several minutes depending on network speed.

---

# Step 6 — Verify Download

List the downloaded files.

```bash
ls -lh /opt/models/qwen3-14b
```

Expected contents:

```text
config.json
generation_config.json
tokenizer.json
tokenizer_config.json
vocab.json
merges.txt
model.safetensors.index.json

model-00001-of-00008.safetensors
model-00002-of-00008.safetensors
model-00003-of-00008.safetensors
model-00004-of-00008.safetensors
model-00005-of-00008.safetensors
model-00006-of-00008.safetensors
model-00007-of-00008.safetensors
model-00008-of-00008.safetensors
```

Expected download size:

```text
Approximately 29.6 GB
```

---

# Expected Directory Structure

```text
/opt/models/qwen3-14b
├── config.json
├── generation_config.json
├── tokenizer.json
├── tokenizer_config.json
├── vocab.json
├── merges.txt
├── model.safetensors.index.json
├── model-00001-of-00008.safetensors
├── model-00002-of-00008.safetensors
├── model-00003-of-00008.safetensors
├── model-00004-of-00008.safetensors
├── model-00005-of-00008.safetensors
├── model-00006-of-00008.safetensors
├── model-00007-of-00008.safetensors
└── model-00008-of-00008.safetensors
```

---

# Download Complete

The model is ready for deployment using **vLLM** or any compatible inference framework.

The next step is to configure the runtime environment and deploy the model.
