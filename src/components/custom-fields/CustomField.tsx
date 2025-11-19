// components/custom-fields/CustomField.tsx
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

function CustomInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  className,
  labelClassName,
  inputClassName,
  component: Component = Input,
  children,         
  ...rest              
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  component?: React.ComponentType<any>;
  children?: React.ReactNode; 
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          <FormLabel className={cn("text-font-black", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <Component
              {...field}
              placeholder={placeholder || `ادخل ${label} هنا`}
              className={cn(
                "rounded-xl border-neutral-3 px-4 py-2 focus-visible:border-moss-600 focus-visible:ring-0",
                inputClassName
              )}
              {...rest}          
            >
              {children }
            </Component>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomInput;
