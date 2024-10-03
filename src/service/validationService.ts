import joi from 'joi'
import {
    IChangePasswordRequestBody,
    IForgotPasswordRequestBody,
    ILoginUserRequestBody,
    IRegisterUserRequestBody,
    IResetPasswordRequestBody
} from '../types/userTypes'
import { IProduct } from '../types/productTypes'

export const ValidateRegisterBody = joi.object<IRegisterUserRequestBody, true>({
    name: joi.string().min(2).max(72).trim().required(),
    emailAddress: joi.string().email().trim().required(),
    phoneNumber: joi.string().min(4).max(20).trim().required(),
    password: joi.string().min(8).max(24).trim().required(),
    consent: joi.boolean().valid(true).required()
})

export const ValidateLoginBody = joi.object<ILoginUserRequestBody, true>({
    emailAddress: joi.string().email().trim().required(),
    password: joi.string().min(8).max(24).trim().required()
})

export const ValidateForgotPasswordBody = joi.object<IForgotPasswordRequestBody, true>({
    emailAddress: joi.string().email().trim().required()
})

export const ValidateResetPasswordBody = joi.object<IResetPasswordRequestBody, true>({
    newPassword: joi.string().min(8).max(24).trim().required()
})

export const ValidateChangePasswordBody = joi.object<IChangePasswordRequestBody, true>({
    oldPassword: joi.string().min(8).max(24).trim().required(),
    newPassword: joi.string().min(8).max(24).trim().required(),
    confirmNewPassword: joi.string().min(8).max(24).trim().valid(joi.ref('newPassword')).required()
})

export const ValidateProduct = joi.object<IProduct, true>({
  name: joi.string()
    .min(2)
    .max(200)
    .trim()
    .required()
    .messages({
      'string.base': 'Product name should be a type of string.',
      'string.empty': 'Product name is required.',
      'string.min': 'Product name should have at least 2 characters.',
      'string.max': 'Product name cannot exceed 200 characters.',
    }),

  desc: joi.string()
    .min(3)
    .trim()
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Description should be a type of string.',
      'string.min': 'Description should have at least 3 characters.',
    }),

  SKU: joi.string()
    .min(5)
    .max(50)
    .trim()
    .required()
    .messages({
      'string.base': 'SKU should be a type of string.',
      'string.empty': 'SKU is required.',
      'string.min': 'SKU should have at least 5 characters.',
      'string.max': 'SKU cannot exceed 50 characters.',
    }),

  category_id: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Category ID must be a valid ObjectId.',
      'string.length': 'Category ID must be a 24-character ObjectId.',
      'any.required': 'Category is required.',
    }),

  inventory_id: joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Inventory ID must be a valid ObjectId.',
      'string.length': 'Inventory ID must be a 24-character ObjectId.',
      'any.required': 'Inventory is required.',
    }),

  price: joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a valid number.',
      'number.min': 'Price cannot be less than 0.',
      'any.required': 'Price is required.',
    }),

  discount_id: joi.string()
    .hex()
    .length(24)
    .optional()
    .allow(null, '')
    .messages({
      'string.base': 'Discount ID must be a valid ObjectId.',
      'string.length': 'Discount ID must be a 24-character ObjectId.',
    }),
});


export const validateJoiSchema = <T>(schema: joi.Schema, value: unknown) => {
    const result = schema.validate(value)

    return {
        value: result.value as T,
        error: result.error
    }
}
