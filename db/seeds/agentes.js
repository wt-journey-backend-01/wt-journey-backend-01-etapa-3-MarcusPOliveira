/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('agentes').del()

  await knex.raw('ALTER SEQUENCE agentes_id_seq RESTART WITH 1')

  await knex('agentes').insert([
    {
      nome: 'Maria Santos',
      dataDeIncorporacao: '2019-06-15',
      cargo: 'delegado',
    },
    {
      nome: 'Pedro Oliveira',
      dataDeIncorporacao: '2021-03-22',
      cargo: 'inspetor',
    },
  ])
}
