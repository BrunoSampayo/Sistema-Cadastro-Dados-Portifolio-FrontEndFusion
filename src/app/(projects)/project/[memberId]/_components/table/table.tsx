import { columns } from './columns'
import { DataTable } from './data-table'
import { Project } from '@prisma/client'

export default async function TableProjects(props: { projecst: Project[] }) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={props.projecst} />
    </div>
  )
}
