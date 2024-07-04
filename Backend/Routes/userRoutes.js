import express from "express";
import { authUser} from "../Controllers/userController.js";
import {registerUser}  from "../Controllers/userController.js";
import {logoutUser}  from "../Controllers/userController.js";
import {getUserProfile}  from "../Controllers/userController.js";
import {updateUserProfile}  from "../Controllers/userController.js";
import { protect } from "../Middlewares/authMiddleware.js";
import { multerUploadUserProfile } from "../config/multerConfig.js";

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
.get(protect,getUserProfile)
.put(multerUploadUserProfile.single('profileImageName'),protect,updateUserProfile);

export default router;