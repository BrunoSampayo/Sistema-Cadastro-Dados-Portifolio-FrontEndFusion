'use server'
import prismadb from '@/lib/prisma'

export const getProjectsByUserId = async (id: string) => {
  try {
    const projects = await prismadb.project.findMany({
      where: { personId: id },
    })
    return projects
  } catch (error) {
    console.log('GET_PROJECT_BY_USERID_ERROR: ', error)
    return null
  }
}
