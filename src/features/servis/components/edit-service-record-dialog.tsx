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
import { ServiceRecord } from "@/models/service-record"
import { Textarea } from "@/components/shadcn/textarea"

interface EditServiceRecordDialogProps {
  serviceRecord: ServiceRecord
  onSave?: (updatedServiceRecord: ServiceRecord) => void
}

// Define the form schema with validation
const formSchema = z.object({
  id: z.string().min(1, { message: "Id harus terisi" }),
  serviceId: z.string().min(1, { message: "Vehicle Id harus terisi" }),
  mileage: z.number().min(0, { message: "Kilometer harus terisi" }),
  totalCost: z.number().optional(),
  mechanicName: z.string().optional(),
  task: z.string().min(1, { message: "Jasa harus terisi" }),
  sparepart: z.string().optional(),
  notes: z.string().optional(),
})

export function EditServiceRecordDialog({ serviceRecord, onSave }: EditServiceRecordDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: serviceRecord.id,
      serviceId: serviceRecord.serviceId,
      mileage: serviceRecord.mileage,
      totalCost: serviceRecord.totalCost,
      mechanicName: serviceRecord.mechanicName,
      task: serviceRecord.task,
      sparepart: serviceRecord.sparepart,
      notes: serviceRecord.notes
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Edit detail service record data: ", values)
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
          <DialogTitle>Ubah Rincian Servis</DialogTitle>
          <DialogDescription>Atur informasi rincian servis dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Servis */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Kilometer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan kilometer kendaraan"
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
                  name="totalCost"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Biaya</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan biaya servis"
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
                  name="mechanicName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Nama Mekanik</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama mekanik servis"
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
                  name="task"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Jasa</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan jasa servis"
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
                  name="sparepart"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Sparepart</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan sparepart servis"
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
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Catatan</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan catatan servis"
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
