export interface User {
    id: number;
    email: string;
}

export interface UserLoginFields {
    email: string;
    password: string;
}

export interface UserRegistrationFields {
    email: string;
    password: string;
}

export interface UserDecodedToken extends User {
    iat: number; // Issued at (seconds since Unix epoch)
    exp: number; // Expiration time (seconds since Unix epoch)
}
