"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Form } from "../ui/form";

import { councilSchema } from "@/lib/schemas";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import z from "zod";
import CustomInput from "../custom-fields/CustomField";
import { FileDropField } from "../custom-fields/FilesDropField";
import ContactModal from "../modals/ContactModal";
import { CustomButtonTwo } from "../ui/CustomButtons";
import axios, { isAxiosError } from "axios";
import SelectInput from "@/components/ui/select-input";

type serviceType = {
  value?: string;
  label?: string;
};
function CouncilForm({ serviceType }: { serviceType: serviceType[] }) {
  const t = useTranslations("form");
  const tErrors = useTranslations("errors");
  const [openModal, setOpenModal] = useState(false);
  const form = useForm({
    resolver: zodResolver(councilSchema(tErrors)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      attachments: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof councilSchema>) => {
    try {
      await axios.post("/api?url=orders", data);
      setOpenModal(true);
      form.reset();
    } catch (error) {
      console.log("💥 contact us error : ", error);
      let errorText;
      if (isAxiosError(error)) {
      }
    }
  };

  console.log(form.formState.errors);
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
          {/* Service type select (uses fetched options) */}
          <CustomInput
            form={form}
            name="service"
            label={t("council_type.label")}
            component={SelectInput}
          >
            {/* placeholder-like first option */}
            <option value="" className="text-muted-foreground" >{t("council_type.placeholder")}</option>
            {serviceType?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </CustomInput>
          <CustomInput
            form={form}
            name="message"
            label={t("message.label")}
            placeholder={t("message.placeholder")}
          />
          <FileDropField form={form} name="attachments" showDescription />

          <CustomButtonTwo outerClassName="max-w-42.5 text-sm w-full ms-auto lg:mx-auto min-h-10">
            <span className="text-font-white">{t("send")}</span>
          </CustomButtonTwo>
        </form>
      </Form>
      <ContactModal open={openModal} setOpen={setOpenModal} text={t("modal")} />
    </>
  );
}

export default CouncilForm;
