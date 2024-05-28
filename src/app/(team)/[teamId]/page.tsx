import prismadb from '@/lib/prisma'
import TableMember from './_components/table/table'
import AddMemberForm from './_components/addMemberForm'

export default async function TeamPage({
  params,
}: {
  params: { teamId: string }
}) {
  const team = await prismadb.team.findFirst({
    where: { id: params.teamId },
  })

  return (
    <div className="text-white">
      <h1 className="text-center text-2xl mb-4">{team?.name}</h1>
      <div className="flex justify-center">
        <AddMemberForm teamId={team?.id} />
      </div>

      <TableMember teamId={team?.id} />
    </div>
  )
}
