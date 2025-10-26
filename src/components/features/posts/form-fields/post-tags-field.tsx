"use client";

import { useState } from "react";
import { FormFieldWrapper } from "./form-field-wrapper";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { postFieldValidators } from "@/lib/validators/post-field.validators";

interface PostTagsFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
}

export const PostTagsField = ({ field }: PostTagsFieldProps) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState<string>("");
  const tags = field.state.value || [];

  const handleAddTag = (tagToAdd: string) => {
    const validationError = postFieldValidators.tag(tagToAdd, tags);

    if (validationError) {
      setInputError(validationError);
      return;
    }

    const trimmedTag = tagToAdd.trim();
    const newTags = [...tags, trimmedTag];
    field.handleChange(newTags);
    setInputError("");

    requestAnimationFrame(() => {
      setInputValue("");
    });
  };

  const handleRemoveTag = (indexToRemove: number) => {
    const newTags = tags.filter(
      (_: string, index: number) => index !== indexToRemove
    );
    field.handleChange(newTags);
    setInputError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag((e.target as HTMLInputElement).value);
    }
  };

  const displayError = inputError || field.state.meta.errors[0];

  return (
    <FormFieldWrapper label="태그" htmlFor="tags" error={displayError}>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {tag}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-2 w-2 ml-2 cursor-pointer"
                onClick={() => handleRemoveTag(index)}
              >
                <XIcon className="text-red-500" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <Input
        type="text"
        id="tags"
        name="tags"
        placeholder="태그를 입력하고 Enter를 누르세요"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setInputError("");
        }}
        onKeyDown={handleKeyDown}
        onBlur={field.handleBlur}
        aria-invalid={!!displayError}
        className="shadow-none"
      />
    </FormFieldWrapper>
  );
};

export const tagFieldConfig = {
  name: "tags" as const,
  defaultValue: [] as string[],
};
