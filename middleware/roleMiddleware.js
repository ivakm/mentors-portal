import config from "../config.js";
import jwt from 'jsonwebtoken';

const roleMiddleware = (roles) => {
    return function (req, res, next) {
        if (res.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: "User is not authenticated" });
            }
            const { roles: userRoles } = jwt.verify(token, config.secret);

            let hasRole = userRoles.filter(item => roles.includes(item)).length;
            if (!hasRole) {
                return res.status(403).json({ message: "You do not have permissions" })
            }

            next()
        } catch (e) {
            return res.status(403).json({ message: "User is not authenticated" });
        }
    }
}

export default roleMiddleware;