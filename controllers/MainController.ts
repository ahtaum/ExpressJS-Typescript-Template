import { Request, Response } from "express"

export class MainController {

    public getUsers(req: Request, res: Response) {
        try {
            return res.status(200).json({ status: "OK", code: 200, message: "success" })
        } catch (error: any) {
            return res.status(500).json({ status: "ERROR", code: 500, message: error.message })
        }
    }

    public getUser(req: Request, res: Response) {
        try {
            return res.status(200).json({ status: "OK", code: 200, message: "success", data: req.params.id })
        } catch (error: any) {
            return res.status(500).json({ status: "ERROR", code: 500, message: error.message })
        }
    }

}