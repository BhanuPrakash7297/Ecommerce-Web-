import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


// protected routes

export const requireSignIn = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        // const bearerHeader = req.headers.authorization;
        // var parts = bearerHeader.split(' ');
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (err) {
        console.log(err);
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.role != 1) {
            return res.status(401).send({
                success: false,
                message: 'unAuthorized Access'
            });
        }

        else {
            next();
        }
    }

    catch (err) {
        console.log(err);

        res.status(401).send({
            success: false,
            err,
            message: "Error in admin middelware",
        });
    }
}

