
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import orderModel from '../models/orderModel.js';
export const registerConteroller = async (req, res) => {
    try {
        console.log(req.body);
        console.log("hello");
        const { name, email, password, phone, address, answer } = req.body;
        console.log(password);
        //validation 
        if (!name) {
            res.send({ message: "Name is required" });
        }
        if (!email) {
            res.send({ message: "Email is required" });
        }
        if (!password) {
            res.send({ message: "Password is required" });
        }
        if (!phone) {
            res.send({ message: "Phone number is required" });
        }
        if (!address) {
            res.send({ message: "address is required" });
        }
        if (!answer) {
            res.send({ message: "answer is required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: 'false',
                message: 'Already Registerd Please Login'
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer
        }).save();


        res.status(201).send({
            success: true,
            message: 'Registerd Succesfully',
            user
        })
    }


    catch (err) {
        console.log(err);
        res.status(500).send({
            succuss: false,
            message: 'Error in Registration',
            err
        })
    }
};



export const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        });

        // console.log(token)
        res.status(200).send({
            success: true,
            message: 'Logged in succesfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    }

    catch (err) {
        res.status(500).send({
            success: false,
            message: 'error in login',
            err
        });
    }
}




export const testController = (req, res) => {
    res.send('protected route');
}


export const forgotPasswordController = async (req, res) => {
    try {
        console.log(req.body);
        const { email, newPassword, answer } = req.body;

        if (!email) {
            res.status(400).send({ message: 'Email is required !' });
        }
        if (!newPassword) {
            res.status(400).send({ message: 'newPassword is required !' });
        }
        if (!answer) {
            res.status(400).send({ message: 'answer is required !' });
        }

        const user = await User.findOne({ email, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email Or Password'
            });
        }

        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashed });

        res.status(200).send({
            success: true,
            message: 'Password reset succesfully'
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }

}


// user profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await User.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};







// orders

//orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};
//orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};





































































































































































































































































