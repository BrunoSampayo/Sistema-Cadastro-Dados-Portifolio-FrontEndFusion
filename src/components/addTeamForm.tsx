'use client'
import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { addTeamSchema } from '@/schemas'
import toast from 'react-hot-toast'
import z from 'zod'
import { addTeam } from '@/actions/teams/addTeam'
export default function AddTeamForm() {
  const form = useForm<z.infer<typeof addTeamSchema>>({
    resolver: zodResolver(addTeamSchema),
    defaultValues: {
      name: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof addTeamSchema>) => {
    startTransition(() => {
      addTeam(values).then((data) => {
        if (data.error) {
          return toast.error(data.error)
        }
        if (data.success) {
          toast.success(data.success)
          window.location.reload()
        }
      })
    })
  }
  return (
    <main className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-end space-x-2">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-bold">
                      Adicionar Novo Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Nome do Seu novo time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className=""
              variant="secondary"
              disabled={isPending}
              type="submit"
            >
              Adicionar
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
