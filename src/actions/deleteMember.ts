'use server'

import prismadb from '@/lib/prisma'

export const deleteMember = async (id: string) => {
  await prismadb.person.delete({ where: { id } })
}
