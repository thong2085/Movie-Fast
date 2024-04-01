import express from "express";
import * as userController from "../controllers/UserController.js";
import { admin, protect } from "../middlewares/Auth.js";

const router = express.Router();

// ********* PUBLIC ROUTES ****************
router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);

// ********* PRIVATE ROUTES ****************
router.put("/", protect, userController.updateUserProfile);
router.delete("/", protect, userController.deleteUserProfile);
router.put("/password", protect, userController.changeUserPassword);
router.get("/favourites", protect, userController.getLikedMovies);
router.post("/favourites", protect, userController.addLikedMovie);
router.delete("/favourites", protect, userController.deleteLikedMovies);

// ********* ADMIN ROUTES ****************

router.get("/", protect, admin, userController.getUsers);
router.delete("/:id", protect, admin, userController.deleteUser);
export default router;
