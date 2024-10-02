export interface Token{
    token: string;
    expiration: string;
}

export interface Login{
    token: Token;
    role: string;
}