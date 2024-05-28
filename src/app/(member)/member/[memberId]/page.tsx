import prismadb from '@/lib/prisma'
import EditMember from './_components/editMemberForm'

export default async function MemberPage({
  params,
}: {
  params: { memberId: string }
}) {
  const getMemberData = async () => {
    'use server'
    return await prismadb.person.findUnique({ where: { id: params.memberId } })
  }

  const data = await getMemberData()
  if (data === null) return
  return (
    <div className="">
      <div className="w-1/2 rounded bg-white mx-auto mt-6 p-1">
        <p className="text-center">Usuario: {data?.name}</p>
        <EditMember person={data} />
      </div>
    </div>
  )
}
