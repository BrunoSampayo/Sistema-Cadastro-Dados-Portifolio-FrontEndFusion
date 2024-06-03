import prismadb from '@/lib/prisma'

import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { teamName: string } },
) {
  console.log(params.teamName)
  const team = await prismadb.team.findUnique({
    where: { name: params.teamName },
  })

  if (!team)
    return new NextResponse('Não encontrado', {
      status: 403,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  const completeData = await prismadb.team.findUnique({
    where: { name: params.teamName },
    include: { people: { include: { projects: true } } },
  })

  return NextResponse.json(completeData, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
