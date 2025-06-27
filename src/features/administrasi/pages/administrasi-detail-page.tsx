import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SectionCard } from "@/components/shared/section-card";
import SectionItem from "@/components/shared/section-item";
import { Button } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog";
import { Administration } from "@/models/administration";
import TaskTypeBar from "@/components/shared/task-type-bar";
import StatusBar from "@/components/shared/status-bar";
import { Status } from "@/lib/constants";
import { DataBarCard } from "@/components/shared/data-bar-card";
import { CompleteAdministrationDialog } from "../components/complete-administrasi-dialog";
import { supabase } from "@/lib/supabaseClient";
import { useLoading } from "@/lib/loading-context";
import { Loader2, AlertTriangle } from "lucide-react";

export default function AdministrasiDetailPage() {
  const { id } = useParams();
  const { setLoading } = useLoading();

  const [administration, setAdministration] = useState<Administration | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLocalLoading] = useState(true); // local loading

  const handleCancelAdministration = () => {
    console.log("Cancel Administration button clicked");
  };

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      setLoading(true);
      setLocalLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("administration")
        .select(
          `
          *,
          vehicles (
            id,
            name,
            category,
            year,
            brand,
            color,
            type,
            license_plate
          )
        `
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Fetch error:", error);
        setError("Gagal mengambil data administrasi.");
        setAdministration(null);
      } else {
        setAdministration({
          id: data.id,
          ticketNum: data.ticket_num,
          vehicleId: data.vehicle_id,
          vehicle: {
            id: data.vehicles?.id,
            name: data.vehicles?.name,
            category: data.vehicles?.category,
            year: data.vehicles?.year,
            brand: data.vehicles?.brand,
            color: data.vehicles?.color,
            type: data.vehicles?.type,
            licensePlate: data.vehicles?.license_plate,
          },
          type: data.type,
          dueDate: data.due_date,
          endDate: data.end_date,
          status: data.status,
          totalCost: data.total_cost,
          notes: data.notes,
          newDueDate: data.new_due_date,
        });
      }

      setLoading(false);
      setLocalLoading(false);
    };

    fetchDetail();
  }, [id]);

  if (loading || !administration) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        {error ? (
          <div className="text-destructive flex flex-col items-center gap-2">
            <AlertTriangle className="w-8 h-8" />
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin w-6 h-6" />
            <p className="text-sm">Memuat data administrasi...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 rounded-lg border bg-background p-5">
            <div>
              <h1 className="text-3xl font-bold">{administration.ticketNum}</h1>
            </div>

            <Separator />

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between">
                  <TaskTypeBar taskType={administration.type} />
                  <StatusBar status={administration.status as Status} />
                </div>
                <div className="flex items-end justify-between">
                  <SectionItem label="Jatuh Tempo" value={administration.dueDate} />
                  <SectionItem label="Administrasi Selesai" value={administration.endDate} />
                </div>
              </div>

              {administration.status === "pending" && (
                <div className="flex flex-col-reverse gap-3 sm:grid sm:grid-cols-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Batalkan Administrasi</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Batalkan Administrasi?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin membatalkan administrasi {administration.ticketNum}?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tidak</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelAdministration}>Batalkan</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <CompleteAdministrationDialog
                    administration={administration}
                    dueDate={administration.dueDate || ""}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Link to={`/kendaraan/detail/${administration.vehicleId}`}>
            <DataBarCard
              variant="button"
              type="kendaraan"
              label={administration.vehicle?.name}
              description={administration.vehicle?.licensePlate}
            />
          </Link>
        </div>

        <div className="flex flex-col gap-5 overflow-auto">
          <SectionCard title="Rincian Administrasi">
            <div className="grid grid-cols-1 gap-3 py-1">
              <div className="grid grid-cols-2 gap-3">
                <SectionItem label="Jatuh Tempo Baru" value={administration.newDueDate} />
                <SectionItem label="Biaya" value={`Rp ${administration.totalCost}`} />
              </div>
              <SectionItem label="Catatan" value={administration.notes} />
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  );
}
