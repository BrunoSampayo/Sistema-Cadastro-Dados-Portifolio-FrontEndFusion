'use client'
import { deleteProject } from '@/actions/deleteProject'
import { Button } from '@/components/ui/button'
import { Project } from '@prisma/client'
import { TrashIcon } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
export const ProjectImage = ({ project }: { project: Project }) => {
  const deleteProjectHandler = async () => {
    await deleteProject(project.id, project.public_id)
    window.location.reload()
  }
  return (
    <div className="mt-4 mx-auto md:w-full w-4/5 relative shadow-md shadow-gray-500 p-2 h-64">
      <Button
        onClick={deleteProjectHandler}
        variant="destructive"
        className="absolute text-red-800 ml-4 mt-2"
      >
        <TrashIcon className="text-black size-5" />
      </Button>
      <CldImage
        className="h-full"
        width="960"
        height="700"
        alt="project Image"
        src={project.public_id}
      />
    </div>
  )
}
