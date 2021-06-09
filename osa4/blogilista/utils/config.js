require('dotenv').config()

let PORT = process.env.PORT
let MONDODB_URI = process.env.MONGODB_URI

module.exports = {
    PORT, MONDODB_URI
}