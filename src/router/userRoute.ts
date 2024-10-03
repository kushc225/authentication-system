import { Router } from 'express'
import userController from '../controller/userController'
import authentication from '../middleware/authentication'
import rateLimit from '../middleware/rateLimit'

const userRoute = Router()

userRoute.route('/self').get(userController.self)
userRoute.route('/health').get(userController.health)

userRoute.route('/register').post(rateLimit, userController.register)

userRoute.route('/confirmation/:token').put(rateLimit, userController.confirmation)

userRoute.route('/login').post(rateLimit, userController.login)

userRoute.route('/self-identification').get(authentication, userController.selfIdentification)

userRoute.route('/logout').put(authentication, userController.logout)

userRoute.route('/refresh-token').post(rateLimit, userController.refreshToken)

userRoute.route('/forgot-password').put(rateLimit, userController.forgotPassword)

userRoute.route('/reset-password/:token').put(rateLimit, userController.resetPassword)

userRoute.route('/change-password').put(authentication, userController.changePassword)

export default userRoute
