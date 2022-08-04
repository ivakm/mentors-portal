import { Router } from "express";
import AuthController from './controllers/AuthController.js';
import { check } from 'express-validator';
import authMiddleware from './middleware/authMiddleware.js'
import roleMiddleware from "./middleware/roleMiddleware.js";

const router = new Router();

router.post('/registration', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must have at least 7 symbols').isLength({ min: 7 })
], AuthController.registration);

router.post('/login', AuthController.login);

router.get('/users', [roleMiddleware(['USER', 'ADMIN'])], AuthController.getUsers);

export default router;