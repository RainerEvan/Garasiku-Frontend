import { Button } from "@/components/shadcn/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog"
import SectionItem from "@/components/shared/section-item"
import { useLoading } from "@/lib/loading-context"
import { LicensePlateVehicle } from "@/models/license-plate-vehicle"
import { History } from "lucide-react"
import { useEffect, useState } from "react"
import { ChangeLicensePlateDialog } from "./change-license-plate-dialog"

interface LicensePlateDialogProps {
    vehicleId?: string
    currPlateNo?: string
}

export function LicensePlateDialog({ vehicleId, currPlateNo }: LicensePlateDialogProps) {
    const { setLoading } = useLoading();

    const [open, setOpen] = useState(false)
    const [listVehicleLicensePlates, setListVehicleLicensePlates] = useState<LicensePlateVehicle[]>([]);


    const vehicleLicensePlates: any[] = [
        {
            id: "1",
            plate_no: "D 1234 ABC",
            created_at: "2025-01-01",
            created_by: "rainerevan"
        },
        {
            id: "2",
            plate_no: "B 5678 DEF",
            created_at: "2024-10-02",
            created_by: "rainerevan"
        },
        {
            id: "3",
            plate_no: "B 9101 GHI",
            created_at: "2023-05-12",
            created_by: "rainerevan"
        }
    ]

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);

            try {
                const [
                    licensePlatesRes
                ] = await Promise.all([
                    // simulate fetching params (you might replace this with supabase or API call)
                    Promise.resolve(vehicleLicensePlates),
                ]);

                // === LICENSE PLATES ===
                const { data: licensePlatesData, error: licensePlatesError } = { data: licensePlatesRes, error: null }; // Replace with actual API call if needed
                if (licensePlatesError) {
                    console.error("Failed to fetch licensePlates:", licensePlatesError);
                } else if (licensePlatesData) {
                    const mappedLicensePlates = licensePlatesData.map((v: any) => ({
                        id: v.id,
                        vehicleId: v.vehicle_id,
                        plateNo: v.plate_no,
                        createdAt: v.created_at,
                        createdBy: v.created_by,
                    }));
                    setListVehicleLicensePlates(mappedLicensePlates);
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button asChild variant="outline">
                    <span className="font-medium">{currPlateNo}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Riwayat Plat No Kendaraan</DialogTitle>
                    <DialogDescription>Klik button ubah plat no untuk mengubah plat no kendaraan.</DialogDescription>
                </DialogHeader>

                <div className="w-full flex">
                    <ChangeLicensePlateDialog vehicleId={vehicleId} currPlateNo={currPlateNo} />
                </div>

                {listVehicleLicensePlates.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        {listVehicleLicensePlates.map((licensePlate) => (
                            <div key={licensePlate.id} className="w-full flex px-4 py-3 border rounded-lg shadow-xs bg-background">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="w-full">
                                        <p className="text-sm font-medium">{licensePlate.plateNo}</p>
                                    </div>
                                    <div className="w-full grid grid-cols-2 gap-5 text-xs text-gray-400">
                                        <SectionItem label="Diubah Pada" value={licensePlate.createdAt} />
                                        <SectionItem label="Diubah Oleh" value={licensePlate.createdBy} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                        <History className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Belum ada riwayat plat no kendaraan</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}