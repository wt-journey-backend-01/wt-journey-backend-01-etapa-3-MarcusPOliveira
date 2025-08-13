const { agenteSchema, agenteSchemaComId } = require('../schemas')
const agentesRepository = require('../repositories/agentesRepository')

const getAll = async (req, res) => {
  let agentes = await agentesRepository.findAll()
  const { cargo, sort } = req.query

  if (cargo) {
    const cargosValidos = ['delegado', 'inspetor']
    if (!cargosValidos.includes(cargo.toLowerCase())) {
      return res.status(400).json({
        status: 400,
        message: 'Cargo inválido no filtro',
        errors: [
          { cargo: 'Cargo não reconhecido. Use "delegado" ou "inspetor"' },
        ],
      })
    }

    agentes = agentes.filter(
      (a) => a.cargo.toLowerCase() === cargo.toLowerCase()
    )
  }

  if (sort) {
    const validSortFields = ['dataDeIncorporacao']
    const sortKey = sort.replace('-', '')
    const reverse = sort.startsWith('-')

    if (!validSortFields.includes(sortKey)) {
      return res.status(400).json({
        status: 400,
        message: 'Campo de ordenação inválido',
        errors: [
          {
            sort: 'Campo sort deve ser "dataDeIncorporacao" ou "-dataDeIncorporacao"',
          },
        ],
      })
    }

    agentes.sort((a, b) => {
      const aDate = new Date(a[sortKey])
      const bDate = new Date(b[sortKey])
      return reverse ? bDate - aDate : aDate - bDate
    })
  }

  res.json(agentes)
}

const getById = async (req, res) => {
  const { id } = req.params
  const agente = await agentesRepository.findById(parseInt(id))

  if (!agente) return res.status(404).json({ message: 'Agente não encontrado' })

  res.status(200).json(agente)
}

const create = async (req, res) => {
  const parsed = agenteSchema.safeParse(req.body)

  if (!parsed.success) {
    const formattedErrors = parsed.error.issues.map((issue) => ({
      [issue.path[0]]: issue.message,
    }))
    return res.status(400).json({
      status: 400,
      message: 'Parâmetros inválidos',
      errors: formattedErrors,
    })
  }

  try {
    const novoAgente = await agentesRepository.create(parsed.data)
    res.status(201).json(novoAgente)
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

const put = async (req, res, next) => {
  try {
    const { id } = req.params
    const idNum = parseInt(id)
    const parsed = agenteSchemaComId.safeParse({ ...req.body, id: idNum })

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        [issue.path[0]]: issue.message,
      }))
      return res.status(400).json({
        status: 400,
        message: 'Parâmetros inválidos',
        errors,
      })
    }

    if (parsed.data.id !== idNum) {
      return res.status(400).json({
        status: 400,
        message: 'ID no corpo da requisição deve ser igual ao ID da URL',
        errors: [{ id: 'ID inconsistente com o parâmetro da URL' }],
      })
    }

    const updated = await agentesRepository.update(idNum, parsed.data)
    if (!updated) {
      return res.status(404).json({ message: 'Agente não encontrado' })
    }

    res.json(updated)
  } catch (err) {
    next(err)
  }
}

const patch = async (req, res) => {
  try {
    const partialSchema = agenteSchema.partial()
    const data = partialSchema.parse(req.body)

    const updated = await agentesRepository.patch(parseInt(req.params.id), data)
    if (!updated)
      return res.status(404).json({ message: 'Agente não encontrado' })

    res.json(updated)
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: 'Parâmetros inválidos',
      errors: error.flatten().fieldErrors,
    })
  }
}

const remove = async (req, res) => {
  const deleted = await agentesRepository.remove(parseInt(req.params.id))
  if (!deleted)
    return res.status(404).json({ message: 'Agente não encontrado' })

  res.status(204).send()
}

const getCasos = async (req, res) => {
  const { id } = req.params
  const agentId = parseInt(id)

  // Verify agent exists
  const agente = await agentesRepository.findById(agentId)
  if (!agente) {
    return res.status(404).json({ message: 'Agente não encontrado' })
  }

  // Get cases for this agent
  const casosRepository = require('../repositories/casosRepository')
  const allCases = await casosRepository.findAll()
  const agentCases = allCases.filter((caso) => caso.agente_id === agentId)

  res.json(agentCases)
}

module.exports = {
  getAll,
  getById,
  create,
  put,
  patch,
  remove,
  getCasos,
}
