import { useEffect, useState } from "react"
import { Edit } from "lucide-react"

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

interface EditDetailVehicleDialogProps {
  vehicle: Vehicle
  onSave?: (updatedVehicle: Vehicle) => void
}

// Define the form schema with validation
const formSchema = z.object({
  id: z.string().min(1, { message: "Id harus terisi" }),
  name: z.string().min(1, { message: "Nama harus terisi" }),
  category: z.string().min(1, { message: "Jenis harus terisi" }),
  brand: z.string().min(1, { message: "Merk harus terisi" }),
  type: z.string().min(1, { message: "Tipe harus terisi" }),
  year: z.string().min(1, { message: "Tahun harus terisi" }),
  color: z.string().min(1, { message: "Warna harus terisi" }),
  licensePlate: z.string().min(1, { message: "Plat No harus terisi" }),
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
      year: vehicle.year,
      color: vehicle.color,
      licensePlate: vehicle.licensePlate,
    },
  })

  const vehicleCategoryParam: Param[] = [
    {
      id: "1",
      group: "001",
      name: "Mobil"
    },
    {
      id: "2",
      group: "001",
      name: "Motor"
    }
  ]

  const vehicleBrandParam: Param[] = [
    {
      id: "1",
      group: "002",
      name: "Honda"
    },
    {
      id: "2",
      group: "002",
      name: "Toyota"
    },
    {
      id: "3",
      group: "002",
      name: "Suzuki"
    },
    {
      id: "4",
      group: "002",
      name: "BMW"
    },
    {
      id: "5",
      group: "002",
      name: "Mercedes-Benz"
    },
  ]

  const { watch, setValue } = form;

  const brand = watch("brand");
  const type = watch("type");
  const color = watch("color");
  const year = watch("year");

  // Update the nama field dynamically
  useEffect(() => {
    const updatedName = `${brand} ${type} ${color} ${year}`;
    setValue("name", updatedName);
  }, [brand, type, color, year, setValue]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Edit detail kendaraan data: ", values)
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
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Ubah Detail Kendaraan</DialogTitle>
          <DialogDescription>Atur informasi detail kendaraan dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Kendaraan */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Nama Kendaraan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Hasil nama kendaraan"
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
                <div className="grid grid-cols-1 gap-5">
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
                          <Input
                            placeholder="Masukkan tipe kendaraan"
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
                    name="year"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Tahun</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan tahun kendaraan"
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
                    name="color"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Warna</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan warna kendaraan"
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
                    name="licensePlate"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Plat No</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan plat no kendaraan"
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
