import _ from "lodash";
import * as common from "./common";
import * as auth from "./auth";

const loadedNameSpaces = {
  common,
  auth,
  // .... add your modules
};
 
export const defaultNameSpace: NameSpace = "common";
type SupportedLocale = "en" | "fr";

export const defaultLanguage: SupportedLocale = "fr";
export const keySeparator = ".";

export type NameSpace = keyof typeof loadedNameSpaces;
type LoadedResources = { [locale in SupportedLocale]: Translation };

type Translation = { [key: string]: string | Translation };

type Translations = {
  [nameSpace in NameSpace]: Translation;
};

type I18nResource = {
  [locale in SupportedLocale]: Translations;
};

function adaptLoadedResources() {
  const flatNameSpaces = Object.entries(loadedNameSpaces) as [
    NameSpace,
    LoadedResources
  ][];
  const flatResources = flatNameSpaces.map((nameSpace) => {
    const locales = Object.entries(nameSpace[1]) as [
      SupportedLocale,
      Translation
    ][];
    return locales.reduce<I18nResource>((accumulator, locale) => {
      accumulator[locale[0]] = {
        [`${nameSpace[0]}`]: locale[1],
      } as Translations;
      return accumulator;
    }, {} as I18nResource);
  });

  return _.spread(_.partial(_.merge, {}))(flatResources);
}

type AllLoadedNameSpaceType = typeof loadedNameSpaces[NameSpace];
type AllLoadedNameSpaceTypeByLanguage = AllLoadedNameSpaceType[typeof defaultLanguage];
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type RecursiveKeyOf<TObj extends Record<string, unknown>> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends unknown[]
    ? `${TKey}`
    : TObj[TKey] extends Record<string, unknown>
    ? `${TKey}${typeof keySeparator}${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

type FlattenTypedKey = UnionToIntersection<AllLoadedNameSpaceTypeByLanguage>;

// to type translation keys 
export type TranslationKey = RecursiveKeyOf<FlattenTypedKey>;

// to init i18next 
export const resources: I18nResource = adaptLoadedResources();
export const nameSpaceNames = Object.keys(loadedNameSpaces) as NameSpace[];

// create an instance for nameSpace which contains keys as values, to simplify accessibility to nameSpaces
// this variable is used everywhere when we need to call a translation from a specific nameSpace
export const nameSpaces: Record<NameSpace, NameSpace> = nameSpaceNames.reduce(
  (record, ns) => Object.assign(record, { [ns]: ns }),
  {} as Record<NameSpace, NameSpace>
);
