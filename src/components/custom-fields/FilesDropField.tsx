"use client";

import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneFileMessage,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneRetryFile,
  DropzoneTrigger,
  InfiniteProgress,
  useDropzone,
} from "@/components/ui/dropzone";
import { FileIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { Accept } from "react-dropzone";
import { useTranslations } from "next-intl";

type IDropOptions = {
  accept?: Accept;
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
};

const initialDropzoneOptions: IDropOptions = {
  maxFiles: 4,
  maxSize: 1024 * 1024 * 1,
  accept: {
    "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"],
    "application/pdf": [".pdf"],
  },
};

export function FileDropField<T extends FieldValues>({
  form,
  name,
  dropzoneOptions,
  className,
  showDescription,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  dropzoneOptions?: IDropOptions;
  className?: string;
  showDescription?: boolean;
}) {
  const dropzone = useDropzone({
    validation: {
      ...initialDropzoneOptions,
      ...dropzoneOptions,
    },
    onDropFile: async (file) => {
      return {
        status: "success",
        result: file.name,
      };
    },
  });
  const t = useTranslations("form.files");

  useEffect(() => {
    const successfulResults = dropzone.fileStatuses
      .filter((f) => f.status === "success")
      .map((f) => f.file);

    console.log("effect : ", dropzone.fileStatuses);

    form.setValue(name, successfulResults as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });

    if (dropzone.rootError) {
      console.log("root error : ", dropzone.rootError);
      form.setError(name, { type: "custom", message: dropzone.rootError });
    } else if (dropzone.fileStatuses.some((f) => f.status === "error")) {
      console.log("some files failed to upload");
      form.setError(name, {
        type: "custom",
        message: "Some files failed to upload",
      });
    } else {
      form.clearErrors(name);
    }
  }, [dropzone.fileStatuses, dropzone.rootError, form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormControl>
            <div className="not-prose flex flex-col gap-4">
              <Dropzone {...dropzone}>
                <div>
                  <div className="flex justify-end">
                    <DropzoneMessage />
                  </div>
                  <DropZoneArea className="p-0">
                    <DropzoneTrigger className="flex min-h-22 w-full justify-center bg-transparent p-4">
                      <div className="flex items-center gap-2 text-center text-sm">
                        <Image
                          src="/icons/upload.svg"
                          alt="upload"
                          width={20}
                          height={20}
                        />
                        <p className="text-muted-foreground text-sm">
                          {t("placeholder")}
                        </p>
                      </div>
                    </DropzoneTrigger>
                  </DropZoneArea>
                </div>

                <DropzoneFileList className="flex flex-col gap-3">
                  {dropzone.fileStatuses.map((file) => (
                    <div
                      key={file.id}
                      className="btn-gradient rounded-[5px] p-px"
                    >
                      <DropzoneFileListItem
                        className="bg-neutral-0 flex flex-col gap-4 rounded-lg"
                        key={file.id}
                        file={file}
                      >
                        <div className="flex justify-between">
                          <div className="flex min-w-0 items-center gap-2">
                            <Image
                              src="/icons/file-green.svg"
                              alt="file"
                              className="text-muted-foreground size-5"
                              width={20}
                              height={20}
                            />
                            <p className="truncate">{file.fileName}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {file.status === "error" && (
                              <DropzoneRetryFile
                                variant="ghost"
                                className="hover:border"
                                type="button"
                                size="icon"
                              >
                                <RotateCcwIcon className="size-4" />
                              </DropzoneRetryFile>
                            )}

                            <DropzoneRemoveFile
                              variant="ghost"
                              className="hover:border"
                              type="button"
                              size="icon"
                            >
                              <Trash2Icon className="size-4" />
                            </DropzoneRemoveFile>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <InfiniteProgress status={file.status} />
                          <div className="text-muted-foreground flex justify-between text-sm">
                            <p>
                              {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <DropzoneFileMessage className="text-sm" />
                          </div>
                        </div>
                      </DropzoneFileListItem>
                    </div>
                  ))}
                </DropzoneFileList>
              </Dropzone>
              {showDescription && (
                <div className="text-font-2 text-sm md:text-base">
                  <p>
                    . {t("allowed_types")}: (
                    {Object.values(
                      (dropzoneOptions?.accept ||
                        initialDropzoneOptions.accept) ??
                        {},
                    )
                      .flat()
                      .join(", ")}
                    )
                  </p>
                  <p>
                    . {t("max_size")}{" "}
                    {(dropzoneOptions?.maxSize! ||
                      initialDropzoneOptions?.maxSize!) /
                      (1024 * 1024)}{" "}
                    MB
                  </p>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
