import { Router } from 'express'
import productController from '../controller/productController'
import authentication from '../middleware/authentication'
import rateLimit from '../middleware/rateLimit'

const productRoute = Router()

productRoute.route('/new').post(rateLimit, authentication, productController.addProduct)

export default productRoute
