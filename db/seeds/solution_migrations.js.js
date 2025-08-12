/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries (casos first due to foreign key)
  await knex('casos').del()
  await knex('agentes').del()
  
  // Reset sequences to start from 1
  await knex.raw('ALTER SEQUENCE agentes_id_seq RESTART WITH 1')
  await knex.raw('ALTER SEQUENCE casos_id_seq RESTART WITH 1')
  
  // Insert sample agents
  await knex('agentes').insert([
    {
      nome: 'Maria Santos',
      dataDeIncorporacao: '2019-06-15',
      cargo: 'delegado'
    },
    {
      nome: 'Pedro Oliveira',
      dataDeIncorporacao: '2021-03-22',
      cargo: 'inspetor'
    }
  ]);
  
  // Insert sample cases
  await knex('casos').insert([
    {
      titulo: 'Furto de veículo',
      descricao: 'Veículo Honda Civic foi furtado no estacionamento do shopping center',
      status: 'aberto',
      agente_id: 1
    },
    {
      titulo: 'Vandalismo em escola',
      descricao: 'Depredação das instalações da Escola Municipal José de Alencar',
      status: 'solucionado',
      agente_id: 2
    }
  ]);
};
