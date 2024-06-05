import { columns } from '@/components/table/columns'
import AddTeamForm from '../components/addTeamForm'

import { DataTable } from '@/components/table/data-table'
import { getAllTeams } from '@/data/team'

export default async function TeamPage() {
  const data = await getAllTeams()

  return (
    <div className="text-white container space-y-6 mt-2">
      <h1 className="text-center text-2xl mb-4">
        Sistema de Gerenciamento de Time Code Explorer
      </h1>
      <div className="flex justify-center">
        <AddTeamForm />
      </div>
      <DataTable columns={columns} data={data || []} />
    </div>
  )
}
