'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
  async index ({ request, response }) {
    const users = await User.all()

    return response
      .status(200)
      .json(users)
  }

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
      .status(202)
      .json({
        message: 'Successfully registered.'
      })
  }

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
      username } = request.all()
    const user = await User.find(id)

    if (user) {
      user.username = username
      user.email = email
      user.save()
    }

    return response
      .status(200)
      .json({
        message: 'Registry successfully updated.'
      })
  }

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
