import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface FormFieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

export const FormFieldWrapper = ({
  label,
  htmlFor,
  error,
  children,
}: FormFieldWrapperProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      <div className="mt-2">{children}</div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
