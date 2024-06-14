const express = require("express")
require("./dbConnect")
const app = express()
const NewUserRoute = require("./Controller/NewUserRoute")

app.use(express.json())

app.use("/api/new-user",NewUserRoute)

app.listen(8100,()=>console.log("http://localhost:8100/api/"))