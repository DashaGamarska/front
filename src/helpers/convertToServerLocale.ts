import type { Locale } from '@i18n';
import {ServerLocale} from "@components/types";
export const convertToServerLocale = (lang: Locale): ServerLocale => {
  return lang === 'uk' ? 'UA' : 'EN';
};
