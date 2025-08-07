import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { handleError } from "../lib/ErrorHandler";
import type { UserProfileToken } from "../models/UserModel";
import { normalAxios } from "./axiosAPI";

const axiosPrivate = useAxiosPrivate();

export const loginAPI = async (email: string, password: string) => {
   try {
      const data = await axiosPrivate.post<UserProfileToken>( "auth/login", {email:email, password:password});
      return data;
   } catch (error) {
      handleError(error)
   }
}

export const registerAPI = async (email: string, username:string, password: string) => {
   try {
      const data = await axiosPrivate.post<UserProfileToken>("auth/register", {email:email, username:username, password:password});
      return data;
   } catch (error) {
      handleError(error)
   }
}

export const logoutAPI = async () => {
   try {
      await axiosPrivate.post<UserProfileToken>("auth/ogout")
   } catch (error) {
      handleError(error)
   }
}

export const isAuthAPI = async () => {
   try {
      const data = await axiosPrivate.get<UserProfileToken>("auth/is-auth")
      return data;
   } catch (error) {
      handleError(error)
   }
}

export const refreshAPI = async () => {
   try {
      const data = await normalAxios.get<UserProfileToken>("auth/refresh")
      return data;
   } catch (error) {
      handleError(error)
   }
}