const db = require('../db/db')

const findAll = async () => {
  return await db('casos').select('*')
}

const findById = async (id) => {
  return await db('casos').where('id', id).first()
}

const create = async (caso) => {
  const [created] = await db('casos').insert(caso).returning('*')
  return created
}

const update = async (id, updated) => {
  const [updatedCaso] = await db('casos')
    .where('id', id)
    .update(updated)
    .returning('*')

  return updatedCaso || null
}

const patch = async (id, data) => {
  const [patchedCaso] = await db('casos')
    .where('id', id)
    .update(data)
    .returning('*')

  return patchedCaso || null
}

const remove = async (id) => {
  const deletedCount = await db('casos').where('id', id).del()
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
