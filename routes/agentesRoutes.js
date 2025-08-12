const express = require('express')
const router = express.Router()

const agentesController = require('../controllers/agentesController')

/**
 * @swagger
 * tags:
 *   name: Agentes
 *   description: Gerenciamento de agentes da polícia
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Lista todos os agentes
 *     tags: [Agentes]
 *     parameters:
 *       - in: query
 *         name: cargo
 *         schema:
 *           type: string
 *         description: Filtrar por cargo
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [dataDeIncorporacao, -dataDeIncorporacao]
 *         description: Ordenar por data de incorporação (asc/desc)
 *     responses:
 *       200:
 *         description: Lista de agentes retornada com sucesso
 */
router.get('/agentes', agentesController.getAll)

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Busca um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agente
 *     responses:
 *       200:
 *         description: Agente encontrado
 *       404:
 *         description: Agente não encontrado
 */
router.get('/agentes/:id', agentesController.getById)

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Cria um novo agente
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, dataDeIncorporacao, cargo]
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *                 format: date
 *               cargo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/agentes', agentesController.create)

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza todos os dados de um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, nome, dataDeIncorporacao, cargo]
 *             properties:
 *               id:
 *                 type: string
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *               cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Agente não encontrado
 */
router.put('/agentes/:id', agentesController.put)

/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: Atualiza parcialmente os dados de um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *               cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Agente não encontrado
 */
router.patch('/agentes/:id', agentesController.patch)

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Remove um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Agente removido com sucesso
 *       404:
 *         description: Agente não encontrado
 */
router.delete('/agentes/:id', agentesController.remove)

module.exports = router
