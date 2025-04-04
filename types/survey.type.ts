export type age = number | "";
export type country = "Österreich" | "Deutschland" | "Schweiz" | "";
export type gender = "female" | "male" | "diverse" | "no_indication" | "";
export type versions = "original" | "softer" | "verySoft" | "ich weiß es nicht";

export type surveyResponseType = {
  articles: articleSelection;
  gender: gender;
  age: age;
  country: country;
  federalState: string;
  psychoSocialWorker: boolean | null;
  generalRemark: string | null;
  professionalRemark: string | null;
  verySoftDeathInjNums: number | null;
  softDeathInjNums: number | null;
  newsConsumptionFrequency: string | null;
  langLowSensitivity: number | null;
  langHighSensitivity: number | null;
  newsBoundaries: number | null;
  newsWorry: number | null;
  profession: string | null;
};

export type articleSelection = {
  article_sellner?: { remark: string };
  article_stocker?: { remark: string };
  article_iran_saengerin?: { remark: string };
  article_trump_grenell?: { remark: string };
  article_sanctions_russia?: { remark: string };
  article_tote_gaza: { remark: string };
};
