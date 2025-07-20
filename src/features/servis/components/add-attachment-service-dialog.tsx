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
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"
import { AttachmentService } from "@/models/attachment-service"

interface AddAttachmentServiceDialogProps {
  serviceId?: string
  onSave?: (newAttachment: AttachmentService) => void
}

// Schema: hanya izinkan file PDF atau gambar
const formSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf" || file.type.startsWith("image/"), {
      message: "File harus berupa PDF atau gambar",
    }),
})

type FormData = z.infer<typeof formSchema>

export function AddAttachmentServiceDialog({ serviceId, onSave }: AddAttachmentServiceDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  })

  const { reset } = form

  async function onSubmit(values: FormData) {
    try {
      if (!serviceId) throw new Error("ID servis tidak tersedia")

      const file = values.file
      const fileName = `${Date.now()}-${file.name}`
      const filePath = `${serviceId}/attachment/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("service")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        })

      if (uploadError) throw uploadError


      const insertPayload = {
        service_id: serviceId,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size.toString(),
        file_link: filePath,
        created_by: "system"
      }

      const { data: inserted, error: insertError } = await supabase
        .from("attachment_service")
        .insert(insertPayload)
        .select("*")
        .single()

      if (insertError) throw insertError

      toast.success("Dokumen servis berhasil ditambahkan")

      if (onSave) {
        onSave(inserted)
      }

      setOpen(false)
      reset()
    } catch (err: any) {
      console.error(err)
      toast.error("Gagal menambahkan dokumen")
    }
  }

  function handleDialogChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      reset()
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
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="font-medium">Dokumen</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dokumen"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="w-full"
                        type="file"
                        accept="application/pdf,image/*"
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
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
