import { useState } from "react"

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Param } from "@/models/param"
import { Plus, PlusCircle } from "lucide-react"
import { Input } from "@/components/shadcn/input"
import { ParamGroup } from "@/models/param-group"
import { Textarea } from "@/components/shadcn/textarea"

interface AddParamDialogProps {
  paramGroup: ParamGroup
  onSave?: (newParam: Param) => void
}

// Define the form schema with validation
const formSchema = z.object({
  group: z.string().min(1, { message: "Group harus terisi" }),
  name: z.string().min(1, { message: "Nama harus terisi" }),
  description: z.string().optional()
})

export function AddParamDialog({ paramGroup, onSave }: AddParamDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group: `${paramGroup.group} - ${paramGroup.name}`,
      name: "",
      description: ""
    },
  })

  const { reset } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      group: paramGroup.group,
    };

    console.log("Add param data: ", formattedValues)
    if (onSave) {
      onSave(formattedValues);
    }
    setOpen(false);
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
          <Button className="hidden sm:flex">
            <PlusCircle /> Tambah Param
          </Button>
          <Button variant="default" size="icon2" className="fixed z-50 bottom-4 right-4 sm:hidden">
            <Plus className="size-8" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] md:max-w-3xl overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Tambah Param</DialogTitle>
          <DialogDescription>Tambah param baru dan klik button simpan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Detail Param */}
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="font-medium">Group</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan group param"
                        {...field}
                        className="w-full"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="font-medium">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama param"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="font-medium">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan deskripsi param"
                        {...field}
                        className="w-full"
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
