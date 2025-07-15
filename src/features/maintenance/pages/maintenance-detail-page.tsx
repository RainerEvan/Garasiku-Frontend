import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Param } from "@/models/param";
import { ParamGroup } from "@/models/param-group";
import { ParamCard } from "../components/param-card";
import { AddParamDialog } from "../components/add-param-dialog";
import { EmptyState } from "@/components/shared/empty-state";

export default function MaintenanceDetailPage() {
  const { id } = useParams();

  const [paramGroup, setParamGroup] = useState<ParamGroup | null>(null);
  const [params, setParams] = useState<Param[]>([]);

  const fetchData = async () => {
    if (!id) return;

    const [{ data: groupData, error: groupError }, { data: paramData, error: paramError }] =
      await Promise.all([
        supabase.from("parameter_group").select("*").eq("group", id).single(),
        supabase.from("parameter").select("*").eq("group", id).order("name", { ascending: true })
      ]);

    if (groupError || paramError) {
      console.error("Group Error:", groupError);
      console.error("Param Error:", paramError);
    } else {
      setParamGroup({
        id: groupData.id,
        group: groupData.group,
        name: groupData.name,
        description: groupData.description,
        isMaintain: groupData.is_maintain,
        isTotalFixed: groupData.is_total_fixed,
      });
      setParams(paramData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!paramGroup) return (
    <EmptyState title="Parameter Tidak Ditemukan" description="Parameter dengan ID tersebut tidak tersedia." />
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{paramGroup.name}</h1>
          {!paramGroup.isMaintain || !paramGroup.isTotalFixed ? (
            <AddParamDialog paramGroup={paramGroup} onSave={() => fetchData()} />
          ) : null}
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
                onDeleted={(id) => setParams((prev) => prev.filter((p) => p.id !== id))}
                onUpdated={(updatedParam) =>
                  setParams((prev) =>
                    prev.map((p) => (p.id === updatedParam.id ? updatedParam : p))
                  )
                }
              />

            ))}

          </div>
        </div>
      </main>
    </div>
  );
}
