import prismadb from '@/lib/prisma'
import TableProjects from './_components/table/table'
import AddProjectForm from './_components/addProjectForm'

export default async function MemberPage({
  params,
}: {
  params: { memberId: string }
}) {
  const getMemberData = async () => {
    'use server'
    return await prismadb.project.findMany({
      where: { personId: params.memberId },
    })
  }

  const data = await getMemberData()

  if (data === null) return
  return (
    <div className="">
      <div className="w-1/2 rounded bg-white mx-auto mt-6 p-1">
        <p className="text-center font-bold">Seus projetos</p>
        <div className="flex justify-center">
          <AddProjectForm memberId={params.memberId} />
        </div>
        <TableProjects projecst={data} />
      </div>
    </div>
  )
}
