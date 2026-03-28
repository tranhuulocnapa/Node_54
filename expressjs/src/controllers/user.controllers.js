import { responseSuccess } from "../common/helpers/response.helper.js";
import { userService } from "../services/user.server.js";

export const userController = {
  async findAll(req, res, next) {
    const result = await userService.findAll(req);
    const response = responseSuccess(result, `findAll user successfully`);
    res.status(response.statusCode).json(response);
  },

  async findOne(req, res, next) {
    const result = await userService.findOne(req);
    const response = responseSuccess(result, `findOne user successfully`);
    res.status(response.statusCode).json(response);
  },

  async avartarLocal(req, res, next) {
    const result = await userService.avartarLocal(req);
    const response = responseSuccess(result, `avartarLocal user successfully`);
    res.status(response.statusCode).json(response);
  },

  async avartarCloud(req, res, next) {
    const result = await userService.avartarCloud(req);
    const response = responseSuccess(result, `avartarCloud users successfully`);
    res.status(response.statusCode).json(response);
  },
};
