const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// تنظیمات Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'Automatically generated Swagger docs for Express.js',
    },
    servers: [
      {
        url: 'https://zavira-ten.vercel.app',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'https',
          scheme: 'bearer',
          bearerFormat: 'JWT', // اختیاری ولی بهتره باشه
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./api/**/*.js'], // مسیر فایل‌هایی که کامنت JSDoc دارند
};

// ساخت خروجی swaggerSpec (همون swagger.json)
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
