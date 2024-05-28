'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, PowerIcon, PowerOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Project } from '@prisma/client'

import { deleteProject } from '@/actions/deleteProject'
import { imgVerification } from '@/helpers/imgVerification'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'projectUrl',
    header: 'Url do Projeto',
  },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const project = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              className=" text-white bg-red-600 focus:bg-red-700 focus:text-white"
              onClick={async () => {
                await deleteProject(project.id)
                window.location.reload()
              }}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    header: 'Estado',
    id: 'estado',
    cell: async ({ row }) => {
      const project = row.original
      const state = imgVerification(project.projectUrl)

      return (
        <div className="ml-2">
          {(await state.then()) ? (
            <PowerIcon className="text-green-600" />
          ) : (
            <PowerOff className="text-red-600" />
          )}
        </div>
      )
    },
  },
]
