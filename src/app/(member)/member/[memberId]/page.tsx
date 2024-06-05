import EditMember from './_components/editMemberForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { getMemberById } from '@/data/member'
import { redirect } from 'next/navigation'

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
        <Link
          href={`/${data.teamId}`}
          className="m-4 rounded-full border size-10 flex justify-center items-center hover:bg-black hover:text-white"
        >
          <ChevronLeft />
        </Link>
        <p className="text-center font-semibold">Usuario: {data?.name}</p>
        <EditMember person={data} />
      </div>
    </div>
  )
}
