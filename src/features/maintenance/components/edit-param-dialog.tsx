import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Param } from "@/models/param";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Button } from "@/components/shadcn/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface EditParamDialogProps {
  param: Param;
  onSave?: (updatedParam: Param) => void;
  trigger: React.ReactNode;
}

const formSchema = z.object({
  id: z.string().min(1),
  group: z.string().min(1),
  name: z.string().min(1, { message: "Nama harus diisi" }),
  description: z.string().optional(),
});

export function EditParamDialog({ param, onSave, trigger }: EditParamDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: param.id,
      group: param.group,
      name: param.name,
      description: param.description || "",
    },
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("parameter")
      .update({
        name: values.name,
        description: values.description,
      })
      .eq("id", values.id)
      .select()
      .single();

    if (error) {
      toast.error("Gagal mengupdate param", { description: error.message });
      return;
    }

    toast.success("Param berhasil diupdate");
    if (onSave) onSave(data);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) reset(); }}>
      <div onClick={() => setOpen(true)}>{trigger}</div>

      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Param</DialogTitle>
          <DialogDescription>Ubah dan simpan perubahan param.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Batal</Button>
              </DialogClose>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
