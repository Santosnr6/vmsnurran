import { addNewUser, getUser } from "../services/users.service.js";
import { hashPassword, comparePasswords } from "../utils/bcrypt.util.js";
import { signToken } from '../utils/jwt.util.js';

export const registerUser = async (req, res, next) => {
    const user = req.body;
    const result = await addNewUser({
        userId : crypto.randomUUID().substring(0, 5),
        username : user.username,
        password : await hashPassword(user.password),
        role : 'user'
    });
    if(result.success) {
        res.status(201).json({
            success : true,
            message : 'User registered successfully'
        });
    } else {
        next({
            status : 401,
            message : result.message
        });
    }
}

export const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    const result = await getUser(username);
    if(result.success) {
        if(await comparePasswords(password, result.user.password)) {
            const token = signToken({
                userId : result.user.userId,
                username : result.user.username,
                role : result.user.role
            });
            
            res.json({
                success : true,
                message : 'User logged in successfully',
                token
            });
        } else {
            next({
                status : 401,
                message : 'Invalid password'
            });
        }
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
}