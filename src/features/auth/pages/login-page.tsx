import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"

// Form schema
const formSchema = z.object({
  username: z.string().min(1, { message: "Username harus terisi" }),
  password: z.string().min(1, { message: "Password harus terisi" }),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values

    // 🔍 Ambil email & status dari RPC (fungsi Supabase)
    const { data: result, error: rpcError } = await supabase
      .rpc("lookup_user_by_username", { uname: username })

    const userRow = result?.[0]

    if (rpcError || !userRow?.email) {
      form.setError("username", {
        message: "Username tidak ditemukan atau tidak memiliki email",
      })
      return
    }

    // 🔐 Login pakai email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userRow.email,
      password,
    })

    if (error) {
      form.setError("password", { message: "Login gagal: " + error.message })
      return
    }

    // ❌ Nonaktif
    if (userRow.status !== "active") {
      form.setError("username", {
        message: "Akun nonaktif, hubungi admin.",
      })
      await supabase.auth.signOut()
      return
    }

    // ✅ Sukses
    navigate("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <h1 className="text-5xl font-bold mb-6">Garasiku</h1>

      <div className="bg-background w-full max-w-md p-6 md:p-8 rounded-lg border shadow-xs">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="font-medium">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="font-medium">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="w-full"
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-medium" />
                        ) : (
                          <Eye className="h-5 w-5 text-medium" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
