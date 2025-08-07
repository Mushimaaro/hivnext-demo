import Joi from "joi";

export const registerSchema = Joi.object({
   email: Joi.string().trim().min(5).max(60).required().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).messages({
      "string.min" : "Email must be atleast 5 characters long.",
      "string.max" : "Email cannot exceed 60 characters long.",
      "string.email" : "Not a valid email.",
      "any.required" : "Email is required."
   }),
   username: Joi.string().min(1).max(30).required().messages({
      "string.min" : "Username must be atleast 1 character long.",
      "string.max" : "Username cannot exceed 30 characters long.",
      "any.required" : "Username is required."
   }),
   password: Joi.string().required().min(8).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).messages({
      "string.min" : "Password must be atleast 8 characters long.",
      "object.regex" : "Password must be atleast 8 characters long.",
      "string.pattern.base" : "Password is not valid.",
      "any.required" : "Password is required."
   })
})

export const loginSchema = Joi.object({
   email: Joi.string().trim().min(5).max(60).required().email({ tlds: { allow: true } }).messages({
      "string.min" : "Email must be atleast 5 characters long.",
      "string.max" : "Email cannot exceed 60 characters long.",
      "string.email" : "Not a valid email.",
      "any.required" : "Email is required."
   }),
   password: Joi.string().required().messages({
      "any.required" : "Password is required."
   })
})

export const resetPasswordSchema = Joi.object({
   newpassword: Joi.string().required().min(8).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).messages({
      "string.min" : "Password must be atleast 8 characters long.",
      "object.regex" : "Password must be atleast 8 characters long.",
      "string.pattern.base" : "Password is not valid.",
      "any.required" : "Password is required."
   })
}) 

export const updateUserSchema = Joi.object({
   email: Joi.string().trim().min(5).max(60).required().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).messages({
      "string.min" : "Email must be atleast 5 characters long.",
      "string.max" : "Email cannot exceed 60 characters long.",
      "string.email" : "Not a valid email.",
      "any.required" : "Email is required."
   }),
   username: Joi.string().min(1).max(30).required().messages({
      "string.min" : "Username must be atleast 1 character long.",
      "string.max" : "Username cannot exceed 30 characters long.",
      "any.required" : "Username is required."
   })
})