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
import { addMemberSchema } from '@/schemas'
import toast from 'react-hot-toast'
import z from 'zod'
import { AddMember } from '@/actions/user/addMember'
export default function AddMemberForm(props: { teamId: string | undefined }) {
  const form = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      name: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof addMemberSchema>) => {
    startTransition(() => {
      AddMember(values, props.teamId).then((data) => {
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
    <main className="text-black">
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
                      Adicionar Membro
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Fulano de tal"
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
