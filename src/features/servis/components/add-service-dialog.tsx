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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { Param } from "@/models/param"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { CalendarIcon, Check, ChevronsUpDown, Plus, PlusCircle } from "lucide-react"
import { Calendar } from "@/components/shadcn/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Service } from "@/models/service"
import { Vehicle } from "@/models/vehicle"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/shadcn/command"

interface AddServiceDialogProps {
  onSave?: (newService: Service) => void
}

// Define the form schema with validation
const formSchema = z.object({
  vehicleId: z.string().min(1, { message: "Id Kendaraan harus terisi" }),
  type: z.string().min(1, { message: "Tipe Servis harus terisi" }),
  scheduleDate: z.date({ required_error: "Jadwal Servis harus terisi" }),
})

export function AddServiceDialog({ onSave }: AddServiceDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleId: "",
      type: ""
    },
  })

  const listVehicle: Vehicle[] = [
    {
      id: "1",
      name: "D 1234 ABC - Honda Civic Turbo Hitam 2022"
    },
    {
      id: "2",
      name: "D 7890 DFE - Toyota Innova Putih 2023"
    },
    {
      id: "3",
      name: "D 0000 CDE - BMW M4 Putih 2020"
    },
  ]

  const typeServiceParam: Param[] = [
    {
      id: "1",
      group: "006",
      name: "servis-regular",
      description: "Servis Regular",
    },
    {
      id: "2",
      group: "006",
      name: "servis-berat",
      description: "Servis Berat",
    },
    {
      id: "3",
      group: "006",
      name: "servis-lainnya",
      description: "Servis Lainnya",
    },
  ]

  const { reset } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      scheduleDate: values.scheduleDate ? format(values.scheduleDate, "yyyy-MM-dd") : undefined,
    };

    console.log("Add service data: ", formattedValues)
    if (onSave) {
      onSave(formattedValues);
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
            <PlusCircle /> Tambah Servis
          </Button>
          <Button variant="default" size="icon2" className="fixed z-50 bottom-4 right-4 sm:hidden">
            <Plus className="size-8" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Tambah Servis</DialogTitle>
          <DialogDescription>Tambah servis baru dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Servis */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="scheduleDate"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Jadwal Servis</FormLabel>
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
                                <span>Pilih tanggal jadwal servis</span>
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
                  name="vehicleId"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Kendaraan</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between font-normal h-fit",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <span className="whitespace-normal break-words text-left">
                                {field.value
                                  ? listVehicle.find((vehicle) => vehicle.id === field.value)?.name
                                  : "Pilih kendaraan"}
                              </span>
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0"
                          style={{
                            minWidth: 'var(--radix-popover-trigger-width)',
                            maxWidth: 'var(--radix-popover-trigger-width)',
                          }}>
                          <Command>
                            <CommandInput
                              placeholder="Cari kendaraan..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>Kendaraan tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {listVehicle.map((vehicle) => (
                                  <CommandItem
                                    value={vehicle.name}
                                    key={vehicle.id}
                                    onSelect={() => {
                                      form.setValue("vehicleId", vehicle.id || "");
                                    }}
                                  >
                                    <span className="whitespace-normal break-words text-left">
                                      {vehicle.name}
                                    </span>
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        vehicle.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Tipe Servis</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih tipe servis" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typeServiceParam.map((option) => (
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
