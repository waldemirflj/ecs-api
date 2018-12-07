'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
  /**
  * @swagger
  * /user:
  *   get:
  *     tags:
  *       - User
  *     summary: Returns a list of users.
  *
  *     responses:
  *       200:
  *         description: Ok
  *         schema:
  *           type: array
  *           items:
  *             $ref: "#/definitions/User"
  */
  async index ({ request, response }) {
    const users = await User.all()

    return response
      .status(200)
      .json(users)
  }

  /**
  * @swagger
  * /user:
  *   post:
  *     tags:
  *       - User
  *     summary: Creates a new user.
  *
  *     consumes:
  *       - application/json
  *
  *     parameters:
  *       - in: body
  *         name: body
  *         description: The user to create.
  *         schema:
  *           $ref: "#/definitions/User"
  *
  *     responses:
  *       201:
  *         description: Created
  *         schema:
  *           type: object
  *           properties:
  *             message:
  *               type: string
  *       400:
  *         description: Bad Request
  *         schema:
  *           type: array
  *           items:
  *             $ref: "#/definitions/Validators"
  */
  async create ({ request, response }) {
    const {
      username,
      email,
      password } = request.all()

    await User.create({
      username,
      email,
      password,
    })

    return response
      .status(201)
      .json({
        message: 'Successfully registered.'
      })
  }

  /**
  * @swagger
  * /user/{id}:
  *   put:
  *     tags:
  *       - User
  *     summary: Update a user.
  *
  *     consumes:
  *       - application/json
  *
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: The user Id
  *       - in: body
  *         name: body
  *         description: The user to create.
  *         schema:
  *           properties:
  *             email:
  *               type: string
  *             username:
  *               type: string
  *             password:
  *               type: string
  *
  *     responses:
  *       200:
  *         description: Ok
  *         schema:
  *           type: object
  *           properties:
  *             message:
  *               type: string
  *       400:
  *         description: Bad Request
  *         schema:
  *           type: array
  *           items:
  *             $ref: "#/definitions/Validators"
  */
  async update ({ request, response, params: { id }}) {
    const rules = { id: 'integer' }
    const validation = await validate({ id }, rules)

    if (validation.fails()) {
      return response
        .status(400)
        .json(validation.messages())
    }

    const {
      email,
      username,
      password } = request.all()
    const user = await User.find(id)

    if (user) {
      user.username = username
      user.email = email
      user.password = password
      user.save()
    }

    return response
      .status(200)
      .json({
        message: 'Registry successfully updated.'
      })
  }

  /**
  * @swagger
  * /user/{id}:
  *   delete:
  *     tags:
  *       - User
  *     summary: Update a user.
  *
  *     consumes:
  *       - application/json
  *
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *           minimum: 1
  *         description: The user Id
  *
  *     responses:
  *       200:
  *         description: Ok
  *         schema:
  *           type: object
  *           properties:
  *             message:
  *               type: string
  *       400:
  *         description: Bad Request
  *         schema:
  *           type: array
  *           items:
  *             $ref: "#/definitions/Validators"
  */
  async delete ({ request, response, params: { id }}) {
    const rules = { id: 'integer' }
    const validation = await validate({ id }, rules)

    if (validation.fails()) {
      return response
        .status(400)
        .json(validation.messages())
    }

    const user = await User.find(id)

    if(user) {
      user.delete()
    }

    return response
      .status(200)
      .json({
        message: 'Registration successfully deleted.'
      })
  }
}

module.exports = UserController
