import { LayoutAnimation, ScrollView } from "react-native";
import { Container } from "../../../elements/layout/Container";
import { SGHeader } from "../../../elements/layout/SGHeader";
import { SGText } from "../../../elements/text/SGText";
import React from "react";
import { SettingsCard } from "./SettingsCard";
import { SGIcon } from "../../../elements/text/SGIcon";
import { SGLabel } from "../../../elements/text/SGLabel";
import {
  ThemeSetting,
  useThemeSetting,
} from "../../../data/settings/useThemeSetting";
import { usePalette } from "../../../hooks/theme/usePalette";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

export const Settings: React.FC = () => {
  const palette = usePalette();
  const [themeSetting, setThemeSetting] = useThemeSetting();

  const rotateTheme = () => {
    const settings = ["light", "dark", "system", "auto"] as ThemeSetting[];
    const index = Math.max(0, settings.indexOf(themeSetting));
    setThemeSetting(settings[(index + 1) % settings.length]);
  };

  return (
    <Container>
      <SGHeader leftIcon={{ name: "gear" }} text="Settings" rightIcons={[]} />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <SettingsCard
          options={[
            {
              fragment: (
                <>
                  <SGText fontSize={18}>Theme</SGText>
                  <SGLabel>{themeSetting}</SGLabel>
                </>
              ),
              onPress: rotateTheme,
            },
            {
              fragment: (
                <>
                  <SGText fontSize={18}>Feedback</SGText>
                  <SGIcon name={"external"} />
                </>
              ),
              onPress: () =>
                Linking.openURL("https://forms.gle/nYBWddtvenz1rQV7A"),
            },
          ]}
        />
        {!!Constants.manifest?.version && (
          <SGText
            style={{ alignSelf: "center", color: palette.OFF_PRIMARY_LIGHT }}
            fontSize={16}
          >
            v{Constants.manifest.version}
          </SGText>
        )}
      </ScrollView>
    </Container>
  );
};
