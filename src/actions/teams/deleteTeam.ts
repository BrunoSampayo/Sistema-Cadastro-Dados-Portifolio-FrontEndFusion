'use server'

import prismadb from '@/lib/prisma'

export const deleteTeam = async (id: string) => {
  await prismadb.team.delete({ where: { id } })
}
