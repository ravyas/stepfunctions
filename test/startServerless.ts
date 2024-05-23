import execa from 'execa';

export const startServerlessOffline = async () => {
  const serverless = execa('npx', ['serverless', 'offline', 'start'], {
    stdio: 'inherit',
  });

  process.on('exit', () => {
    serverless.kill();
  });

  // Wait a few seconds to ensure Serverless Offline is up and running
  await new Promise((resolve) => setTimeout(resolve, 5000));
};

export const stopServerlessOffline = async () => {
  // Implement logic to stop the server if necessary
};
