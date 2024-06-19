'use server'
import prismadb from '@/lib/prisma'
import { addMemberSchema } from '@/schemas'

import z from 'zod'
export const AddMember = async (
  value: z.infer<typeof addMemberSchema>,
  teamId: string | undefined,
) => {
  const validate = addMemberSchema.safeParse(value)

  if (validate.success) {
    if (!teamId) return { error: 'Id do Time Invalido' }
    const team = await prismadb.team.findFirst({ where: { id: teamId } })
    if (!team) {
      return { error: 'Time Não Encontrado' }
    }
    try {
      await prismadb.person.create({
        data: {
          name: value.name,
          teamId: team.id,
          facebookUrl: '',
          githubName: '',
          githubUrl: '',
          instagramUrl: '',
          linkedinUrl: '',
          subTitle: '',
          text: '',
        },
      })
    } catch (e) {
      console.log(e)
    }
    return { success: 'Usuario criado com sucesso' }
  }
  return { error: 'Erro de Validação' }
}
