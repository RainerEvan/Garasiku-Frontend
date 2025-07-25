import { useEffect, useState } from "react"
import { CalendarIcon, Plus, PlusCircle } from "lucide-react"

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
import { Param } from "@/models/param"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { Calendar } from "@/components/shadcn/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface AddVehicleDialogProps {
  onSave?: (newVehicle: string) => void
}

// Define the form schema with validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Nama harus terisi" }),
  category: z.string().min(1, { message: "Jenis harus terisi" }),
  brand: z.string().min(1, { message: "Merk harus terisi" }),
  model: z.string().min(1, { message: "Model harus terisi" }),
  year: z.string().min(1, { message: "Tahun harus terisi" }),
  color: z.string().min(1, { message: "Warna harus terisi" }),
  licensePlate: z.string().min(1, { message: "Plat No harus terisi" }),
  stnkDueDate: z.date(),
  insuranceDueDate: z.date(),
})

export function AddVehicleDialog({ onSave }: AddVehicleDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      brand: "",
      model: "",
      year: "",
      color: "",
      licensePlate: "",
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

  const { watch, setValue, reset } = form;

  // Watch for changes in brand, model, color, and year
  const brand = watch("brand");
  const model = watch("model");
  const color = watch("color");
  const year = watch("year");

  // Update the name field dynamically
  useEffect(() => {
    if (brand || model || color || year) {
      const updatedName = `${brand} ${model} ${color} ${year}`;
      setValue("name", updatedName);
    }
  }, [brand, model, color, year, setValue]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Edit detail kendaraan data: ", values)
    if (onSave) {
      onSave(values.name);
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
        <div>
          <Button className="hidden sm:flex">
            <PlusCircle /> Tambah Kendaraan
          </Button>
          <Button variant="default" size="icon2" className="fixed z-50 bottom-4 right-4 sm:hidden">
            <Plus className="size-8" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Tambah Kendaraan</DialogTitle>
          <DialogDescription>Tambah kendaraan baru dan klik button simpan.</DialogDescription>
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
                    name="model"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="stnkDueDate"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Jatuh Tempo STNK</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd MMM yyyy")
                              ) : (
                                <span>Pilih jatuh tempo STNK</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) =>
                              date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="insuranceDueDate"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Jatuh Tempo Asuransi</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd MMM yyyy")
                              ) : (
                                <span>Pilih jatuh tempo Asuransi</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) =>
                              date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
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
