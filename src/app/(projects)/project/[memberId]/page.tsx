import TableProjects from './_components/table/table'
import AddProjectForm from './_components/addProjectForm'
import { getProjectsByUserId } from '@/data/project'
import { ReturnPage } from '@/components/ui/return-page'

export default async function MemberPage({
  params,
}: {
  params: { memberId: string }
}) {
  const data = await getProjectsByUserId(params.memberId)

  return (
    <div className="">
      <div className="w-1/2 rounded bg-white mx-auto mt-6 p-1">
        <ReturnPage />
        <p className="text-center font-bold">Seus projetos</p>
        <div className="flex justify-center">
          <AddProjectForm memberId={params.memberId} />
        </div>
        <TableProjects projecst={data || []} />
      </div>
    </div>
  )
}
