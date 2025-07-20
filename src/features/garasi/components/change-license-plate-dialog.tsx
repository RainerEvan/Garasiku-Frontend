import { useMemo, useState } from "react"
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
import { LicensePlateVehicle } from "@/models/license-plate-vehicle"
import { Input } from "@/components/shadcn/input"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"

interface ChangeLicensePlateDialogProps {
  vehicleId?: string
  currPlateNo?: string
  onSave?: (newLicensePlateVehicle: LicensePlateVehicle) => void
}

// Define the form schema with validation
const formSchema = (currPlateNo?: string) => z.object({
  vehicleId: z.string().min(1, { message: "Vehicle Id harus terisi" }),
  plateNo: z.string().min(1, { message: "Plat No harus terisi" }),
}).refine(
  (data) => {
    // If currPlateNo is undefined or empty, skip this check
    if (!currPlateNo) return true;
    const normalize = (str: string) => str.replace(/\s+/g, "").toLowerCase();

    return normalize(data.plateNo) !== normalize(currPlateNo);
  },
  {
    message: "Plat No baru tidak boleh sama dengan Plat No sekarang",
    path: ["plateNo"],
  }
)

export function ChangeLicensePlateDialog({ vehicleId, currPlateNo, onSave }: ChangeLicensePlateDialogProps) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(currPlateNo)),
    defaultValues: {
      vehicleId: vehicleId,
      plateNo: "",
    },
  })

  const userMeta = useMemo(() => {
    if (!user) return null;
    const meta = user.user_metadata || {};
    return {
      username: meta.username || user.email?.split("@")[0] || "nama pengguna",
    };
  }, [user]);

  const { reset } = form;

  async function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    if (!vehicleId) return;

    const updatedAt = new Date().toISOString();

    const newPlate = {
      vehicle_id: vehicleId,
      plat_no: values.plateNo,
      updated_by: user.user_metadata?.username || user.email || "unknown",
      updated_at: updatedAt
    };

    const { data: inserted, error: insertError } = await supabase
      .from("vehicle_plate_history")
      .insert(newPlate)
      .select("*")
      .single();

    if (insertError) {
      toast.error("Gagal menyimpan plat nomor: " + insertError.message);
      console.error("Gagal menyimpan plat nomor:", insertError);
      return;
    }

    const { error: updateError } = await supabase
      .from("vehicles")
      .update({ license_plate: values.plateNo })
      .eq("id", vehicleId);

    if (updateError) {
      toast.error("Gagal memperbarui data kendaraan: " + updateError.message);
      console.error("Gagal memperbarui data kendaraan:", updateError);
      return;
    }

    toast.success("Plat nomor berhasil diperbarui.");
    if (onSave && inserted) {
      onSave({
        id: inserted.id,
        vehicleId: inserted.vehicle_id,
        plateNo: inserted.plat_no,
        createdAt: updatedAt,
        createdBy: userMeta?.username || "unknown",
      });
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
        <Button className="w-full sm:w-auto">
          Ubah Plat No
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Ubah Plat No Kendaraan</DialogTitle>
          <DialogDescription>Masukkan plat no baru kendaraan dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Plat No Kendaraan */}
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="plateNo"
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
