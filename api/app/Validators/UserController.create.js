'use strict'

class UserControllerCreate {
  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users,email',
      password: 'required'
    }
  }
}

module.exports = UserControllerCreate
