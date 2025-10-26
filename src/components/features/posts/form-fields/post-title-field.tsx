import { Input } from "@/components/ui/input";
import { postFieldValidators } from "@/lib/validators/post-field.validators";
import { FormFieldWrapper } from "./form-field-wrapper";

interface PostTitleFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
}

export const PostTitleField = ({ field }: PostTitleFieldProps) => {
  return (
    <FormFieldWrapper
      label="제목"
      htmlFor="title"
      error={field.state.meta.errors[0]}
    >
      <Input
        id="title"
        name="title"
        placeholder="게시글 제목을 입력하세요"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={!!field.state.meta.errors.length}
        className="shadow-none"
      />
    </FormFieldWrapper>
  );
};

export const titleFieldConfig = {
  name: "title" as const,
  validators: {
    onChange: ({ value }: { value: string }) =>
      postFieldValidators.title(value),
  },
};
