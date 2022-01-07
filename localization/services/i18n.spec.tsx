import React from "react";
import { useTypedTranslation } from "~/localization/hooks";
import { nameSpaces } from "~/localization/translations";
import { renderWithI18nProvider } from "~/localization/services/renderWith18nProvider";

describe("i18n", () => {
  const TranslatedText = () => {
    const { t } = useTypedTranslation(nameSpaces.common);
    return <div>{t("testing.testingKey")}</div>;
  };

  it("should render text in English", async () => {
    const { getByText } = renderWithI18nProvider("en", <TranslatedText />);
    expect(getByText("This text is used to test the app.")).toBeTruthy();
  });

  it("should render text in French", async () => {
    const { getByText } = renderWithI18nProvider("fr", <TranslatedText />);

    expect(getByText("Ce texte sert à tester l'application.")).toBeTruthy();
  });
});
