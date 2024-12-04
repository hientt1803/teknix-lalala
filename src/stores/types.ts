export interface GlobalResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IGlobalStatus {
  statusCode: number;
  message: string;
}
