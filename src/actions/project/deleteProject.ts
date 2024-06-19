'use server'
import prismadb from '@/lib/prisma'
import cloudinary from 'cloudinary'
type resultType = {
  result: string
}

export const deleteProject = async (projectId: string, publicId: string) => {
  const imageDeleted: resultType =
    await cloudinary.v2.uploader.destroy(publicId)
  if (imageDeleted.result !== 'ok') {
    console.error('Erro ao deletar imagem cloudinary')
  }
  await prismadb.project.delete({ where: { id: projectId } })
}
