import { isIphoneX } from "react-native-iphone-x-helper";
import { Header } from "react-navigation";
import { Platform } from "react-native";

export const getHeaderInset = () => {
  const NOTCH_HEIGHT = isIphoneX() ? 25 : 0;

  // $FlowIgnore: we will remove the HEIGHT static soon enough
  const BASE_HEADER_HEIGHT = Header.HEIGHT;

  const HEADER_HEIGHT =
    Platform.OS === "ios"
      ? BASE_HEADER_HEIGHT + NOTCH_HEIGHT
      : BASE_HEADER_HEIGHT + 20;

  return Platform.select({
    android: {
      contentContainerStyle: {
        paddingTop: HEADER_HEIGHT
      }
    },
    ios: {
      contentInset: { top: HEADER_HEIGHT },
      contentOffset: { y: -HEADER_HEIGHT, x: 0 }
    }
  });
};
