import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/generated/connect.prisma.js";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  // true là bắt buộc BE phải có domain https,
  // false là dành cho dev dùng http
  secure: false,

  // Không cần cung cấp vì ở file .env đã có CLOUDINARY_URL
  // cloudinary tự động đọc CLOUDINARY_URL
  // api_key: "",
  // api_secret: "",
  // cloud_name: "",
});

export const userService = {
  async avartarLocal(req) {
    console.log({
      "req.file:": req.file,
    });

    if (!req.file) {
      throw new BadRequestException("thiếu file");
    }

    // Vì 1 user chỉ có 1 avatar, nên phải xoá hình cũ nếu có
    if (req.user.avatar) {
      // win: \\
      // mac: //
      const oldFilePath = path.join("public/images/", req.user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: req.file.filename,
      },
    });

    return `http://localhost:3069/images/${req.file.filename}`;
  },

  async avartarCloud(req) {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "node_54" }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(req.file.buffer);
    });

    console.log({
      "req.file": req.file,
      "req.body": req.body,
      "req.user": req.user,
      uploadResult: uploadResult,
    });

    return `This action avartarCloud`;
  },

  async findAll(req) {
    //phân trang
    const pageDefault = 1;
    const pageSizeDefault = 3;
    const query = req.query;
    let page = Number(query.page) || pageDefault;
    let pageSize = Number(query.pageSize) || pageSizeDefault;
    if (page < 1) page = pageDefault;
    if (pageSize < 1) pageSize = pageSizeDefault;
    const skip = (page - 1) * pageSize;

    //filter

    let { filters } = req.query || {};

    try {
      filters = JSON.parse(filters);
    } catch (error) {
      filters = {};
    }

    Object.entries(filters).forEach(([key, value]) => {
      // console.log({ key, value });
      if (typeof value === "string") {
        filters[key] = {
          contains: value,
        };
      }
    });

    const result = await prisma.users.findMany({
      where: {
        ...filters,
        isDeleted: false,
      },
      skip: skip,
      take: pageSize,
    });
    console.log(filters);
    const totalPage = await prisma.users.count({
      where: {
        ...filters,
        isDeleted: false,
      },
    });
    const totalPageSize = Math.ceil(totalPage / pageSize);
    return {
      totalPage: totalPage,
      totalPageSize: totalPageSize,
      page: page,
      pageSize: pageSize,
      items: result,
    };
  },

  async findOne(req) {
    const { id } = req.params;

    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    return user;
  },
};
