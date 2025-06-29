// components/ParamCard.tsx
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import SectionItem from "@/components/shared/section-item";
import { Param } from "@/models/param";
import { ParamGroup } from "@/models/param-group";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { EditParamDialog } from "./edit-param-dialog";
import { useState } from "react";

type ParamCardProps = {
  param: Param;
  paramGroup: ParamGroup;
  index: number;
  onDeleted?: (id: string) => void;
  onUpdated?: (updated: Param) => void;
};

export function ParamCard({
  param,
  paramGroup,
  index,
  onDeleted,
  onUpdated,
}: ParamCardProps) {
  const [openDialog, setOpenDialog] = useState(false);

  async function handleDelete() {
    const { error } = await supabase.from("parameter").delete().eq("id", param.id);

    if (error) {
      toast.error("Gagal menghapus param", { description: error.message });
      return;
    }

    toast.success("Param berhasil dihapus");
    if (onDeleted && param.id) onDeleted(param.id);
   }

  return (
    <div className="bg-background border rounded-lg shadow-xs p-4 hover:shadow-md overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="bg-[#f5f5f5] flex items-center justify-center w-5 h-5 p-4 rounded-full">
          <p className="font-medium">{index + 1}</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          <SectionItem label="Name" value={param.name} />
          <SectionItem label="Description" value={param.description} />
        </div>

        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Param</DropdownMenuLabel>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenDialog(true);
                }}
              >
                Ubah
              </DropdownMenuItem>

              {!paramGroup.isTotalFixed && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Hapus
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Param?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Yakin ingin menghapus param "{param.name}"?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Tidak</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <EditParamDialog
        param={param}
        onSave={onUpdated}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </div>
  );
}
