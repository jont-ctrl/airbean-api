import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AirBean API",
      version: "1.0.0",
      description: "API for AirBean coffee ordering",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
