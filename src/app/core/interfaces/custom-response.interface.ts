export interface CustomResponse<T>{
    response: T;
    code: number;
    message: string;
    status: boolean;
}