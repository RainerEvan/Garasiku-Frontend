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
import { Service } from "@/models/service"
import { Textarea } from "@/components/shadcn/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/shadcn/calendar"
import { cn } from "@/lib/utils"
import { addMonths, format } from "date-fns"
import { Switch } from "@/components/shadcn/switch"
import { Separator } from "@/components/shadcn/separator"

interface CompleteServiceDialogProps {
  service: Service
  onSave?: (updatedService: Service) => void
}

// Define the form schema with validation
const formSchema = z.object({
  id: z.string().min(1, { message: "Id harus terisi" }),
  endDate: z.date({ required_error: "Tanggal Selesai harus terisi" }),
  mileage: z.number().min(0, { message: "Kilometer harus terisi" }),
  totalCost: z.number().min(0, { message: "Biaya harus terisi" }),
  mechanicName: z.string().optional(),
  task: z.string().min(1, { message: "Jasa harus terisi" }),
  sparepart: z.string().optional(),
  notes: z.string().optional(),
  isSetNextReminder: z.boolean(),
  nextScheduleDate: z.date(),
}).refine(
  (data) => {
    if (data.isSetNextReminder) {
      return data.nextScheduleDate instanceof Date;
    }
    return true;
  },
  {
    path: ["nextScheduleDate"],
    message: "Jadwal Berikutnya harus terisi",
  }
)

export function CompleteServiceDialog({ service, onSave }: CompleteServiceDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: service.id,
      mileage: service.mileage,
      totalCost: service.totalCost,
      mechanicName: service.mechanicName,
      task: service.task,
      sparepart: service.sparepart,
      notes: service.notes,
      isSetNextReminder: true,
    },
  })

  const { watch, setValue, reset } = form;

  const endDate = watch("endDate");

  const isSetNextReminder = watch("isSetNextReminder");

  useEffect(() => {
    if (isSetNextReminder && endDate) {
      const nextScheduleDate = addMonths(endDate, 6);
      setValue("nextScheduleDate", nextScheduleDate);
    }
  }, [endDate, setValue]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      endDate: values.endDate ? format(values.endDate, "yyyy-MM-dd") : undefined,
      nextScheduleDate: values.nextScheduleDate ? format(values.nextScheduleDate, "yyyy-MM-dd") : undefined,
    };

    console.log("Add service record data: ", formattedValues)
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
        <Button variant="default">Selesaikan Servis</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Selesaikan Servis</DialogTitle>
          <DialogDescription>Tambah informasi rincian servis dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Servis */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Tanggal Selesai</FormLabel>
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
                                <span>Pilih tanggal selesai servis</span>
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

                <Separator />

                <FormField
                  control={form.control}
                  name="isSetNextReminder"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel className="font-medium">Buat Reminder Servis Berikutnya</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {isSetNextReminder && (
                  <FormField
                    control={form.control}
                    name="nextScheduleDate"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Jadwal Servis Berikutnya</FormLabel>
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
                                  <span>Pilih tanggal servis berikutnya</span>
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
                )}
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
