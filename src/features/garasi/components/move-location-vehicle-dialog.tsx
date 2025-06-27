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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { LocationVehicle } from "@/models/location-vehicle"
import { Param } from "@/models/param"
import { Textarea } from "@/components/shadcn/textarea"
import { useLoading } from "@/lib/loading-context"

interface MoveLocationVehicleDialogProps {
  vehicleId?: string
  currLocationAddress?: string
  onSave?: (newLocationVehicle: LocationVehicle) => void
}

// Define the form schema with validation
const formSchema = (currLocationAddress?: string) => z.object({
  vehicleId: z.string().min(1, { message: "Vehicle Id harus terisi" }),
  name: z.string().min(1, { message: "Nama Lokasi harus terisi" }),
  address: z.string().min(1, { message: "Alamat Lokasi harus terisi" })
}).refine(
  (data) => {
    if (!currLocationAddress) return true;
    const normalize = (str: string) => str.replace(/\s+/g, "").toLowerCase();

    return normalize(data.address) !== normalize(currLocationAddress);
  },
  {
    message: "Lokasi baru tidak boleh sama dengan Lokasi sekarang",
    path: ["address"],
  }
)

export function MoveLocationVehicleDialog({ vehicleId, currLocationAddress, onSave }: MoveLocationVehicleDialogProps) {
  const { setLoading } = useLoading();

  const [open, setOpen] = useState(false)

  const [listVehicleLocationParams, setListVehicleLocationParams] = useState<Param[]>([]);

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(currLocationAddress)),
    defaultValues: {
      vehicleId: vehicleId,
      name: "",
      address: ""
    },
  })

  const locationVehicleParam: any[] = [
    {
      id: "1",
      group: "004",
      name: "Rumah Bandung",
      description: "Jl. Taman Sukajadi Baru Blok A VIII 12 No. 57, Bandung"
    },
    {
      id: "2",
      group: "004",
      name: "Apartment Jakarta",
      description: "Menteng Park Apartment, Jakarta"
    },
    {
      id: "3",
      group: "004",
      name: "Bengkel ASCO",
      description: "Jl. Kolonel Sugiono No. 20, Jakarta"
    },
    {
      id: "4",
      group: "004",
      name: "Lain-lain",
      description: ""
    }
  ]

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      try {
        const [
          vehicleLocationParamsRes,
        ] = await Promise.all([
          // simulate fetching params (you might replace this with supabase or API call)
          Promise.resolve(locationVehicleParam),
        ]);

        // === VEHICLE LOCATION PARAMS  ===
        const { data: vehicleLocationParamsData, error: vehicleLocationsError } = { data: vehicleLocationParamsRes, error: null }; // Replace with actual API call if needed
        if (vehicleLocationsError) {
          console.error("Failed to fetch vehicle location params:", vehicleLocationsError);
        } else if (vehicleLocationParamsData) {
          const mappedVehicleLocationParams = vehicleLocationParamsData.map((v: any) => ({
            id: v.id,
            group: v.group,
            name: v.name,
            description: v.description
          }));
          setListVehicleLocationParams(mappedVehicleLocationParams);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const { watch, setValue, reset } = form;

  const name = watch("name");

  const isLocationAddressDisabled = name !== "Lain-lain";

  // Update the nama field dynamically
  useEffect(() => {
    const location = locationVehicleParam.find((location => location.name == name));
    if (isLocationAddressDisabled) {
      setValue("address", location?.description || "");
    } else {
      setValue("address", "");
    }
    if (name) {
      form.trigger("address");
    }

  }, [name, setValue, form]);

  function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    console.log("Move location kendaraan data: ", values)
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
          <DialogTitle>Pindah Lokasi Kendaraan</DialogTitle>
          <DialogDescription>Pilih lokasi baru kendaraan dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Kendaraan */}
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
                          <SelectValue placeholder="Pilih nama lokasi kendaraan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listVehicleLocationParams.map((option) => (
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
                name="address"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="font-medium">Alamat Lokasi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan alamat lokasi kendaraan"
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
