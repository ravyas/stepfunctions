import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const firstFunction = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'First function executed successfully!' }),
  };
};

export const secondFunction = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Second function executed successfully!' }),
  };
};
