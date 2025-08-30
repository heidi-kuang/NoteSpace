import { CONTENT_ALIGNMENT } from "@/constants/pdf-options";
import { z } from "zod";
export type ContentAlignment = typeof CONTENT_ALIGNMENT[keyof typeof CONTENT_ALIGNMENT];

export const PDFOptionsSchema = z.object({
  marginRatio: z
    .number({
      invalid_type_error: "",
    })
    .min(0.0, { message: "Margin must be a positive number" })
    .max(5.0, { message: "Margin cannot exceed 5.0" }),
  clipRHS: z
    .number({
      invalid_type_error: "",
    })
    .min(0.0)
    .max(1.0),
  clipLHS: z
    .number({
      invalid_type_error: "",
    })
    .min(0.0)
    .max(1.0),
  anchor: z.enum(Object.values(CONTENT_ALIGNMENT) as [ContentAlignment, ...ContentAlignment[]]),
});

export type PDFOptions = z.infer<typeof PDFOptionsSchema>;