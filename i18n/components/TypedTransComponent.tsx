import React from "react";
import { Trans } from "react-i18next";
import { NameSpace, TranslationKey } from "../../translations";

interface TypedTransComponentProps {
  i18nKey: TranslationKey;
  ns: NameSpace;
  prefix?: string;
  components?: TypedComponents;
}

type TypedComponents =
  | React.ReactNode[]
  | {
      [tagName: string]: React.ReactNode;
      bold?: React.ReactNode;
      Link?: React.ReactNode;
    };

export function TypedTransComponent({
  i18nKey,
  ns,
  components,
  prefix,
}: TypedTransComponentProps) {
  return (
    <Trans ns={ns} prefix={prefix} i18nKey={i18nKey} components={components} />
  );
}
