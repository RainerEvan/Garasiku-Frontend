import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Param } from "@/models/param";
import { ParamGroup } from "@/models/param-group";
import { ParamCard } from "../components/param-card";
import { AddParamDialog } from "../components/add-param-dialog";
import { Loader2, AlertTriangle } from "lucide-react";

export default function MaintenanceDetailPage() {
  const { id } = useParams(); // Ambil group dari URL

  const [paramGroup, setParamGroup] = useState<ParamGroup | null>(null);
  const [params, setParams] = useState<Param[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
        console.log(id);

    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const [{ data: groupData, error: groupError }, { data: paramData, error: paramError }] =
        await Promise.all([
          supabase.from("parameter_group").select("*").eq("group", id).single(),
          supabase.from("parameter").select("*").eq("group", id),
        ]);

      if (groupError || paramError) {
        setError("Gagal memuat data parameter.");
        console.error("Group Error:", groupError);
        console.error("Param Error:", paramError);
      } else {
        setParamGroup(groupData);
        setParams(paramData);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Memuat data...
      </div>
    );
  }

  if (error || !paramGroup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-destructive">
        <AlertTriangle className="w-6 h-6 mb-2" />
        <p>{error || "Parameter group tidak ditemukan."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{paramGroup.name}</h1>
          {!paramGroup.isMaintain || !paramGroup.isTotalFixed && (
            <AddParamDialog paramGroup={paramGroup} />
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">
              Total Data: <span className="font-medium">{params.length}</span>
            </p>
          </div>

          <div className="flex flex-col gap-5 overflow-auto">
            {params.map((param, index) => (
              <ParamCard
                key={param.id}
                param={param}
                paramGroup={paramGroup}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
