import { File, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../shadcn/dropdown-menu"
import { Button } from "../shadcn/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../shadcn/alert-dialog"
import { AttachmentVehicle } from "@/models/attachment-vehicle"
import { useState } from "react"

interface AttachmentItemProps {
    attachment: AttachmentVehicle
}

export default function AttachmentItem({
    attachment,
}: AttachmentItemProps) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    function handleDelete() {
        console.log(`Deleting file: ${attachment.fileName}`);
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
                        <DropdownMenuItem>Download</DropdownMenuItem>
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
                        <AlertDialogCancel>Tidak</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
