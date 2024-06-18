import { getProjectsByUserId } from '@/data/project'
import { ReturnPage } from '@/components/ui/return-page'
import { CldUploadButtonComponent } from '@/components/cloudinary-upload-button'
import { MemberProjects } from './_components/memberProjects'

export default async function MemberPage({
  params,
}: {
  params: { memberId: string }
}) {
  const data = await getProjectsByUserId(params.memberId)

  return (
    <div className="container rounded bg-white mx-auto mt-6 p-4">
      <ReturnPage />
      <p className="text-center text-4xl mb-4 font-bold">Upload dos projetos</p>
      <div className="flex justify-center items-center space-x-2">
        <span>Faça Upload de seus Projetos: </span>
        <CldUploadButtonComponent memberId={params.memberId} />
      </div>
      {data && <MemberProjects projects={data} />}
    </div>
  )
}
