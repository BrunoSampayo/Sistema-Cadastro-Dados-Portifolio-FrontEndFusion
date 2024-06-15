import TableMember from './_components/table/table'
import AddMemberForm from './_components/addMemberForm'
import { redirect } from 'next/navigation'
import { getTeamById } from '@/data/team'
import { ReturnPage } from '@/components/ui/return-page'

export default async function TeamPage({
  params,
}: {
  params: { teamId: string }
}) {
  const team = await getTeamById(params.teamId)

  if (!team) redirect('/')

  return (
    <div className="text-white container mt-4">
      <div className="bg-white rounded text-black p-1">
        <ReturnPage />
        <h1 className="text-center text-2xl font-bold mb-4">{team?.name}</h1>
        <div className="flex justify-center">
          <AddMemberForm teamId={team?.id} />
        </div>

        <TableMember teamId={team?.id} />
      </div>
    </div>
  )
}
