import z from "zod";

const phoneSchema = (t: (arg: string) => string) =>
  z.string().regex(/^[0-9]\d{7,14}$/, {
    message: t("phone.invalid"),
  });

export const councilSchema = (t: (arg: string) => string) =>
  z.object({
    name: z
      .string()
      .min(3, {
        message: t("name.min"),
      })
      .max(50, {
        message: t("name.max"),
      }),
    email: z.email({
      message: t("email.required"),
    }),
    phone: phoneSchema(t),
    service: z.string().min(1, {
      message: t("council_type.min"),
    }),
    message: z.string().min(10, {
      message: t("message.min"),
    }),
    attachments: z.array(z.instanceof(File)).optional(),
  });
export const contactUsSchema = (t: (arg: string) => string) =>
  z.object({
    name: z
      .string()
      .min(3, {
        message: t("name.min"),
      })
      .max(50, {
        message: t("name.max"),
      }),
    email: z.email({
      message: t("email.required"),
    }),
    phone: phoneSchema(t),
    content: z.string().min(10, {
      message: t("content.min"),
    }),
  });
