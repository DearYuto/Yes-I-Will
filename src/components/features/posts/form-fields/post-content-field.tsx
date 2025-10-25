import { Textarea } from "@/components/ui/textarea";
import { postFieldValidators } from "@/lib/validators/post-field.validators";
import { FormFieldWrapper } from "./form-field-wrapper";

interface PostContentFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
}

export const PostContentField = ({ field }: PostContentFieldProps) => {
  return (
    <FormFieldWrapper
      label="내용"
      htmlFor="content"
      error={field.state.meta.errors[0]}
    >
      <Textarea
        id="content"
        name="content"
        placeholder="게시글 내용을 입력하세요"
        rows={10}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={!!field.state.meta.errors.length}
      />
    </FormFieldWrapper>
  );
};

export const contentFieldConfig = {
  name: "body" as const,
  validators: {
    onChange: ({ value }: { value: string }) =>
      postFieldValidators.content(value),
  },
};
