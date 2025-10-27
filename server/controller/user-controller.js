import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupuser = async (request, response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
       
        const user = {
            name: request.body.name,
            username: request.body.username,
            password: hashedPassword
        };

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({msg:'signup successful' });
    }
    catch (error) {
        console.error('Signup error:', error);
        if (error.code === 11000) {
            return response.status(400).json({ msg: 'Username already exists' });
        }
        return response.status(500).json({ msg: 'Error while signup: ' + error.message });
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(404).json({ msg: 'User not found' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(
                user.toJSON(),
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: '15m' }
            );

            const refreshToken = jwt.sign(
                user.toJSON(),
                process.env.REFRESH_SECRET_KEY
            );

            return response.status(200).json({
                accessToken,
                refreshToken,
                user: {
                    id: user._id,
                    username: user.username,
                    name: user.name
                }
            });
        }
        return response.status(400).json({ msg: 'Password does not match' });
    } catch (error) {
        return response.status(500).json({ msg: 'Error while logging in' });
    }
}