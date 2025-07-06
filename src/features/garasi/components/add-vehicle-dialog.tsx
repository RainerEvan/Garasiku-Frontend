import { useEffect, useState } from "react"
import { CalendarIcon, Plus, PlusCircle } from "lucide-react"

import { Button } from "@/components/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { supabase } from "@/lib/supabaseClient";

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  brand: z.string().optional(),
  type: z.string().optional(),
  year: z.coerce.number().int().min(1900),
  color: z.string().optional(),
  licensePlate: z.string().min(1, "Plat nomor wajib diisi"),
  stnkDueDate: z.date(),
  insuranceDueDate: z.date(),
});

interface AddVehicleDialogProps {
  onSave?: (vehicleName: string) => void;
}

export function AddVehicleDialog({ onSave }: AddVehicleDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      brand: "",
      type: "",
      year: new Date().getFullYear(),
      color: "",
      licensePlate: "",
      stnkDueDate: new Date(),
      insuranceDueDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.from("vehicles").insert({
        name: values.name,
        category: values.category,
        brand: values.brand,
        type: values.type,
        year: values.year,
        color: values.color,
        license_plate: values.licensePlate,
        stnk_due_date: values.stnkDueDate.toISOString(),
        insurance_due_date: values.insuranceDueDate.toISOString(),
        is_sold: false,
        status: "active",
      });

      if (error) {
        alert("Gagal menyimpan kendaraan: " + error.message);
        return;
      }

      if (onSave) onSave(values.name);
      alert("Kendaraan berhasil ditambahkan");
      reset();
      setOpen(false);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Terjadi kesalahan saat menyimpan.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="w-4 h-4 mr-2" />
          Tambah Kendaraan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Tambah Kendaraan</DialogTitle>
          <DialogDescription>Masukkan informasi kendaraan baru.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Input id="category" {...register("category")} />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>
            <div>
              <Label htmlFor="brand">Merek</Label>
              <Input id="brand" {...register("brand")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="type">Tipe</Label>
              <Input id="type" {...register("type")} />
            </div>
            <div>
              <Label htmlFor="year">Tahun</Label>
              <Input type="number" id="year" {...register("year")} />
              {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="color">Warna</Label>
              <Input id="color" {...register("color")} />
            </div>
            <div>
              <Label htmlFor="licensePlate">Plat Nomor</Label>
              <Input id="licensePlate" {...register("licensePlate")} />
              {errors.licensePlate && <p className="text-sm text-red-500">{errors.licensePlate.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="stnkDueDate">STNK Berlaku Sampai</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("justify-start text-left", !watch("stnkDueDate") && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("stnkDueDate") ? format(watch("stnkDueDate"), "PPP") : <span>Pilih tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={watch("stnkDueDate")} onSelect={(date) => setValue("stnkDueDate", date!)} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="insuranceDueDate">Asuransi Berlaku Sampai</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("justify-start text-left", !watch("insuranceDueDate") && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("insuranceDueDate") ? format(watch("insuranceDueDate"), "PPP") : <span>Pilih tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={watch("insuranceDueDate")} onSelect={(date) => setValue("insuranceDueDate", date!)} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button type="submit" className="mt-4">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}