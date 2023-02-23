import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

let prisma = new PrismaClient()

export class MainController {

    public async getUsers(req: Request, res: Response) {
        try {
            let data = await prisma.user.findMany()

            return res.status(200).json({ status: "OK", code: 200, data: data })
        } catch (error: any) {
            return res.status(500).json({ status: "ERROR", code: 500, message: error.message })
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            let data = await prisma.user.findUnique({ where: { id: Number(req.params.id) } })

            return res.status(200).json({ status: "OK", code: 200, message: "success", data: data })
        } catch (error: any) {
            return res.status(500).json({ status: "ERROR", code: 500, message: error.message })
        }
    }

}