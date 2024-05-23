import { exec } from "child_process";
import { ChildProcess } from "child_process";

let serverlessOfflineProcess: ChildProcess | null = null;

export const startServerlessOffline = async () => {
  // Helper function to kill the Serverless Offline process

  const killServerlessOffline = () => {
    if (serverlessOfflineProcess) {
      serverlessOfflineProcess.kill("SIGINT");
      console.log("Serverless Offline stopped");
    }
  };

  // Start the Serverless Offline process
  serverlessOfflineProcess = exec(
    "sls offline start --noTimeout",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        // return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );

  console.log("Serverless Offline started");

  process.on("exit", () => {
    if (serverlessOfflineProcess) {
      serverlessOfflineProcess.kill("SIGINT");
      console.log("Serverless Offline stopped");
    }
  });

  // Wait a few seconds to ensure Serverless Offline is up and running
  await new Promise((resolve) => setTimeout(resolve, 5000));
};

export const stopServerlessOffline = async () => {
  // Implement logic to stop the server if necessary
  if (serverlessOfflineProcess) {
    serverlessOfflineProcess.kill("SIGINT");
    console.log("Serverless Offline stopped");
  }
};
