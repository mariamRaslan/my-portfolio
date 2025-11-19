"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";

import { contactUsSchema } from "@/lib/schemas";
import { useState } from "react";
import z from "zod";
import CustomInput from "../custom-fields/CustomField";
import ContactModal from "../modals/ContactModal";
import { CustomButtonTwo } from "../ui/CustomButtons";
import { useTranslations } from "next-intl";
import axios, { isAxiosError } from "axios";

function ContactUsForm() {
  const t = useTranslations("form");
  const tErrors = useTranslations("errors");
  const [openModal, setOpenModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(contactUsSchema(tErrors)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      content: "",
    },
  });

  //console.log(form.formState.errors);

  const onSubmit = async (data: z.infer<typeof contactUsSchema>) => {
    try {
      await axios.post("/api?url=contact", data);
      setOpenModal(true);
      form.reset();
    } catch (error) {
      console.log("💥 contact us error : ", error);
      let errorText;
      if (isAxiosError(error)) {
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 pt-8"
        >
          <CustomInput
            form={form}
            name="name"
            label={t("name.label")}
            placeholder={t("name.placeholder")}
          />
          <CustomInput
            form={form}
            name="email"
            label={t("email.label")}
            placeholder={t("email.placeholder")}
          />
          <CustomInput
            form={form}
            name="phone"
            label={t("phone.label")}
            placeholder={t("phone.placeholder")}
          />
          <CustomInput
            form={form}
            name="content"
            label={t("content.label")}
            placeholder={t("content.placeholder")}
          />

          <CustomButtonTwo outerClassName="max-w-42.5 text-sm w-full ms-auto lg:mx-auto min-h-10">
            <span className="text-font-white">{t("send")}</span>
          </CustomButtonTwo>
        </form>
      </Form>
      <ContactModal open={openModal} setOpen={setOpenModal} text={t("modal")} />
    </>
  );
}

export default ContactUsForm;
