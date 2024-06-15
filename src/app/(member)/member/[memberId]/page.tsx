import EditMember from './_components/editMemberForm'
import { getMemberById } from '@/data/member'
import { redirect } from 'next/navigation'
import { ReturnPage } from '@/components/ui/return-page'

export default async function MemberPage({
  params,
}: {
  params: { memberId: string }
}) {
  const data = await getMemberById(params.memberId)
  if (!data) redirect('/')
  return (
    <div className=" container">
      <div className="rounded bg-white mx-auto mt-6 p-1">
        <ReturnPage />
        <p className="text-center font-semibold">Usuario: {data?.name}</p>
        <EditMember person={data} />
      </div>
    </div>
  )
}
