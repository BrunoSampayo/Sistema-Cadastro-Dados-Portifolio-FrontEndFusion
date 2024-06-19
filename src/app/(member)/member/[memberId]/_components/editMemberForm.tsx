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
import { editMemberSchema } from '@/schemas'
import toast from 'react-hot-toast'
import z from 'zod'
import { Person } from '@prisma/client'
import { editMember } from '@/actions/user/editMember'
export default function EditMember(props: { person: Person }) {
  const form = useForm<z.infer<typeof editMemberSchema>>({
    resolver: zodResolver(editMemberSchema),
    defaultValues: {
      name: undefined || props.person.name,
      githubName: undefined || props.person.githubName,
      githubUrl: undefined || props.person.githubUrl,
      facebookUrl: undefined || props.person.facebookUrl,
      instagramUrl: undefined || props.person.instagramUrl,
      linkedinUrl: undefined || props.person.linkedinUrl,
      subTitle: undefined || props.person.subTitle,
      text: undefined || props.person.text,
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof editMemberSchema>) => {
    startTransition(() => {
      editMember(values, props.person.id).then((data) => {
        if (data.error) {
          toast.error(data.error)
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
          <div className="space-y-4 max-w-[520px] mx-auto p-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bold">Nome:</FormLabel>
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
            <FormField
              control={form.control}
              name="githubName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bold">GitHub Name:</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="GithubName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bold">GitHub Url:</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="https://github.com/Fulano_de_tal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bold">Facebook Url:</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="https://www.facebook.com/Fulano_de_tal/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bold">Instagram Url:</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="https://www.instagram.com/Fulano_de_tal/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bold">Linkedin Url:</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="https://www.linkedin.com/in/Fulano_de_tal/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bold">Subtitulo perfil:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="text-black"
                      placeholder="Fulano de tal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-bold">Texto sobre você:</FormLabel>
                  <FormControl>
                    <textarea className="block border w-96" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className=" " disabled={isPending} type="submit">
              Editar
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
