'use server'
import prismadb from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const getAllTeams = async () => {
  revalidatePath('/')
  try {
    const teams = await prismadb.team.findMany({ where: {} })
    return teams
  } catch (error) {
    console.log('GET_ALL_TEAM_ERROR: ', error)
    return null
  }
}

export const getTeamById = async (id: string) => {
  try {
    const team = await prismadb.team.findUnique({ where: { id } })
    return team
  } catch (error) {
    console.log('GET_TEAM_BY_ID_ERROR: ', error)
    return null
  }
}
