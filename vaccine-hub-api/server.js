const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const { BadRequestError, NotFoundError } = require("./utils/errors")

const app = express()

// Enable cross-origin resource sharing for all origins
app.use(cors())

// Parse incoming request bodies with JSON payloads
app.use(express.json())

// Log request info
app.use(morgan("tiny"))

app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((error, req, res, next) => {
    const status = err.status || 500
    const message =err.message

    return res.status(status).json({
        error: { message, status },
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🐱‍👤Server running http://localhost:${PORT}`)
})
