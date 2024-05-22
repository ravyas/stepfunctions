// Import necessary modules
const { SFNClient, StartExecutionCommand } = require("@aws-sdk/client-sfn");
const { mockClient } = require("aws-sdk-client-mock");
const { handler } = require('../handler'); // Update with the correct path to your handler file

// Initialize the SFNClient mock
const sfnClientMock = mockClient(SFNClient);

// Describe the test suite
describe('Lambda Handler Integration Test', () => {
    // Before each test, reset the mock
    beforeEach(() => {
        sfnClientMock.reset();
    });

    test('should execute the state machine successfully', async () => {
        // Arrange: Mock the successful response from SFNClient
        const mockResponse = {
            executionArn: 'arn:aws:states:us-east-1:588711894923:execution:MyStateMachine:execution-id',
            startDate: new Date(),
        };
        sfnClientMock.on(StartExecutionCommand).resolves(mockResponse);

        // Act: Invoke the Lambda handler
        const event = { key: 'value' }; // Example event object
        const result = await handler(event);

        // Assert: Check the response and the interactions with the mock
        expect(result).toEqual(mockResponse);
        expect(sfnClientMock.calls()).toHaveLength(1);
        expect(sfnClientMock.calls()[0].args[0].input).toEqual({
            stateMachineArn: 'arn:aws:states:us-east-1:588711894923:stateMachine:MyStateMachine',
            input: JSON.stringify(event),
        });
    });

    test('should handle errors from state machine execution', async () => {
        // Arrange: Mock an error response from SFNClient
        const mockError = new Error('State machine execution failed');
        sfnClientMock.on(StartExecutionCommand).rejects(mockError);

        // Act and Assert: Invoke the Lambda handler and expect it to throw
        const event = { key: 'value' }; // Example event object
        await expect(handler(event)).rejects.toThrow('State machine execution failed');
        expect(sfnClientMock.calls()).toHaveLength(1);
        expect(sfnClientMock.calls()[0].args[0].input).toEqual({
            stateMachineArn: 'arn:aws:states:us-east-1:588711894923:stateMachine:MyStateMachine',
            input: JSON.stringify(event),
        });
    });
});
