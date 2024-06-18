import { Project } from '@prisma/client'
import { ProjectImage } from './projectImage'

export const MemberProjects = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="mt-8 pb-8">
      <h2 className="text-center text-4xl font-bold">Seus Projetos</h2>
      <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1">
        {projects.map((project) => (
          <ProjectImage project={project} key={project.id} />
        ))}
      </div>
    </div>
  )
}
