import detect from "detect-port";
import { exec } from "child_process";

const DEFAULT_PORT = 3000;

detect(DEFAULT_PORT)
  .then(port => {
    if (port === DEFAULT_PORT) {
      console.log(`✅ Starting frontend on port ${port}`);
      exec(`cross-env PORT=${port} react-scripts start`, { stdio: "inherit" });
    } else {
      console.log(`⚠️ Port ${DEFAULT_PORT} is busy. Switching to ${port}...`);
      exec(`cross-env PORT=${port} react-scripts start`, { stdio: "inherit" });
    }
  })
  .catch(err => {
    console.error("Error checking ports:", err);
  });
