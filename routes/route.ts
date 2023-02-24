import { Router } from "express"
import { MainController } from "../controllers/MainController"

let router = Router()

let main = new MainController()

router.get("/", main.getUsers)
router.get("/:id", main.getUser)
router.post("/add", main.register)
router.put("/update/:id", main.updateUser)
router.delete("/delete/:id", main.deleteUser)

export default router