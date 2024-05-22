export const handler = async (event: any = {}): Promise<any> => {
    console.log("Handler started");
    // Add more logging here as needed
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello, another world!" }),
    };
  };
  