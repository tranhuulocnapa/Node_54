import { tokenService } from "../../services/token.sever.js";
import { UnauthorizedException } from "../helpers/exception.helper.js";
import { prisma } from "../prisma/generated/connect.prisma.js";

export const protect = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    throw new UnauthorizedException("bạn chưa đăng nhập hoặc token đã hết hạn");
  }

  const decode = tokenService.verifyaccessToken(accessToken);
  const userExits = await prisma.users.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!userExits) {
    throw new UnauthorizedException("tài khoản không tồn tại");
  }

  req.user = userExits;

  console.log("protect", accessToken, userExits);
  next();
};
