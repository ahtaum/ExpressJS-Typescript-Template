import express, { Application } from "express"
import dotenv from "dotenv"
import router from "./routes/route"

dotenv.config()

const app: Application = express()
const port = process.env.PORT

// Body parsing Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", router)

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`)
    })
} catch (error: any) {
    console.error(`Error occured: ${error.message}`)
}