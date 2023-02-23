import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface User {
  id: number
  email: string
  username: string
  password: string
  slug: string
  created_at: string
  updated_at: string
}

export async function createUser(user: User) {
  const newUser = await prisma.user.create({
    data: user,
  })
  return newUser
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
  })
  return user
}

export async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}