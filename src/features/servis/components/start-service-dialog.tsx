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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Service } from "@/models/service"
import { Textarea } from "@/components/shadcn/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/shadcn/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"

interface StartServiceDialogProps {
  service: Service
  onSave?: (updatedService: Service) => void
}

const formSchema = z.object({
  id: z.string().min(1, { message: "Id harus terisi" }),
  startDate: z.date({ required_error: "Tanggal Mulai harus terisi" }),
  mileage: z.coerce.number().min(0, { message: "Kilometer harus terisi" }),
  totalCost: z.coerce.number().optional(),
  mechanicName: z.string().optional(),
  task: z.string().min(1, { message: "Jasa harus terisi" }),
  sparepart: z.string().optional(),
  notes: z.string().optional(),
})

export function StartServiceDialog({ service, onSave }: StartServiceDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: service.id,
      startDate: service.startDate ? new Date(service.startDate) : undefined,
      mileage: service.mileage,
      totalCost: service.totalCost,
      mechanicName: service.mechanicName,
      task: service.task,
      sparepart: service.sparepart,
      notes: service.notes,
    },
  })

  const { reset } = form

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      startDate: format(values.startDate, "yyyy-MM-dd"),
    }

    const { data, error } = await supabase
      .from("service") // pastikan ini nama tabel kamu benar
      .update({
        start_date: formattedValues.startDate,
        mileage: formattedValues.mileage,
        total_cost: formattedValues.totalCost,
        mechanic_name: formattedValues.mechanicName,
        task: formattedValues.task,
        sparepart: formattedValues.sparepart,
        notes: formattedValues.notes,
        status: 'ongoing'
      })
      .eq("id", formattedValues.id)
      .select("*")
      .single()

    if (error) {
      console.error("Gagal update service:", error)
      toast.error("Gagal menyimpan data servis.")
    } else {
      toast.success("Servis berhasil dimulai.")
      if (onSave) onSave(data)
      setOpen(false)
    }
  }

  function handleDialogChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="default">Mulai Servis</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Mulai Servis</DialogTitle>
          <DialogDescription>Tambah informasi rincian servis dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Servis */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-medium">Tanggal Mulai</FormLabel>
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
                                <span>Pilih tanggal mulai servis</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            captionLayout="dropdown"
                            onSelect={field.onChange}
                            startMonth={new Date(new Date().getFullYear() - 1, new Date().getMonth(), 1)}
                            endMonth={new Date(new Date().getFullYear() + 5, new Date().getMonth(), 1)}
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
