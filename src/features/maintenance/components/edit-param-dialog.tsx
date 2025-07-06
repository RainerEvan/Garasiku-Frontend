// components/EditParamDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/shadcn/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Button } from "@/components/shadcn/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Param } from "@/models/param";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface EditParamDialogProps {
  param: Param;
  onSave?: (updatedParam: Param) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const formSchema = z.object({
  id: z.string().min(1),
  group: z.string().min(1),
  name: z.string().min(1, { message: "Nama harus diisi" }),
  description: z.string().optional(),
});

export function EditParamDialog({
  param,
  onSave,
  open,
  onOpenChange,
}: EditParamDialogProps) {
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
      .select("*")
      .single();

    if (error) {
      toast.error("Gagal mengupdate param", { description: error.message });
      return;
    }

    toast.success("Param berhasil diupdate");
    if (onSave) onSave(data);
    onOpenChange?.(false);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange?.(isOpen);
      if (!isOpen) reset();
    }}>
      <DialogContent className="bg-white rounded-lg p-6 max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Edit Param</DialogTitle>
          <DialogDescription>Ubah dan simpan perubahan param.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
