export const auth = {
  "/auth/get-info": {
    get: {
      tags: ["Auth"],
      summary: "Returns infomation a user",
      description: "Optional extended description in CommonMark or HTML.",
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login user",
      description: "Optional extended description in CommonMark or HTML.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "integer",
                  example: "loc@gmail.com",
                },
                passwork: {
                  type: "string",
                  example: "12345",
                },
              },
              example: {
                id: 10,
                name: "Jessica Smith",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
};
