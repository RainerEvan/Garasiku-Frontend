import { File, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../shadcn/dropdown-menu"
import { Button } from "../shadcn/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../shadcn/alert-dialog"

interface AttachmentItemProps {
    id?: string,
    vehicleId?: string,
    fileName?: string,
    fileType?: string,
    fileSize?: string,
    fileLink?: string,
}

export default function AttachmentItem({
    id,
    vehicleId,
    fileName,
    fileType,
    fileSize,
    fileLink,
}: AttachmentItemProps) {

    function handleDelete() {
        console.log(`Deleting file: ${fileName}`);
    }

    return (
        <div className="flex flex-row">
            <div className="flex items-center justify-center p-2">
                <File className="w-5 h-5" />
            </div>
            <div className="w-full p-2">
                <div className="text-sm font-medium">{fileName}</div>
                <div className="text-xs text-medium">{fileSize}</div>
            </div>
            <div className="flex items-center justify-center p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Dokumen</DropdownMenuLabel>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Hapus</DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Hapus Dokumen?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Apakah Anda yakin ingin menghapus dokumen {fileName}?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                    >
                                        Hapus
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
