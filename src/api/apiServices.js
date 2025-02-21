import { baseUrl, lang, textReq } from "../utils/constant";
import { doGet } from "./api";

export const getTranslatedList = (value) => {
  const Headers = {
    "Content-Type": "application/json; charset=UTF-8",
  };

  return doGet(
    `${baseUrl}${textReq}${value}${lang}`,
    {},
    Headers
  );
};
