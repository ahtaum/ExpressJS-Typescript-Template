import { PrismaClient, User } from "@prisma/client"
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

    public async register(req: Request, res: Response): Promise<Response> {
        try {
          let { email, username, password } = req.body

          let slug = username?.replace(/\s+/g, '-')?.toLowerCase() ?? ''
    
          let user: User = await prisma.user.create({
            data: {
              email,
              username,
              password,
              slug,
            },
          })
    
          return res.status(201).json({
            status: "OK",
            code: 201,
            message: "success",
            data: user,
          })
        } catch (error: any) {
          return res.status(500).json({
            status: "ERROR",
            code: 500,
            message: error.message,
          })
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
      try {
        let { id } = req.params
        let { email, username, password } = req.body

        let slug = username?.replace(/\s+/g, "-")?.toLowerCase() ?? ""

        let updatedUser = await prisma.user.update({
          where: {
            id: parseInt(id)
          },
          data: {
            email,
            username,
            password,
            slug,
          },
        })

        return res.status(200).json({
          status: "OK",
          code: 200,
          message: "success",
          data: updatedUser,
        })
      } catch (error: any) {
        return res.status(500).json({
          status: "ERROR",
          code: 500,
          message: error.message,
        })
      }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
      try {
        let userId = parseInt(req.params.id)
        let user = await prisma.user.findUnique({ where: { id: userId } })

        if (!user) {
          return res.status(404).json({
            status: "NOT FOUND",
            code: 404,
            message: `User with ID ${userId} not found`,
          })
        }

        await prisma.user.delete({ where: { id: userId } })

        return res.status(200).json({
          status: "OK",
          code: 200,
          message: "success",
          data: null,
        })
      } catch (error: any) {
        return res.status(500).json({
          status: "ERROR",
          code: 500,
          message: error.message,
        })
      }
    }

}