import type React from "react"

import { useRef, useState } from "react"
import { ImageIcon, PlusCircle, Trash } from "lucide-react"

import { Button } from "@/components/shadcn/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/dialog"
import { ScrollArea } from "@/components/shadcn/scroll-area"

interface EditImageVehicleDialogProps {
    images: string[]
    onSave?: (images: string[]) => void
    trigger?: React.ReactNode
}

export function EditImageVehicleDialog({ images = [], onSave, trigger }: EditImageVehicleDialogProps) {
    const [open, setOpen] = useState(false)
    const [carImages, setCarImages] = useState<string[]>([...images])
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically open the file input dialog
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file)); // Create object URLs for preview
            setCarImages([...carImages, ...newImages]);
        }
    };

    const handleDeleteImage = (index: number) => {
        console.log("Delete Image")
        const updatedImages = [...carImages]
        updatedImages.splice(index, 1)
        setCarImages(updatedImages)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (onSave) {
            onSave(carImages)
        }
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="absolute top-2 right-2 bg-background/80 hover:bg-background shadow-md">
                        <ImageIcon />Ubah
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] md:max-w-3xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Foto Kendaraan</DialogTitle>
                    <DialogDescription>
                        Atur foto kendaraan dan klik button simpan.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <div className="flex items-end gap-2">
                            <div className="flex-1">
                                Total Foto: {carImages.length}
                            </div>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleFileChange} // Handle file selection
                            />

                            <Button type="button" onClick={handleAddImage}>
                                <PlusCircle />Tambah
                            </Button>
                        </div>

                        <div className="">
                            <ScrollArea className="h-96">
                                {carImages.length === 0 ? (
                                    <div className="flex h-[200px] flex-col items-center justify-center text-center p-4">
                                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">No images added yet</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Add images using the form above or add a placeholder image
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                        {carImages.map((image, index) => (
                                            <div
                                                key={`${image}-${index}`}
                                                className="group relative flex items-center gap-4"
                                            >
                                                <div className="relative aspect-video w-full overflow-hidden">
                                                    <img
                                                        src={image || "/placeholder.svg"}
                                                        alt={`Car image ${index + 1}`}
                                                        className="object-cover w-full h-full"
                                                    />
                                                    <div className="absolute bottom-2 left-2 flex items-center justify-center bg-background/80 size-8 rounded-full shadow-md">
                                                        <span className="text-foreground text-sm">{index + 1}</span>
                                                    </div>
                                                    <Button type="button" onClick={() => handleDeleteImage(index)} variant="outline" size="icon" className="absolute top-2 right-2 rounded-full bg-background/80 hover:bg-background shadow-md">
                                                        <Trash />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit">
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
