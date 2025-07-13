import { File, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../shadcn/dropdown-menu"
import { Button } from "../shadcn/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../shadcn/alert-dialog"
import { AttachmentVehicle } from "@/models/attachment-vehicle"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

interface AttachmentItemProps {
    attachment: AttachmentVehicle
    onDelete?: (id: string) => void
}

export default function AttachmentItem({
    attachment,
    onDelete,
}: AttachmentItemProps) {
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        setLoading(true)
        try {
            // Hapus file dari storage
            const { error: storageError } = await supabase.storage
                .from("kendaraan")
                .remove([attachment.fileLink ?? ""]);
            if (storageError) throw storageError

            // Hapus data dari database
            const { error: dbError } = await supabase
                .from("attachment_vehicle")
                .delete()
                .eq("id", attachment.id)
            if (dbError) throw dbError

            if (onDelete && attachment.id) onDelete(attachment.id)
        } catch (error) {
            console.error("Gagal menghapus dokumen:", error)
        } finally {
            setOpenDeleteDialog(false)
            setLoading(false)
        }
    }

    function handleDownload() {
        const { data } = supabase
            .storage
            .from("kendaraan") 
            .getPublicUrl(attachment.fileLink ?? ""); 

        if (data?.publicUrl) {
            window.open(data.publicUrl, "_blank");
        } else {
            console.error("Gagal mendapatkan public URL untuk file:", attachment.fileLink);
        }
    }


    return (
        <div className="flex flex-row p-2 gap-4">
            <div className="flex items-center justify-center">
                <File className="w-5 h-5" />
            </div>
            <div className="w-full">
                <div className="text-sm font-medium">{attachment.fileName}</div>
                <div className="text-xs text-medium">{attachment.fileSize}</div>
            </div>
            <div className="flex items-center justify-center">
                <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Dokumen</DropdownMenuLabel>
                        <DropdownMenuItem onClick={handleDownload}>Download</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setOpenDropdown(false)
                                setOpenDeleteDialog(true)
                            }}
                        >
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Dokumen?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus dokumen {attachment.fileName}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Tidak</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={loading}>
                            {loading ? "Menghapus..." : "Hapus"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
