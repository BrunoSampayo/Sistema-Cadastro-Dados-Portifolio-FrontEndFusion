import prismadb from '@/lib/prisma'

import { columns } from './_components/table/columns'
import { DataTable } from './_components/table/data-table'
import AddTeamForm from './_components/addTeamForm'

export default async function TeamPage() {
  const getData = async () => {
    'use server'
    const teams = await prismadb.team.findMany({
      where: {},
    })
    return teams
  }

  const data = await getData()
  return (
    <div className="text-white container space-y-6">
      <h1 className="text-center text-2xl mb-4"> </h1>
      <div className="flex justify-center">
        <AddTeamForm />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
