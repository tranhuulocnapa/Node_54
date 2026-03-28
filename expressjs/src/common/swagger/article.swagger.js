export const article = {
  "/article": {
    get: {
      tags: ["Article"],
      summary: "Returns a list of article.",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "string",

            example: "1",
          },
        },
        {
          in: "query",
          name: "pageSie",
          schema: {
            type: "string",

            example: "10",
          },
        },
      ],
      description: "Optional extended description in CommonMark or HTML.",
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },

  "/article/{id}": {
    get: {
      tags: ["Article"],
      summary: "Returns a list of article.",
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "string",

            example: "1",
          },
        },
      ],
      description: "Optional extended description in CommonMark or HTML.",
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
};
