import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zSignUpTrpcInput } from '@blog/backend/src/router/auth/signUp/input'
import { CircleAlert, LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'


export const SignUpPage = () => {
  const form = useForm<z.infer<typeof zSignUpTrpcInput>>({
    resolver: zodResolver(zSignUpTrpcInput),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  })
  //const signUp = trpc.signUp.useMutation()
  async function onSubmit(values: z.infer<typeof zSignUpTrpcInput>) {
    try {
      const signUpResult = await authClient.signUp.email({email: values.email, name: values.email, password: values.password})
      if (signUpResult.error) {
        throw new Error(signUpResult.error.message)
      }
      form.reset()
      toast('Sign up successfull')
    } catch (error: unknown) {
      toast('Error while sign up: ' + error, {
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
            <h1>Sign up for Acme Inc.</h1>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} required />
                </FormControl>
                {/* <FormDescription></FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" {...field} type="password" required />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />}
            {form.formState.isSubmitting ? 'Signup...' : 'Signup'}
          </Button>

          <div className={'text-center'}>
            Already have an account?&nbsp;
            <Link to="/signin" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
