import express from "express";
import { userController } from "../controllers/user.controllers.js";
import { uploadDiskStorage } from "../common/multer/disk-storages.multer.js";
import { protect } from "../common/middlewares/protect.middlewares.js";
import { uploadMemory } from "../common/multer/memory-storage.multer.js";
// import multer from "multer";

// const upload = multer({ dest: "images/" });

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get("", userController.findAll);
userRouter.get("/:id", userController.findOne);

userRouter.post(
  "/avartar-local",
  protect,
  uploadDiskStorage.single("avatar"),
  userController.avartarLocal,
);

userRouter.post(
  "/avartar-cloud",

  protect,
  uploadMemory.single("avatar"),
  userController.avartarCloud,
);

export default userRouter;
