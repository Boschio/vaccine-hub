const express = require("express")
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
        // Take the users email and password, attempting to authenticate them
    } catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // Take the user's email, pw
        // and create a new user in the DB
    } catch(err) {
        next(err)
    }
})

router.post()

module.exports = router