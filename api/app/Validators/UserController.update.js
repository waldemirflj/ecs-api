'use strict'

class UserControllerUpdate {
  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users,email'
    }
  }
}

module.exports = UserControllerUpdate
