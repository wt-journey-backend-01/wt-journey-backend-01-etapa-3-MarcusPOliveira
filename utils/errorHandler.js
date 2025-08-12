const errorHandler = (err, req, res, next) => {
  console.error('Erro interno:', err)

  const status = err.status || 500
  const message = err.message || 'Erro interno no servidor'

  return res.status(status).json({
    status,
    message,
    errors: err.errors || null,
  })
}

module.exports = errorHandler
