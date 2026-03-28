import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/generated/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.sever.js";
import { ref } from "node:process";

export const authService = {
  async register(req) {
    const { fullName, passwork, email } = req.body;

    const userExits = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExits) {
      throw new BadRequestException("tài khoản đã tồn tại");
    }

    const passWorkhash = bcrypt.hashSync(passwork, 10);
    await prisma.users.create({
      data: {
        fullName: fullName,
        passwork: passWorkhash,
        email: email,
      },
    });

    console.log({ fullName, passWorkhash, email, userExits });

    return true;
  },
  async login(req) {
    const { email, password } = req.body;
    const userExits = await prisma.users.findUnique({
      where: {
        email: email,
      },
      omit: { passWork: false },
    });

    if (!userExits) {
      throw new BadRequestException("tài khoản không tồn tại");
    }

    const isPassWork = bcrypt.compareSync(password, userExits.passWork);
    if (!isPassWork) {
      throw new BadRequestException("mật khẩu không đúng");
    }
    const accessToken = tokenService.createAccessToken(userExits.id);
    const refreshToken = tokenService.createRefreshToken(userExits.id);

    console.log(email, password, userExits);
    return {
      accessToken,
      refreshToken: refreshToken,
    };
  },

  async getInfo(req) {
    return req.user;
  },

  async refreshToken(req) {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken) {
      throw new UnauthorizedException("Không có accessToken để kiểm tra");
    }

    if (!refreshToken) {
      throw new UnauthorizedException("Không có refreshToken để kiểm tra.");
    }

    // tại vì accessToken đang bị hết hạn, FE đang muốn làm mới
    // cho nên không được kiểm tra hạn của accessToken { ignoreExpiration: true }
    const decodeAccessToken = tokenService.verifyaccessToken(accessToken, {
      ignoreExpiration: true,
    });
    const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);
    if (decodeAccessToken.userId !== decodeRefreshToken.userId) {
      throw new UnauthorizedException("Token không hợp lệ..");
    }

    const userExits = await prisma.users.findUnique({
      where: {
        id: decodeAccessToken.userId,
      },
    });

    const accessTokenNew = tokenService.createAccessToken(userExits.id);
    const refreshTokenNew = tokenService.createRefreshToken(userExits.id);

    return {
      accessToken: accessTokenNew,
      refreshToken: refreshTokenNew,
    };
  },
};
