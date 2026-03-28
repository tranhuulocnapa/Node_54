import { BadRequestException } from "../common/helpers/exception.helper.js";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";

export const tokenService = {
  createAccessToken(userId) {
    if (!userId) {
      throw new BadRequestException("không có user để tạo token");
    }
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
    return accessToken;
  },

  createRefreshToken(userId) {
    if (!userId) {
      throw new BadRequestException("không có user để tạo token");
    }
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return refreshToken;
  },

  verifyaccessToken(accessToken, option) {
    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, option);
    return decode;
  },

  verifyRefreshToken(refreshToken, option) {
    const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, option);
    return decode;
  },
};
