import { usePalette } from "./theme/usePalette";
import { BaseToast, ToastConfigParams } from "react-native-toast-message";
import { ibmPlexSans } from "./setup/useImportFonts";

export function useToastConfig() {
  const palette = usePalette();
  return {
    success: (props: ToastConfigParams<any>) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: palette.PRIORITY.LOW,
          height: "auto",
          paddingVertical: 12,
        }}
        text1Style={{
          fontSize: 20,
          fontFamily: ibmPlexSans[400],
        }}
        text2Style={{
          fontSize: 16,
          fontFamily: ibmPlexSans[400],
        }}
      />
    ),
    error: (props: ToastConfigParams<any>) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: palette.PRIORITY.HIGH,
          height: "auto",
          paddingVertical: 12,
        }}
        text1Style={{
          fontSize: 20,
          fontFamily: ibmPlexSans[400],
        }}
        text2Style={{
          fontSize: 16,
          fontFamily: ibmPlexSans[400],
        }}
      />
    ),
  };
}
