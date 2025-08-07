export type UserProfileToken = {
   success: boolean;
   userInfo: UserInfoProfile;
   accessToken: string;
}

export type UserProfile = {
   userId: string;
   role: string;
   verified: boolean;
}

export type AccessTokenProfile = {
   userInfo: UserInfoProfile;
   iat: number;
   exp: number;
}

export type JwtProfile = {
   userId: string;
   iat: number;
   exp: number;
}

export type UserInfoProfile = {
   userId: string;
   role: string;
   verified: boolean;
   isLoggedIn: boolean;
}