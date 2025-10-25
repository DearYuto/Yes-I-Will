export const postFieldValidators = {
  title: (value: string) => {
    if (!value || value.trim().length === 0) {
      return "제목을 입력해주세요.";
    }

    if (value.length < 2) {
      return "제목은 최소 2자 이상이어야 합니다.";
    }

    if (value.length > 100) {
      return "제목은 최대 100자까지 입력 가능합니다.";
    }

    return undefined;
  },

  content: (value: string) => {
    if (!value || value.trim().length === 0) {
      return "내용을 입력해주세요.";
    }

    if (value.length < 10) {
      return "내용은 최소 10자 이상이어야 합니다.";
    }

    if (value.length > 5_000) {
      return "내용은 최대 5,000자까지 입력 가능합니다.";
    }

    return undefined;
  },

  category: (value: string) => {
    if (!value) {
      return "카테고리를 선택해주세요";
    }

    return undefined;
  },

  tag: (newTag: string, existingTags: string[]) => {
    const trimmedTag = newTag.trim();

    if (!trimmedTag) {
      return "태그를 입력해주세요.";
    }

    if (newTag.length > 24) {
      return "24자 이내로 입력해주세요.";
    }

    if (existingTags.includes(trimmedTag)) {
      return "이미 추가된 태그입니다.";
    }

    if (existingTags.length >= 5) {
      return "태그는 최대 5개까지 입력 가능합니다.";
    }

    return undefined;
  },
};
