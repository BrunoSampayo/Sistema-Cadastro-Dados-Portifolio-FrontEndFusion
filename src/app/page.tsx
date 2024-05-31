'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { searchSchema } from '@/schemas'
import { SearchTeam } from '@/actions/search'
import toast from 'react-hot-toast'

export default function Home() {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      name: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    startTransition(() => {
      SearchTeam(values).then((data) => {
        if (data) {
          if (data.error) {
            return toast.error(data.error)
          }
        }
      })
    })
  }
  return (
    <main className="text-white">
      <header className="text-center font-bold text-2xl p-2">
        Form Registro de Equipes
      </header>

      <Card className="max-w-[600px] m-auto mt-20 p-6">
        <CardHeader>
          <CardTitle className="text-center mb-10">
            Front-End Fusion Sistem de Equipes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-bold">Pesquisar Minha Equipe:</h4>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-bold">
                        Nome do seu Team
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Phoenix Coders v-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isPending} type="submit">
                  Ir para pagina do time
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between">
            <Button asChild variant="link">
              <Link href="/team">Preciso Registrar minha Equipe</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
