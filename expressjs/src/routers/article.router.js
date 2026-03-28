import express from "express";
import { articleController } from "../controllers/article.controller.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";

const articleRouter = express.Router();

// Tạo route CRUD
articleRouter.post("/", articleController.create);
articleRouter.get(
  "/",
  // (req, res, next) => {
  //   throw new BadRequestException("lỗi ở đây");
  // },
  articleController.findAll,
);
articleRouter.get("/:id", articleController.findOne);
articleRouter.patch("/:id", articleController.update);
articleRouter.delete("/:id", articleController.remove);

export default articleRouter;
