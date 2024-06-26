'use server'
import prismadb from '@/lib/prisma'
import { editMemberSchema } from '@/schemas'

import z from 'zod'
export const editMember = async (
  value: z.infer<typeof editMemberSchema>,
  id: string,
) => {
  const validate = editMemberSchema.safeParse(value)

  if (validate.success) {
    const member = await prismadb.person.findUnique({ where: { id } })

    if (!member) return { error: 'Usuario não encontrado' }
    const data = await fetch(`https://api.github.com/users/${value.githubName}`)
    if (!data.ok) return { error: 'Seu nome usuario Github esta incorreto' }
    const jsonData = await data.json()
    const avatarUrl = jsonData.avatar_url as string

    value.githubImgUrl = avatarUrl
    try {
      await prismadb.person.update({ where: { id: member.id }, data: value })
    } catch (e) {
      console.log(e)
    }
    return { success: 'Usuario editado com sucesso' }
  }
  return { error: 'Erro de Validação formulario' }
}
