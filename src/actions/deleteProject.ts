'use server'

import prismadb from '@/lib/prisma'

export const deleteProject = async (id: string) => {
  await prismadb.project.delete({ where: { id } })
}
