/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('casos').del()

  await knex.raw('ALTER SEQUENCE casos_id_seq RESTART WITH 1')

  await knex('casos').insert([
    {
      titulo: 'Furto de veículo',
      descricao:
        'Veículo Honda Civic foi furtado no estacionamento do shopping center',
      status: 'aberto',
      agente_id: 1,
    },
    {
      titulo: 'Vandalismo em escola',
      descricao:
        'Depredação das instalações da Escola Municipal José de Alencar',
      status: 'solucionado',
      agente_id: 2,
    },
  ])
}
