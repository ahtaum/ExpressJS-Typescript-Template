import { Router } from "express"
import { MainController } from "../controllers/MainController"

let router = Router()

let main = new MainController()

router.get("/", main.getUsers)
router.get("/:id", main.getUser)

export default router