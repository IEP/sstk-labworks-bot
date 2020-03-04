module.exports = {
  apps: [{
    name: "telegram bot",
    script: "index.js",
    node_args: "-r dotenv/config",
    max_memory_restart: "128M",
    env: {
      "NODE_ENV": "production"
    }
  }]
}