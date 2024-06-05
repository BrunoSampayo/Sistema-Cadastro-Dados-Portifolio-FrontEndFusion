'use server'

import prismadb from '@/lib/prisma'

export const getMemberById = async (id: string) => {
  try {
    const member = await prismadb.person.findUnique({
      where: {
        id,
      },
    })
    return member
  } catch (error) {
    console.log('GET_MEMBER_BY_ID_ERROR: ', error)
    return null
  }
}
