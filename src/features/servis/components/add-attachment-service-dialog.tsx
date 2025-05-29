import { useState } from "react"
import { FilePlus } from "lucide-react"

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
import { Input } from "@/components/shadcn/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AttachmentService } from "@/models/attachment-service"

interface AddAttachmentServiceDialogProps {
  serviceId?: string
  onSave?: (newAttachment: AttachmentService) => void
}

// Define the form schema with validation
const formSchema = z.object({
  serviceId: z.string().min(1, { message: "Service Id harus terisi" }),
  fileName: z.string().min(1, { message: "Dokumen harus terisi" }),
  fileType: z.string().min(1, { message: "File Type harus terisi" }),
  fileSize: z.string().min(1, { message: "File Size harus terisi" }),
  fileLink: z.string().min(1, { message: "File Link harus terisi" }),
})

export function AddAttachmentServiceDialog({ serviceId, onSave }: AddAttachmentServiceDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: serviceId,
      fileName: "",
      fileType: "",
      fileSize: "",
      fileLink: "",
    },
  })

  const { reset } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Tambah dokumen kendaran: ", values)
    if (onSave) {
      onSave(values);
    }
    setOpen(false);
    reset();
  }

  function handleDialogChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <div>
          <Button variant="outline" size="sm">
            <FilePlus /> Tambah
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Tambah Dokumen</DialogTitle>
          <DialogDescription>Tambah lampiran dokumen baru dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Kendaraan */}
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="fileName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="font-medium">Dokumen</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dokumen"
                        {...field}
                        className="w-full"
                        type="file"
                        accept="application/pdf, image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
        </Form>

      </DialogContent>
    </Dialog>
  )
}
