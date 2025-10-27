import jwt from 'jsonwebtoken';

export const authenticateToken = async (request, response, next) => {
    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return response.status(401).json({ msg: 'Token is missing' });
        }

        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if (error) {
                return response.status(403).json({ msg: 'Invalid token' });
            }
            request.user = user;
            next();
        });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while validating token' });
    }
};