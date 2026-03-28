export const chatMessageService = {
  async create(req) {
    return `This action create`;
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

    const result = await prisma.chatMessage.findMany({
      where: {
        ChatGroupMembers: {
          some: {
            userId: req.user.id,
          },
        },
      },
      skip: skip,
      take: pageSize,
      include: {
        ChatGroupMembers: {
          include: {
            Users: true,
          },
        },
      },
    });
    console.log(filters);
    const totalPage = await prisma.chatGroups.count({
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
    return `This action returns a id: ${req.params.id} chatMessage`;
  },

  async update(req) {
    return `This action updates a id: ${req.params.id} chatMessage`;
  },

  async remove(req) {
    return `This action removes a id: ${req.params.id} chatMessage`;
  },
};
