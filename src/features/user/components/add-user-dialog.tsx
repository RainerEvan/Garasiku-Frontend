import { useState } from "react"

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

interface AddUserDialogProps {
  onSave?: (newUser: User) => void
}

// Define the form schema with validation
const formSchema = z.object({
  username: z.string().min(1, { message: "Username harus terisi" }),
  password: z.string().min(1, { message: "Password harus terisi" }),
  fullname: z.string().min(1, { message: "Nama Lengkap harus terisi" }),
  email: z.string().optional(),
  phoneNo: z.string().optional(),
  role: z.string().min(1, { message: "Role harus terisi" }),
  isActive: z.boolean()
})

export function AddUserDialog({ onSave }: AddUserDialogProps) {
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      email: "",
      phoneNo: "",
      role: "",
      isActive: true
    },
  })

  const { reset } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Add user data: ", values)
    if (onSave) {
      onSave(values);
    }
    setOpen(false);
  }

  function handleDialogChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <div>
          <Button className="hidden sm:flex">
            <PlusCircle /> Tambah User
          </Button>
          <Button variant="default" size="icon2" className="fixed z-50 bottom-4 right-4 sm:hidden">
            <Plus className="size-8" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Tambah User</DialogTitle>
          <DialogDescription>Tambah user baru dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail User */}
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
                  name="phoneNo"
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
                      <FormControl>
                        <Input
                          placeholder="Masukkan role user"
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
