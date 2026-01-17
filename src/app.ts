import express from "express"
import authRoutes from "./routes/authRoutes.js"
import "dotenv/config"

const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.json({
        msg: "Hello"
    })
})


export default app