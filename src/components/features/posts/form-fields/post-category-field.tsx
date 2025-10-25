import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { POST_CATEGORIES } from "@/lib/constants/post-categories";
import { postFieldValidators } from "@/lib/validators/post-field.validators";
import { FormFieldWrapper } from "./form-field-wrapper";

interface PostCategoryFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
}

export const PostCategoryField = ({ field }: PostCategoryFieldProps) => {
  return (
    <FormFieldWrapper
      label="카테고리"
      htmlFor="category"
      error={field.state.meta.errors[0]}
    >
      <Select value={field.state.value} onValueChange={field.handleChange}>
        <SelectTrigger
          id="category"
          aria-invalid={!!field.state.meta.errors.length}
        >
          <SelectValue placeholder="카테고리를 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {POST_CATEGORIES.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormFieldWrapper>
  );
};

export const categoryFieldConfig = {
  name: "category" as const,
  validators: {
    onChange: ({ value }: { value: string }) =>
      postFieldValidators.category(value),
  },
};
