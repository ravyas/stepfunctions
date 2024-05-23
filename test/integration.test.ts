import axios from 'axios';
import { exec } from 'child_process';
import { ChildProcess } from 'child_process';

describe('Local Step Functions Integration Test', () => {
let serverlessOfflineProcess: ChildProcess | null = null;

// Helper function to kill the Serverless Offline process
const killServerlessOffline = () => {
    if (serverlessOfflineProcess) {
        serverlessOfflineProcess.kill('SIGINT');
        console.log('Serverless Offline stopped');
    }
  };

  beforeAll((done) => {
    // Start the Serverless Offline process
    serverlessOfflineProcess = exec('sls offline start --noTimeout --dontPrintOutput', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    console.log('Serverless Offline started');

    // Wait for Serverless Offline to start up
    setTimeout(done, 5000);
  });

  afterAll((done) => {
    // Stop the Serverless Offline process
    killServerlessOffline();
    done();
  });

  it('should execute the state machine successfully', async () => {
    const response = await axios.get('http://localhost:3000/dev/first');
    expect(response.status).toBe(200);
    const responseData = response.data;
    expect(responseData.message).toBe('First function executed successfully!');
    
    // Add additional logic to test the second function if needed
  });
});