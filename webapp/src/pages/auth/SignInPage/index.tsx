import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { zSignInTrpcInput } from '@blog/backend/src/router/auth/signIn/input'
import { CircleAlert, LoaderCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const SignInPage = () => {
  const form = useForm<z.infer<typeof zSignInTrpcInput>>({
    resolver: zodResolver(zSignInTrpcInput),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate();
  async function onSubmit(values: z.infer<typeof zSignInTrpcInput>) {
    //const signIn = trpc.signIn.useMutation()
    try {
      //await signIn.mutateAsync(values)
      await authClient.signIn.email({ email: values.email, password: values.password })
      navigate('/')
    } catch (error: unknown) {
      toast('Error while sign in: ' + error, {
        style: {
          color: 'red',
        },
        icon: <CircleAlert />,
      })
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className={'text-center text-lg font-bold'}>
            <h1>Sign in for Acme Inc.</h1>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="hello@example.com" {...field} type="email" required />
                </FormControl>
                {/* <FormDescription></FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" required />
                </FormControl>
                {/* <FormDescription></FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />}
            {form.formState.isSubmitting ? 'Signin...' : 'Signin'}
          </Button>

          <div className={'text-center'}>
            Don&apos;t have an account?&nbsp;
            <Link to="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
