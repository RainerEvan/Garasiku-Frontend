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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Param } from "@/models/param"

interface EditEquipmentVehicleDialogProps {
  equipmentParam: Param[]
  vehicleEquipments: string[]
  onSave?: (updatedEquipment: string[]) => void
}

const formSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Minimal checklist salah satu kelengkapan.",
  }),
})

export function EditEquipmentVehicleDialog({ equipmentParam, vehicleEquipments, onSave }: EditEquipmentVehicleDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: vehicleEquipments
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Edit equipment vehicle data: ", values)
    if (onSave) {
      onSave(values.items);
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
          <DialogTitle>Ubah Kelengkapan Kendaraan</DialogTitle>
          <DialogDescription>Atur informasi kelengkapan kendaraan dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Kelengkapan Kendaraan */}
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem className={`grid gap-5 p-2 ${equipmentParam.length > 5 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                  {equipmentParam.map((item) => (
                    <div key={item.id} className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, item.name]);
                            } else {
                              field.onChange(field.value.filter((val) => val !== item.name));
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">{item.description}</FormLabel>
                    </div>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />


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
