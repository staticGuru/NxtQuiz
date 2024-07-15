export const getPostLoginAreaUrl = () => {
  return process.env.NEXT_PUBLIC_POST_LOGIN_AREA_URL || '#';
};

export const handleOptionSelection = (
  selectedOption: number,
  selectedOptionString: string,
  setSelectedOption: (value: number) => void,
  setSelectedOptionString: (value: string) => void,
  handleWritingState: () => void,
) => {
  setSelectedOption(selectedOption);
  setSelectedOptionString(selectedOptionString);
  handleWritingState();
};
