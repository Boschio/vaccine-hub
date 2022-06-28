const bcrypt = require("bcrypt")
const db = require("../db")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

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
        const requiredFields = ["password", "firstName", "lastName", "email", "location", "date"]
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })

        if(credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }
        //
        // Make sure no user already exists in the system with that email
        // if one does, throw an error
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }
        //
        // Take the users pw and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
        // take the users email and set to lowercase
        const lowerCasedEmail = credentials.email.toLowerCase()
        //
        // Create a new user in the db with all of their info
        const result = await db.query(`
        INSERT INTO users (
            password,
            first_name,
            last_name,
            email,
            location,
            date
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING email, password, first_name, last_name, location, date;
        `,[hashedPassword, credentials.firstName, credentials.lastName, lowerCasedEmail, credentials.location, credentials.date])
        // return the user
        const user = result.rows[0]

        return user
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }
}

module.exports = User