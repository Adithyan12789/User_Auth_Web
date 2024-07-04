import express from "express";
import { authAdmin, adminLogout, addNewUser, deleteUser, updateUserData, getAllUser } from "../Controllers/adminController.js";
import { protect } from "../Middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.post('/auth', authAdmin);
router.post('/logout', adminLogout);
router.post('/get-user',protect,getAllUser)
router.put('/update-user',updateUserData)
router.delete('/delete-user',deleteUser)
router.post('/add-user',addNewUser)
  

export default router;