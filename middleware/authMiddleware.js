import jwt from 'jsonwebtoken';
import config from '../config.js';

const checkAuth = (req, res, next) => {
    if (res.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(403).json({ message: "User is not authenticated" });
        }

        const decodeData = jwt.verify(token, config.secret);
        req.user = decodeData;
        next()
    } catch (e) {
        return res.status(403).json({ message: "User is not authenticated" });
    }
}

export default checkAuth;