import axios from 'axios';
import { expect } from 'chai';

describe('Local Step Functions Integration Test', () => {
  it('should execute the state machine successfully', async () => {
    const response = await axios.get('http://localhost:3000/dev/first');
    expect(response.status).to.equal(200);
    const responseData = response.data;
    expect(responseData.message).to.equal('First function executed successfully!');
    
    // Add additional logic to test the second function if needed
  });
});
