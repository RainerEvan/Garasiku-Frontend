import { useEffect, useState } from "react"

import { Button } from "@/components/shadcn/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@/models/user"
import { Eye, EyeOff, Plus, PlusCircle } from "lucide-react"
import { Input } from "@/components/shadcn/input"
import { Switch } from "@/components/shadcn/switch"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { ROLE_PARAM } from "@/lib/constants"
import { useAuth } from "@/lib/auth-context"

interface AddUserDialogProps {
  onSave?: (newUser: User) => void
}

const formSchema = z.object({
  username: z.string().min(1, { message: "Username harus terisi" }),
  password: z.string().min(1, { message: "Password harus terisi" }),
  fullname: z.string().min(1, { message: "Nama Lengkap harus terisi" }),
  email: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().min(1, { message: "Role harus terisi" }),
  isActive: z.boolean()
})

export function AddUserDialog({ onSave }: AddUserDialogProps) {
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const role = user?.user_metadata?.role
    setIsAdmin(role === "admin")
  }, [user])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      email: "",
      phone: "",
      role: "",
      isActive: true
    },
  })

  const roleParam = ROLE_PARAM;

  const { reset } = form

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData?.session?.access_token || ""

      // Format phone number ke E.164 jika belum
      const formattedPhone =
        values.phone?.startsWith("+") || !values.phone
          ? values.phone
          : "+62" + values.phone.replace(/^0+/, "")

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/user-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            username: values.username,
            role: values.role,
            fullname: values.fullname,
            status: values.isActive ? "active" : "inactive",
            phone: formattedPhone,
          }),
        }
      )

      const result = await res.json()
      if (!res.ok) {
        const errorMessage = result.error || result.message || "Gagal menambahkan user"
        throw new Error(errorMessage)
      }

      toast.success("User berhasil ditambahkan!")

      if (onSave) {
        onSave({
          id: result.user.id,
          email: values.email,
          username: values.username,
          role: values.role,
          fullname: values.fullname,
          phone: values.phone,
          isActive: values.isActive,
        })
      }
      setOpen(false)
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("Terjadi kesalahan pada sistem")
      }
    }
  }

  function handleDialogChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        {isAdmin && (
          <div>
            <Button className="hidden sm:flex">
              <PlusCircle /> Tambah User
            </Button>
            <Button variant="default" size="icon2" className="fixed z-50 bottom-4 right-4 sm:hidden">
              <Plus className="size-8" />
            </Button>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Tambah User</DialogTitle>
          <DialogDescription>Tambah user baru dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan username user"
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
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama lengkap user"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan email user"
                          {...field}
                          className="w-full"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">No Telepon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan no telepon user"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih role user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleParam.map((option) => (
                            <SelectItem key={option.id} value={option.name}>
                              {option.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                            placeholder="Masukkan password user"
                            {...field}
                            className="w-full"
                          />
                          <div onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer">
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

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel className="font-medium">Status Aktif</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit">
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}
