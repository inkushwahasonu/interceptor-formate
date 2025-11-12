export interface IUser {
    id: number;
    name: string;
    role: string;
}


export interface IApiResponse<T> {
  data:T;
  message?: string;
  success: boolean;
}