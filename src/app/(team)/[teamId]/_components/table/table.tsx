import prismadb from '@/lib/prisma'
import { columns } from './columns'
import { DataTable } from './data-table'

export default async function TableMember(props: {
  teamId: string | undefined
}) {
  const getData = async () => {
    'use server'

    const persons = await prismadb.person.findMany({
      where: { teamId: props.teamId },
    })

    return persons
  }

  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
