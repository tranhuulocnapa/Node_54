import { responseSuccess } from "../common/helpers/response.helper.js";
import { articleService } from "../services/article.service.js";

export const articleController = {
  async create(req, res, next) {
    const result = await articleService.create(req);
    const response = responseSuccess(result, `Create article successfully`);
    res.status(response.statusCode).json(response);
  },

  async findAll(req, res, next) {
    const result = await articleService.findAll(req);
    const response = responseSuccess(result, `lấy danh sách thành công`, 201);
    res.status(response.statusCode).json(response);
  },

  async findOne(req, res, next) {
    const result = await articleService.findOne(req);
    const response = responseSuccess(
      result,
      `Get article #${req.params.id} successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async update(req, res, next) {
    const result = await articleService.update(req);
    const response = responseSuccess(
      result,
      `Update article #${req.params.id} successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async remove(req, res, next) {
    const result = await articleService.remove(req);
    const response = responseSuccess(
      result,
      `Remove article #${req.params.id} successfully`,
    );
    res.status(response.statusCode).json(response);
  },
};
