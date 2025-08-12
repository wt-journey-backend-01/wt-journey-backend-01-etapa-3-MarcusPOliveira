const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Departamento de Polícia',
      version: '1.0.0',
      description: 'Documentação da API que gerencia casos e agentes policiais',
    },
  },
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = setupSwagger
