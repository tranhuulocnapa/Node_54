import { prisma } from "../common/prisma/generated/connect.prisma.js";

// {{domain}}/article?page=2&pagesize=3

export const articleService = {
  async create(req) {
    const body = req.body;
    await prisma.articles.create({
      data: {
        title: body.title,
        content: body.content,
        userId: 1,
      },
    });

    return true;
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

    const result = await prisma.articles.findMany({
      where: {
        ...filters,
        isDeleted: false,
      },
      skip: skip,
      take: pageSize,
    });
    console.log(filters);
    const totalPage = await prisma.articles.count({
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

    const article = await prisma.articles.findUnique({
      where: {
        id: Number(id),
      },
    });

    return article;
  },

  async update(req) {
    const body = req.body;
    const id = req.params.id;
    const articleUpdate = await prisma.articles.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return true;
  },

  async remove(req) {
    const id = req.params.id;
    await prisma.articles.update({
      where: {
        id: Number(id),
      },
      data: {
        isDeleted: true,
        createdAt: new Date(),
        deletedBy: 1,
      },
    });

    return true;
  },
};
