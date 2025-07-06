import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Textarea } from "@/components/shadcn/textarea";
import { useLoading } from "@/lib/loading-context";
import { LocationVehicle } from "@/models/location-vehicle";
import { supabase } from "@/lib/supabaseClient";
import { PARAM_GROUP_LOKASI_KENDARAAN } from "@/lib/constants"
import { toast } from "sonner";

interface MoveLocationVehicleDialogProps {
  vehicleId?: string;
  currLocationAddress?: string;
  onSave?: (newLocationVehicle: LocationVehicle) => void;
}

const formSchema = (currLocationAddress?: string) =>
  z
    .object({
      vehicleId: z.string().min(1, { message: "Vehicle Id harus terisi" }),
      name: z.string().min(1, { message: "Nama Lokasi harus terisi" }),
      address: z.string().min(1, { message: "Alamat Lokasi harus terisi" }),
    })
    .refine(
      (data) => {
        if (!currLocationAddress) return true;
        const normalize = (str: string) => str.replace(/\s+/g, "").toLowerCase();
        return normalize(data.address) !== normalize(currLocationAddress);
      },
      {
        message: "Lokasi baru tidak boleh sama dengan lokasi sekarang",
        path: ["address"],
      }
    );

export function MoveLocationVehicleDialog({
  vehicleId,
  currLocationAddress,
  onSave,
}: MoveLocationVehicleDialogProps) {
  const { setLoading } = useLoading();
  const [open, setOpen] = useState(false);
  const [locationParams, setLocationParams] = useState<{ name: string; description: string }[]>([]);

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(currLocationAddress)),
    defaultValues: {
      vehicleId: vehicleId ?? "",
      name: "",
      address: "",
    },
  });

  const { watch, setValue, reset } = form;
  const selectedName = watch("name");
  const isManualAddress = selectedName === "Lain-lain";

  useEffect(() => {
    const fetchLocationParams = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("parameter")
          .select("name, description")
          .eq("group", PARAM_GROUP_LOKASI_KENDARAAN);

        if (error) {
           toast.error("Gagal memuat data parameter");
          console.error("Failed to fetch parameter locations:", error);
        } else {
          setLocationParams(data || []);
        }
      } catch (err) {
        console.error("Unexpected error fetching parameter:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationParams();
  }, [setLoading]);

  useEffect(() => {
    const location = locationParams.find((l) => l.name === selectedName);
    if (!isManualAddress) {
      setValue("address", location?.description || "");
    } else {
      setValue("address", "");
    }

    if (selectedName) {
      form.trigger("address");
    }
  }, [selectedName, isManualAddress, locationParams, setValue, form]);

  async function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    console.log("Move location kendaraan data: ", values);

    const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    toast.error("Gagal mendapatkan user login");
    console.error("Gagal mendapatkan user login:", userError);
    alert("Gagal mendapatkan informasi user.");
    setLoading(false);
    return;
  }

  const username = user.user_metadata?.username || user.email || "unknown";

    if (!vehicleId) return;

    setLoading(true);

    const { error } = await supabase
      .from("vehicle_locations")
      .insert({
        vehicle_id: vehicleId,
        name: values.name,
        address: values.address,
        created_by: username, 
      });

    setLoading(false);

    if (error) {
      toast.error("Gagal insert lokasi kendaraan");
      console.error("Gagal insert lokasi kendaraan:", error);
      alert("Gagal memindahkan lokasi kendaraan.");
      return;
    }
    toast.success("Berhasil Update Lokasi Kendaraan");

    if (onSave) {
      onSave({
        id: "", 
        vehicleId: vehicleId,
        name: values.name,
        address: values.address,
        createdBy: username,
        createdAt: new Date().toISOString(),
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
        <Button>Pindah Lokasi</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Pindah Lokasi Kendaraan</DialogTitle>
          <DialogDescription>Pilih lokasi baru kendaraan dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lokasi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih nama lokasi kendaraan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationParams.map((option) => (
                          <SelectItem key={option.name} value={option.name}>
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
                  <FormItem>
                    <FormLabel>Alamat Lokasi</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Masukkan alamat lokasi kendaraan"
                        disabled={!isManualAddress}
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
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
