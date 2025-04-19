import { useEffect, useState } from "react"
import { Edit } from "lucide-react"

import { Button } from "@/components/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface Vehicle {
  id: string
  jenis: string
  tahun: string
  merk: string
  warna: string
  tipe: string
  platNo: string
}

interface EditDetailVehicleDialogProps {
  vehicle: Vehicle
  onSave?: (updatedVehicle: Vehicle) => void
}

// Define the form schema with validation
const formSchema = z.object({
  id: z.string().min(1, { message: "Name is required" }),
  nama: z.string().min(1, { message: "Name is required" }),
  jenis: z.string().min(1, { message: "Jenis is required" }),
  tahun: z.string().min(1, { message: "Tahun is required" }),
  merk: z.string().min(1, { message: "Merk is required" }),
  warna: z.string().min(1, { message: "Warna is required" }),
  tipe: z.string().min(1, { message: "Tipe is required" }),
  platNo: z.string().min(1, { message: "Plat No is required" }),
})

export function EditDetailVehicleDialog({ vehicle, onSave }: EditDetailVehicleDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: vehicle.id,
      nama: `${vehicle.merk} ${vehicle.tipe} ${vehicle.warna} ${vehicle.tahun}`,
      jenis: vehicle.jenis,
      tahun: vehicle.tahun,
      merk: vehicle.merk,
      warna: vehicle.warna,
      tipe: vehicle.tipe,
      platNo: vehicle.platNo,
    },
  })

  const { watch, setValue } = form;

  // Watch for changes in merk, tipe, warna, and tahun
  const merk = watch("merk");
  const tipe = watch("tipe");
  const warna = watch("warna");
  const tahun = watch("tahun");

  // Update the nama field dynamically
  useEffect(() => {
    const updatedNama = `${merk} ${tipe} ${warna} ${tahun}`;
    setValue("nama", updatedNama);
  }, [merk, tipe, warna, tahun, setValue]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Edit detail kendaraan data: ", values)
    // Handle login logic here
    if (onSave) {
      onSave(values);
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit />
          Ubah
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] md:max-w-3xl overflow-y-auto" autoFocus={false}>
        <DialogHeader>
          <DialogTitle>Ubah Detail Kendaraan</DialogTitle>
          <DialogDescription>Ubah informasi detail kendaraan dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Kendaraan */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Nama Kendaraan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama"
                          {...field}
                          className="w-full"
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="jenis"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Jenis</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jenis"
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
                  name="merk"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Merk</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Merk"
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
                  name="tipe"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Tipe</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tipe"
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
                  name="tahun"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Tahun</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tahun"
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
                  name="warna"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Warna</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Warna"
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
                  name="platNo"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Plat No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Plat No"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
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
