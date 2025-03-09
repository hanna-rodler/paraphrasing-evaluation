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
  iWouldRead: versions[] | null[];
  clientsWouldRead: versions[] | null[];
  psychoSocialWorker: boolean | null;
  generalRemark: string;
  verySoftDeathInjNums: number | null;
  softDeathInjNums: number | null;
};

export type articleSelection = {
  article_sellner: { softer: {}; verySoft: {}; remark: string };
  article_stocker: { softer: {}; verySoft: {}; remark: string };
  article_iran_saengerin: { softer: {}; verySoft: {}; remark: string };
  article_trump_grenell: { softer: {}; verySoft: {}; remark: string };
  article_sanctions_russia: { softer: {}; verySoft: {}; remark: string };
  article_tote_gaza: { softer: {}; verySoft: {}; remark: string };
};
