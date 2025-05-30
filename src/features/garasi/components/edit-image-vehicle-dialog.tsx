import type React from "react"

import { useRef, useState } from "react"
import { ImageIcon, ImagePlus, Trash } from "lucide-react"

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
import { ScrollArea } from "@/components/shadcn/scroll-area"

interface EditImageVehicleDialogProps {
    images: string[]
    onSave?: (images: string[]) => void
}

export function EditImageVehicleDialog({ images = [], onSave }: EditImageVehicleDialogProps) {
    const [open, setOpen] = useState(false)
    const [carImages, setCarImages] = useState<string[]>([...images])
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
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
                <Button variant="outline" size="sm" className="absolute top-2 right-2 bg-background/80 hover:bg-background shadow-md">
                    <ImageIcon />Ubah
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Foto Kendaraan</DialogTitle>
                    <DialogDescription>
                        Atur foto kendaraan dan klik button simpan.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
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
                                <ImagePlus />Tambah
                            </Button>
                        </div>

                        <div className="">
                            <ScrollArea className="h-[50vh]">
                                {carImages.length === 0 ? (
                                    <div className="h-[50vh] flex flex-col items-center justify-center text-center p-4">
                                        <ImageIcon className="h-5 w-5 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">Belum ada foto kendaraan</p>
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
            </DialogContent>
        </Dialog>
    )
}
