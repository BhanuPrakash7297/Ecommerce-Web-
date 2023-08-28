
import express from 'express';
import { registerConteroller, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post('/register', registerConteroller);
router.post('/login', loginController);
//protected route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// use profilce
router.put("/profile", requireSignIn, updateProfileController);

router.post("/forgot-password", forgotPasswordController);

router.get('/test', requireSignIn, isAdmin, testController);


//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);

export default router;