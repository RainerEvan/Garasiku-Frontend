import { useEffect, useState } from "react"
import { Edit } from "lucide-react"
import { toast } from "sonner";

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
import { Input } from "@/components/shadcn/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Vehicle } from "@/models/vehicle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { Param } from "@/models/param"
import { VEHICLE_CATEGORY_PARAM, PARAM_GROUP_MERK_KENDARAAN } from "@/lib/constants"
import { supabase } from "@/lib/supabaseClient"

interface EditDetailVehicleDialogProps {
  vehicle: Vehicle
  onSave?: (updatedVehicle: Vehicle) => void
}

const formSchema = z.object({
  id: z.string().min(1, { message: "Id harus terisi" }),
  name: z.string().min(1, { message: "Nama harus terisi" }),
  category: z.string().min(1, { message: "Jenis harus terisi" }),
  brand: z.string().min(1, { message: "Merk harus terisi" }),
  type: z.string().min(1, { message: "Tipe harus terisi" }),
  year: z.coerce.number().min(1900, { message: "Tahun tidak valid" }),
  color: z.string().min(1, { message: "Warna harus terisi" }),
})

export function EditDetailVehicleDialog({ vehicle, onSave }: EditDetailVehicleDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: vehicle.id,
      name: vehicle.name,
      category: vehicle.category,
      brand: vehicle.brand,
      type: vehicle.type,
      year: vehicle.year ? Number(vehicle.year) : new Date().getFullYear(),
      color: vehicle.color,
    },
  })

  const vehicleCategoryParam = VEHICLE_CATEGORY_PARAM
  const [vehicleBrandParam, setVehicleBrandParam] = useState<Param[]>([])

  useEffect(() => {
    async function fetchVehicleBrands() {
      const { data, error } = await supabase
        .from("parameter")
        .select("*")
        .eq("group", PARAM_GROUP_MERK_KENDARAAN)
        .order("name")

      if (error) {
        console.error("Gagal mengambil data merk kendaraan:", error.message)
        return
      }

      setVehicleBrandParam(data)
    }

    fetchVehicleBrands()
  }, [])

  const { watch, setValue } = form

  const brand = watch("brand")
  const type = watch("type")
  const color = watch("color")
  const year = watch("year")

  useEffect(() => {
    const updatedName = `${brand} ${type} ${color} ${year}`
    setValue("name", updatedName)
  }, [brand, type, color, year, setValue])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submit form values:", values)
    if (!values.id) {
      console.error("ID kendaraan kosong.")
      toast.error("ID kendaraan tidak valid.")
      return
    }

          const { data, error } = await supabase
        .from("vehicles")
        .update({
          name: values.name,
          category: values.category,
          brand: values.brand,
          type: values.type,
          year: values.year,
          color: values.color,
        })
        .eq("id", values.id)
        .select("*"); 
        console.log("Update ke Supabase:", {
        id: values.id,
        name: values.name,
        category: values.category,
        brand: values.brand,
        type: values.type,
        year: values.year,
        color: values.color,
      })

    console.log("Update response:", { data, error })

    if (error) {
      console.error("Gagal update kendaraan:", error.message)
      toast.error("Gagal update kendaraan: " + error.message)
      return
    }

    toast.success("Data kendaraan berhasil diperbarui.")

    if (onSave) {
      onSave({ ...vehicle, ...values })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit />
          Ubah
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Ubah Detail Kendaraan</DialogTitle>
          <DialogDescription>Atur informasi detail kendaraan dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Nama Kendaraan</FormLabel>
                      <FormControl>
                        <Input placeholder="Hasil nama kendaraan" {...field} className="w-full" disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Jenis</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih jenis kendaraan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vehicleCategoryParam.map((option) => (
                            <SelectItem key={option.id} value={option.name}>
                              {option.name}
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
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Merk</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih merk kendaraan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vehicleBrandParam.map((option) => (
                            <SelectItem key={option.id} value={option.name}>
                              {option.name}
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
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Tipe</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan tipe kendaraan" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Tahun</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan tahun kendaraan" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Warna</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan warna kendaraan" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
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
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
