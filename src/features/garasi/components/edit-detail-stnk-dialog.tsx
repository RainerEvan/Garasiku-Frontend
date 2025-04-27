import { useState } from "react"
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
import { Stnk } from "@/models/stnk"

interface EditDetailStnkDialogProps {
  stnk: Stnk
  onSave?: (updatedStnk: Stnk) => void
}

// Define the form schema with validation
const formSchema = z.object({
  id: z.string().min(1, { message: "Id harus terisi" }),
  vehicleId: z.string().min(1, { message: "Vehicle Id harus terisi" }),
  licensePlate: z.string().min(1, { message: "No Polisi harus terisi" }),
  brand: z.string().min(1, { message: "Merk harus terisi" }),
  model: z.string().min(1, { message: "Tipe harus terisi" }),
  type: z.string().min(1, { message: "Jenis harus terisi" }),
  bodyModel: z.string().min(1, { message: "Model harus terisi" }),
  manufactureYear: z.string().min(1, { message: "Tahun Pembuatan harus terisi" }),
  engineCapacity: z.string().min(1, { message: "Isi Silinder harus terisi" }),
  chassisNumber: z.string().min(1, { message: "No Rangka harus terisi" }),
  engineNumber: z.string().min(1, { message: "No Mesin harus terisi" }),
  stnkNumber: z.string().min(1, { message: "No STNK harus terisi" }),
  color: z.string().min(1, { message: "Warna harus terisi" }),
  fuelType: z.string().min(1, { message: "Bahan Bakar harus terisi" }),
  tnkbColor: z.string().min(1, { message: "Warna TNKB harus terisi" }),
  registrationYear: z.string().min(1, { message: "Tahun Registrasi harus terisi" }),
  bpkbNumber: z.string().min(1, { message: "No BPKB harus terisi" }),
  registrationOrderNumber: z.string().min(1, { message: "No Urut Pendaftaran harus terisi" }),
  locationCode: z.string().min(1, { message: "Kode Lokasi harus terisi" }),
  validUntil: z.string().min(1, { message: "Berlaku Sampai harus terisi" }),
})

export function EditDetailStnkDialog({ stnk, onSave }: EditDetailStnkDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: stnk.id,
      vehicleId: stnk.vehicleId,
      licensePlate: stnk.licensePlate,
      brand: stnk.brand,
      model: stnk.model,
      type: stnk.type,
      bodyModel: stnk.bodyModel,
      manufactureYear: stnk.manufactureYear,
      engineCapacity: stnk.engineCapacity,
      chassisNumber: stnk.chassisNumber,
      engineNumber: stnk.engineNumber,
      stnkNumber: stnk.stnkNumber,
      color: stnk.color,
      fuelType: stnk.fuelType,
      tnkbColor: stnk.tnkbColor,
      registrationYear: stnk.registrationYear,
      bpkbNumber: stnk.bpkbNumber,
      registrationOrderNumber: stnk.registrationOrderNumber,
      locationCode: stnk.chassisNumber,
      validUntil: stnk.validUntil,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Edit detail stnk data: ", values)
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
          <DialogTitle>Ubah Detail STNK</DialogTitle>
          <DialogDescription>Atur informasi detail STNK kendaraan dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Kendaraan */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="grid grid-cols-1 gap-5">
                  <FormField
                    control={form.control}
                    name="licensePlate"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">No Polisi</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan no polisi kendaraan"
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
                    name="brand"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Merk</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan merk kendaraan"
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
                    name="model"
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

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Jenis</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan jenis kendaraan"
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
                    name="bodyModel"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Model</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan model kendaraan"
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
                    name="manufactureYear"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Tahun Pembuatan</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan tahun pembuatan kendaraan"
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
                    name="engineCapacity"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Isi Silinder</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan isi silinder kendaraan"
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
                    name="chassisNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">No Rangka</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan no rangka kendaraan"
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
                    name="engineNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">No Mesin</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan no mesin kendaraan"
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
                    name="stnkNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">No STNK</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan no STNK kendaraan"
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
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Bahan Bakar</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan bahan bakar kendaraan"
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
                    name="tnkbColor"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Warna TNKB</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan warna TNKB kendaraan"
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
                    name="registrationYear"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Tahun Registrasi</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan tahun registrasi kendaraan"
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
                    name="bpkbNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">No BPKB</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan no BPKB kendaraan"
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
                    name="registrationOrderNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">No Urut Pendaftaran</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan no urut pendaftaran kendaraan"
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
                    name="locationCode"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Kode Lokasi</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan kode lokasi kendaraan"
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
                    name="validUntil"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Berlaku Sampai</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan berlaku sampai kendaraan"
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
