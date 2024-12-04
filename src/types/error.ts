export type ErrorType = {
  status: number;
  data: {
    message: string;
    error: string;
    statusCode: number;
  };
};
