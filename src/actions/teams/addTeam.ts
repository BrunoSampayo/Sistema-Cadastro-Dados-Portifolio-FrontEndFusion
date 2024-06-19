'use server'
import prismadb from '@/lib/prisma'
import { addTeamSchema } from '@/schemas'

import z from 'zod'
export const addTeam = async (value: z.infer<typeof addTeamSchema>) => {
  const validate = addTeamSchema.safeParse(value)

  if (validate.success) {
    const team = await prismadb.team.findFirst({
      where: { name: validate.data.name },
    })
    if (team) {
      return { error: 'Já Existe um time com esse nome' }
    }
    try {
      await prismadb.team.create({
        data: {
          name: validate.data.name,
        },
      })
    } catch (e) {
      console.log(e)
    }
    return { success: 'Time criado com sucesso' }
  }
  return { error: 'Erro de Validação' }
}
