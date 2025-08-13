const { z } = require('zod')

const agenteSchema = z.object({
  nome: z.string().min(1, "Campo 'nome' é obrigatório"),
  dataDeIncorporacao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Data de incorporação deve estar no formato AAAA-MM-DD',
  }),
  cargo: z.string().min(1, "Campo 'cargo' é obrigatório"),
})

const agenteSchemaComId = agenteSchema.extend({
  id: z
    .number()
    .int()
    .positive("Campo 'id' deve ser um número inteiro positivo"),
})

const casoSchema = z.object({
  titulo: z.string().min(1, "Campo 'titulo' é obrigatório"),
  descricao: z.string().min(1, "Campo 'descricao' é obrigatório"),
  status: z.enum(['aberto', 'solucionado'], {
    message: "Status deve ser 'aberto' ou 'solucionado'",
  }),
  agente_id: z
    .number()
    .int()
    .positive("Campo 'agente_id' deve ser um número inteiro positivo"),
})

const casoSchemaComId = casoSchema.extend({
  id: z
    .number()
    .int()
    .positive("Campo 'id' deve ser um número inteiro positivo"),
})

module.exports = {
  agenteSchema,
  agenteSchemaComId,
  casoSchema,
  casoSchemaComId,
}
