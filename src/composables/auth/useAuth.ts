import { User, UserDecodedToken } from '@/types/user/user';
import jwtDecode from 'jwt-decode';

export const useAuth = () => {
    const getUserByToken = (token: string): User => {
        const decodedUser = jwtDecode<UserDecodedToken>(token);
        return decodedUser;
    };

    return {
        getUserByToken
    };
};
