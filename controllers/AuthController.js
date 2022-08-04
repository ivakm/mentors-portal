import Role from "../models/Role.js";
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import config from '../config.js'

const generatedAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, config.secret, { expiresIn: '24h' });
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "The error was occured by registration", errors });
            }

            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: "This username is already existed" })
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "USER" });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return res.json(user);
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: "User was not found" });
            }

            const isValidPassword = bcrypt.compareSync(password, user.password);

            if (!isValidPassword) {
                return res.status(400).json({ message: "The password is wrong" });
            }

            const token = generatedAccessToken(user._id, user.roles);
            return res.json({ token });
        } catch(e) {
            res.status(400).json({message: e});
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.status(400).json({message: e});
        }
    }
}

export default new AuthController();