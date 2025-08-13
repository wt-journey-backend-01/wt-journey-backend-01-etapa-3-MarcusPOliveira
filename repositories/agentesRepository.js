const db = require('../db/db')

const findAll = async () => {
  return await db('agentes').select('*')
}

const findById = async (id) => {
  return await db('agentes').where('id', id).first()
}

const create = async (agente) => {
  const [created] = await db('agentes').insert(agente).returning('*')
  return created
}

const update = async (id, updated) => {
  const [updatedAgente] = await db('agentes')
    .where('id', id)
    .update(updated)
    .returning('*')

  return updatedAgente || null
}

const patch = async (id, partial) => {
  const [patchedAgente] = await db('agentes')
    .where('id', id)
    .update(partial)
    .returning('*')

  return patchedAgente || null
}

const remove = async (id) => {
  const deletedCount = await db('agentes').where('id', id).del()
  return deletedCount > 0
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
}
