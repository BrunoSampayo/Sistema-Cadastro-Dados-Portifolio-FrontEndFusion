'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Team } from '@prisma/client'
import { deleteTeam } from '@/actions/teams/deleteTeam'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

import UseCurrentUrl from '@/hooks/getUrl'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: 'name',
    header: 'Time',
    cell: ({ row }) => {
      const thisRow = row.original

      return (
        <Link className="font-medium hover:text-lg" href={`/${thisRow.id}`}>
          {thisRow.name}
        </Link>
      )
    },
  },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const team = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="space-y-2">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link className="font-semibold" href={`/${team.id}`}>
                Pagina do Time
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger className="w-full text-white rounded bg-red-600 focus:bg-red-700 focus:text-white">
                  Excluir
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não pode ser desfeita. Ao realizar todos dados
                      do time e seus respectivos membros serão deletados
                      permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        await deleteTeam(team.id)
                        window.location.reload()
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    header: 'Url Api',
    cell: ({ row }) => {
      const thisRow = row.original
      const currentHref = UseCurrentUrl()
      return (
        <div>
          <Badge
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(`${currentHref}api/${thisRow.name}`)
              toast.success('link copiado')
            }}
          >
            {`${currentHref}api/${thisRow.name}`}
          </Badge>
        </div>
      )
    },
  },
]
