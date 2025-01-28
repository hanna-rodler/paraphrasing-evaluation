export type gender = "female" | "male" | "diverse" | "no_indication" | "";
export type age = number | "";

export type surveyResponseType = {
  gender: gender;
  age: age;
  articles: [articleSelection];
};

export type articleSelection = {
  id: string;
  selectedSummary: "" | SummaryType;
  interest: interest;
  remark: string;
  order: {
    0: SummaryType;
    1: SummaryType;
    2: SummaryType;
  };
};
