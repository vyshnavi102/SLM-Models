module.exports = {
  apps: [
    { name: "qwen3-vllm",
      cwd: "/opt/deployments/services/dbtbot/q4dooh-datascience-bot",
      script: "/opt/deployments/services/dbtbot/q4dooh-datascience-bot/qwen3_vllm_clean/bin/vllm",
      args: [
        "serve",
        "/opt/models/qwen3-14b",
        "--host", "0.0.0.0",
        "--port", "8005",
        "--dtype", "bfloat16",
        "--gpu-memory-utilization", "0.85",
        "--max-model-len", "8192",
        "--enable-prefix-caching",
	  // Enable OpenAI tool calling
        "--enable-auto-tool-choice",
        "--tool-call-parser", "qwen3"
      ],
      interpreter: "none",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      env: {
        CUDA_VISIBLE_DEVICES: "0"
      },
    }
  ]
};
