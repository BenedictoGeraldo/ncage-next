import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_DOCUMENT_TYPES = ["application/pdf"];

const fileSchema = (isRequired: boolean = true, isImage: boolean = false) => {
  let schema: z.ZodTypeAny = z.any();

  if (isRequired) {
    schema = schema.refine(
      (file) => (typeof window !== "undefined" && file instanceof File) || typeof file === "string",
      "File wajib diunggah.",
    );
  } else {
    schema = schema.optional().nullable();
  }

  return schema
    .refine((file: unknown) => {
      if (!file) return !isRequired;
      if (typeof file === "string") return true; // file lama
      if (!(file instanceof File)) return false;
      return file.size <= MAX_FILE_SIZE;
    }, "Ukuran file maksimal 5MB.")
    .refine(
      (file: unknown) => {
        if (!file) return !isRequired;
        if (typeof file === "string") return true; // file lama
        if (!(file instanceof File)) return false;
        if (isImage) {
          return file.type.startsWith("image/");
        }
        return ACCEPTED_DOCUMENT_TYPES.includes(file.type);
      },
      isImage ? "Format harus berupa gambar." : "Format harus berupa PDF.",
    );
};

export const unggahBerkasSchema = z.object({
  surat_permohonan: fileSchema(true),
  surat_pernyataan: fileSchema(true),
  foto_kantor: fileSchema(true, true),
  sk_domisili: fileSchema(false),
  akta_notaris: fileSchema(true),
  sk_kemenkumham: fileSchema(true),
  siup_nib: fileSchema(true),
  company_profile: fileSchema(true),
  npwp_perusahaan: fileSchema(true),
  surat_kuasa: fileSchema(false),
  daftar_isian_sam: fileSchema(false),
});

export type UnggahBerkasFormValues = z.infer<typeof unggahBerkasSchema>;
