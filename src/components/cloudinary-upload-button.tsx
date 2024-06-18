/* eslint-disable camelcase */
'use client'
import { addProject } from '@/actions/addProject'
import { CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import toast from 'react-hot-toast'
type CldUploadButtonProps = {
  memberId: string
}
export const CldUploadButtonComponent = ({
  memberId,
}: CldUploadButtonProps) => {
  const uploadProject = async (data: CloudinaryUploadWidgetInfo) => {
    const { url, public_id } = data
    const newProject = { url, public_id }
    const { error, success } = await addProject(newProject, memberId)
    if (error) {
      toast.error(error)
    }
    if (success) {
      toast.success(success)
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  }

  return (
    <CldUploadButton
      className="bg-black px-6 py-2 rounded-lg text-white hover:opacity-90"
      onSuccess={async (response) => {
        await uploadProject(response.info as CloudinaryUploadWidgetInfo)
      }}
      uploadPreset="upload_preset_teams"
    />
  )
}
