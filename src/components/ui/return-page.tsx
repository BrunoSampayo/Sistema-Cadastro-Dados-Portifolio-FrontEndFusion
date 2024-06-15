'use client'

import { ChevronLeft } from 'lucide-react'

import { useRouter } from 'next/navigation'

export const ReturnPage = () => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.back()}
      className="m-4 rounded-full border size-10 flex justify-center items-center hover:bg-black hover:text-white cursor-pointer"
    >
      <ChevronLeft />
    </div>
  )
}
