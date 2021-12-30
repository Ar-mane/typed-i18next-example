import React from "react";
import { Text } from "react-native";
import { useTypedTranslation } from "~/modules/i18n/hooks";
import { renderWithInitiatedI18nProvider } from "~/tests/utils";
import { nameSpaces } from "~/translations";

describe("i18n", () => {
  const TranslatedText = () => {
    const { t } = useTypedTranslation(nameSpaces.common);
    return <Text>{t("testing.testingKey")}</Text>;
  };

  it("should render text in English", async () => {
    const { getByText } = renderWithInitiatedI18nProvider(
      "en",
      <TranslatedText />
    );
    expect(getByText("This text is used to test the mobile app.")).toBeTruthy();
  });

  it("should render text in French", async () => {
    const { getByText } = renderWithInitiatedI18nProvider(
      "fr",
      <TranslatedText />
    );

    expect(
      getByText("Ce texte sert à tester l'application mobile.")
    ).toBeTruthy();
  });
});
