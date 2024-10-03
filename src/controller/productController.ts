import { NextFunction, Request, Response } from 'express';
import responseMessage from '../constant/responseMessage';
import databaseService from '../service/databaseService';
import { validateJoiSchema, ValidateProduct } from '../service/validationService';
import { IProduct } from '../types/productTypes';
import httpError from '../util/httpError';
import httpResponse from '../util/httpResponse';
import { ProductModel } from '../model/productModel';



export default {
    addProduct: async (req: Request, res: Response, next : NextFunction) => {
       try {
        const {error, value} = validateJoiSchema<IProduct>(ValidateProduct, req.body)
        // Check Validation
        if(error) {
            return httpError(next, error, req, 422)
        }
        // TODO:  Check for CategoryId, InventoryId
        
        // Check if SKU id already exists
        const skuId =await databaseService.findSKUId(value.SKU)
        if(skuId) {
            return httpError(next,new Error(responseMessage.SKUID_ALREADY_EXISTS), req, 409)
        }
        const newProduct = new ProductModel({...value});
        await newProduct.save()
        httpResponse(req, res,201, responseMessage.SUCCESS, newProduct)
       } catch (error) {
            httpError(next, error, req, 500)
       }
    }
}