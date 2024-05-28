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
import { addProjectSchema } from '@/schemas'
import toast from 'react-hot-toast'
import z from 'zod'
import { addProject } from '@/actions/addProject'
export default function AddProjectForm(props: {
  memberId: string | undefined
}) {
  const form = useForm<z.infer<typeof addProjectSchema>>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      projectUrl: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof addProjectSchema>) => {
    startTransition(() => {
      addProject(values, props.memberId).then((data) => {
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
    <main className="text-black ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-end space-x-2">
            <div>
              <FormField
                control={form.control}
                name="projectUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-bold">
                      Adicionar Projeto
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Url imagem do seu projeto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className=" "
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
