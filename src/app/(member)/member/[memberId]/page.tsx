import prismadb from '@/lib/prisma'
import EditMember from './_components/editMemberForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

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
