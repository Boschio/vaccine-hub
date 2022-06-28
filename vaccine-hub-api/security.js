const bcrypt = require("bcrypt")

const pw = "supersecretpassword"

bcrypt.hash(pw, 6, (err, hashedPw) => {
    console.log("PW is: ",pw)
    console.log("Hashed PW is: ",hashedPw)
})