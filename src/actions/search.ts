'use server'
import prismadb from '@/lib/prisma'
import { searchSchema } from '@/schemas'
import { redirect } from 'next/navigation'
import z from 'zod'
export const SearchTeam = async (value: z.infer<typeof searchSchema>) => {
  const validate = searchSchema.safeParse(value)

  if (validate.success) {
    const { name } = validate.data

    const team = await prismadb.team.findUnique({ where: { name } })

    if (!team) {
      return { error: 'Time Não Encontrado' }
    }

    redirect(`/${team.id}`)
  }
  return { error: 'Erro de Validação' }
}
