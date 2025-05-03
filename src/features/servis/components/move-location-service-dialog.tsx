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
import { Input } from "@/components/shadcn/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { LocationService } from "@/models/location-service"
import { Param } from "@/models/param"

interface MoveLocationServiceDialogProps {
  serviceId?: string
  onSave?: (newLocationService: LocationService) => void
}

// Define the form schema with validation
const formSchema = z.object({
  serviceId: z.string().min(1, { message: "Vehicle Id harus terisi" }),
  name: z.string().min(1, { message: "Nama Lokasi harus terisi" }),
  address: z.string().min(1, { message: "Alamat Lokasi harus terisi" })
})

export function MoveLocationServiceDialog({ serviceId, onSave }: MoveLocationServiceDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: serviceId,
      name: "",
      address: ""
    },
  })

  const locationServiceParam: Param[] = [
    {
      id: "1",
      group: "005",
      key: "alamat-1",
      name: "Bengkel Honda",
      description: "Jl. Sukajadi No. 57, Bandung"
    },
    {
      id: "2",
      group: "005",
      key: "alamat-2",
      name: "Bengkel ASCO",
      description: "Jl. Kolonel Sugiono No. 20, Jakarta"
    },
    {
      id: "3",
      group: "005",
      key: "alamat-3",
      name: "Lain-lain",
      description: ""
    }
  ]

  const { watch, setValue, reset } = form;

  const name = watch("name");

  const isLocationAddressDisabled = name !== "Lain-lain";

  // Update the nama field dynamically
  useEffect(() => {
    const location = locationServiceParam.find((location => location.name == name));
    if (isLocationAddressDisabled) {
      setValue("address", location?.description || "");
    } else {
      setValue("address", "");
    }
  }, [name, setValue]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Move location service data: ", values)
    if (onSave) {
      onSave(values);
    }
    setOpen(false);
    reset();
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
        <Button>
          Pindah Lokasi
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Pindah Lokasi Servis</DialogTitle>
          <DialogDescription>Pilih lokasi baru servis dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Servis */}
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="font-medium">Nama Lokasi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih nama lokasi servis" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationServiceParam.map((option) => (
                          <SelectItem key={option.key} value={option.name}>
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
                name="address"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="font-medium">Alamat Lokasi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan alamat lokasi servis"
                        {...field}
                        className="w-full"
                        disabled={isLocationAddressDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
