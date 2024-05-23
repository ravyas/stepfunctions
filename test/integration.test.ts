import axios from 'axios';

describe('Local Step Functions Integration Test', () => {
  it('should execute the state machine successfully', async () => {
    const response = await axios.get('http://localhost:3000/first');
    expect(response.status).toEqual(200);
    expect(response.data.message).toEqual('First function executed successfully!');
    
    // Add additional logic to test the second function if needed
  });
});
