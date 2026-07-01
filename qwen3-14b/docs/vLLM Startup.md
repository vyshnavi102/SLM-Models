# vLLM Service Startup

This document describes how to start, manage, and verify the **Qwen3-14B** vLLM service using **PM2**.

---

# Prerequisites

Before starting the service, ensure:

- Qwen3-14B model is downloaded.
- Virtual environment is created.
- Required Python packages are installed.
- PM2 is installed.
- GPU is available.
- The PM2 ecosystem configuration file is present.

Configuration file:

```text
configs/ecosystem-vllm-qwen3-14b.config.js
```

---

# Service Configuration

The service uses the following configuration.

| Parameter | Value |
|-----------|-------|
| Model | Qwen3-14B |
| Model Path | `/opt/models/qwen3-14b` |
| Runtime | vLLM |
| Port | 8005 |
| Host | 0.0.0.0 |
| Precision | bfloat16 |
| GPU Memory Utilization | 0.85 |
| Maximum Context Length | 8192 |
| Prefix Caching | Enabled |
| Tool Calling | Enabled |
| Tool Parser | hermes |

---

# Start the Service

Navigate to the deployment directory.

```bash
cd /opt/deployments/services/dbtbot/q4dooh-datascience-bot
```

Start the service using PM2.

```bash
pm2 start configs/ecosystem-vllm-qwen3-14b.config.js
```

---

# Verify Running Processes

```bash
pm2 list
```

Expected output:

```
┌────┬──────────────┬────────┬─────────┐
│ id │ name         │ status │ mode    │
├────┼──────────────┼─────────┼─────────┤
│ 0  │ qwen3-vllm   │ online │ fork    │
└────┴──────────────┴─────────┴─────────┘
```

---

# View Logs

Real-time logs:

```bash
pm2 logs qwen3-vllm
```

Last 100 lines:

```bash
pm2 logs qwen3-vllm --lines 100
```

---

# Check Service Status

```bash
pm2 status
```

Or

```bash
pm2 show qwen3-vllm
```

---

# Restart Service

```bash
pm2 restart qwen3-vllm
```

---

# Stop Service

```bash
pm2 stop qwen3-vllm
```

---

# Delete Service

```bash
pm2 delete qwen3-vllm
```

---

# Save PM2 Process List

After verifying that the service is running correctly:

```bash
pm2 save
```

---

# Configure PM2 Startup (Optional)

Generate the startup script.

```bash
pm2 startup
```

Run the generated command.

Finally save the current process list.

```bash
pm2 save
```

---

# Verify vLLM API

## List Available Models

```bash
curl http://localhost:8005/v1/models
```

Expected response:

```json
{
  "data": [
    {
      "id": "/opt/models/qwen3-14b"
    }
  ]
}
```

---

## Test Chat Completion

```bash
curl http://localhost:8005/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{
  "model":"/opt/models/qwen3-14b",
  "messages":[
    {
      "role":"user",
      "content":"Hello!"
    }
  ]
}'
```

Expected response:

```json
{
  "choices":[
    {
      "message":{
        "role":"assistant",
        "content":"..."
      }
    }
  ]
}
```

---

# Monitor GPU Usage

Open another terminal and run:

```bash
watch -n 1 nvidia-smi
```

This displays:

- GPU utilization
- Memory usage
- Running processes
- Power consumption
- Temperature

---

# Common PM2 Commands

| Command | Description |
|----------|-------------|
| `pm2 list` | List running services |
| `pm2 logs qwen3-vllm` | View logs |
| `pm2 restart qwen3-vllm` | Restart service |
| `pm2 stop qwen3-vllm` | Stop service |
| `pm2 delete qwen3-vllm` | Remove service |
| `pm2 save` | Save process list |
| `pm2 startup` | Enable auto-start on reboot |

---

# Service Startup Flow

```
Activate Environment
        │
        ▼
Load PM2 Configuration
        │
        ▼
Launch vLLM
        │
        ▼
Load Qwen3-14B Model
        │
        ▼
Initialize GPU
        │
        ▼
Expose OpenAI-Compatible API
        │
        ▼
Verify Using curl
```

---

# Next Step

Once the service is running successfully, integrate the endpoint into your application by configuring the OpenAI-compatible API client or LangChain wrapper to use:

```text
http://localhost:8005/v1
```

with the model:

```text
/opt/models/qwen3-14b
```
