const mongoose = require("mongoose")

function getConect() {
    try {
        mongoose.connect("mongodb://localhost:27017/practice")
        console.log("DataBase connected")
    }
    catch (error) {
        console.log("Error", error.message)
    }
}
getConect()