import { SFNClient, StartExecutionCommand } from '@aws-sdk/client-sfn';

const client = new SFNClient({ region: "us-east-1" }); // replace "REGION" with your AWS region

export const handler = async (event: any = {}): Promise<any> => {
    console.log("Handler started");

    // Log the event to see the structure
    console.log("Event: ", JSON.stringify(event, null, 2));

    // Check for HTTP method
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    // Parse the input
    let input;
    try {
        input = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid JSON input' }),
        };
    }

    const params = {
        stateMachineArn: 'arn:aws:states:us-east-1:588711894923:stateMachine:MyStateMachine', // replace with your State Machine ARN
        input: JSON.stringify(input), // input for the state machine
    };

    const command = new StartExecutionCommand(params);

    try {
        const data = await client.send(command);
        console.log('State machine executed successfully', data);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Failed to execute state machine', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to execute state machine', error: error.message }),
        };
    }
};
