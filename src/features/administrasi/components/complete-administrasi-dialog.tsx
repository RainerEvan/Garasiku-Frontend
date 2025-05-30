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
import { Input } from "@/components/shadcn/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/shadcn/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/shadcn/calendar"
import { cn } from "@/lib/utils"
import { addYears, format } from "date-fns"
import { Switch } from "@/components/shadcn/switch"
import { Separator } from "@/components/shadcn/separator"
import { AdministrationRecord } from "@/models/administration-record"

interface CompleteAdministrationDialogProps {
  administrationRecord: AdministrationRecord
  dueDate: string
  onSave?: (updatedAdministrationRecord: AdministrationRecord) => void
}

// Define the form schema with validation
const formSchema = z.object({
  id: z.string().min(1, { message: "Id harus terisi" }),
  administrationId: z.string().min(1, { message: "Administration Id harus terisi" }),
  endDate: z.date({ required_error: "Tanggal Selesai harus terisi" }),
  totalCost: z.number().min(0, { message: "Biaya harus terisi" }),
  notes: z.string().optional(),
  isSetNextReminder: z.boolean(),
  nextDueDate: z.date(),
}).refine(
  (data) => {
    if (data.isSetNextReminder) {
      return data.nextDueDate instanceof Date;
    }
    return true;
  },
  {
    path: ["nextDueDate"],
    message: "Jatuh Tempo Baru harus terisi",
  }
)

export function CompleteAdministrationDialog({ administrationRecord, dueDate, onSave }: CompleteAdministrationDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: administrationRecord.id,
      administrationId: administrationRecord.administrationId,
      totalCost: administrationRecord.totalCost,
      notes: administrationRecord.notes,
      isSetNextReminder: true,
      nextDueDate: addYears(dueDate,1)
    },
  })

  const { watch, reset } = form;

  const isSetNextReminder = watch("isSetNextReminder");

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      startDate: values.endDate ? format(values.endDate, "yyyy-MM-dd") : undefined,
      nextDueDate: values.nextDueDate ? format(values.nextDueDate, "yyyy-MM-dd") : undefined,
    };

    console.log("Add administration record data: ", formattedValues)
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
        <Button variant="default">Selesaikan Administrasi</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Selesaikan Administrasi</DialogTitle>
          <DialogDescription>Tambah informasi rincian administrasi dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Administrasi */}
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
                                <span>Pilih tanggal selesai administrasi</span>
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
                  name="totalCost"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Biaya</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan biaya administrasi"
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
                          placeholder="Masukkan catatan administrasi"
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
                      <FormLabel className="font-medium">Buat Reminder Administrasi Berikutnya</FormLabel>
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
                    name="nextDueDate"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="font-medium">Jatuh Tempo Berikutnya</FormLabel>
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
                                  <span>Pilih tanggal administrasi berikutnya</span>
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
