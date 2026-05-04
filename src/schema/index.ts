import { z } from "zod";
import { unggahBerkasSchema } from "./unggahBerkasSchema";
import {
  identitasSchema,
  kontakSchema,
  badanUsahaSchema,
  informasiLainnyaSchema,
} from "./formulirSchema";

export const ncageRegistrationSchema = unggahBerkasSchema
  .merge(identitasSchema)
  .merge(kontakSchema)
  .merge(badanUsahaSchema)
  .merge(informasiLainnyaSchema)
  .extend({
    is_agreed: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui pernyataan ini",
    }),
  });

export type NcageRegistrationFormValues = z.infer<
  typeof ncageRegistrationSchema
>;
