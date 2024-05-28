'use server'
import prismadb from '@/lib/prisma'
import { addProjectSchema } from '@/schemas'

import z from 'zod'
export const addProject = async (
  value: z.infer<typeof addProjectSchema>,
  memberId: string | undefined,
) => {
  const validate = addProjectSchema.safeParse(value)

  if (validate.success) {
    if (!memberId) return { error: 'Id do Time Invalido' }
    const member = await prismadb.person.findFirst({ where: { id: memberId } })
    if (!member) {
      return { error: 'Time Não Encontrado' }
    }
    try {
      await prismadb.project.create({
        data: {
          projectUrl: validate.data.projectUrl,
          personId: member.id,
        },
      })
    } catch (e) {
      console.log(e)
    }
    return { success: 'Projeto adicionado com sucesso' }
  }
  return { error: 'Erro de Validação' }
}
