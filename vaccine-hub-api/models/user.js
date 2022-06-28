const db = require("../db")
const { UnauthorizedError } = require("../utils/errors")

class User {
    static async login(credentials) {
        // User should submit their email and pw
        // If any of the fields are missing, throw an error
        //
        // Lookup the user in the db by email
        // if user is found, compare the submitted pw
        // with the pw in the db
        // if there is a match, return the user
        //
        // if any of this goes wrong, throw an error
        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials) {
        // user should submit their email, pw
        // If any of the fields are missing, throw an error
        //
        // Make sure no user already exists in the system with that email
        // if one does, throw an error
        //
        // Take the users pw and hash it
        // take the users email and set to lowercase
        //
        // Create a new user in the db with all of their info
        // return the user
    }
}

module.exports = User