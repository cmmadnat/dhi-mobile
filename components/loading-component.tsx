import * as React from "react";
import LottieView from "lottie-react-native";

export interface IAppLoadingComponentProps {}

export default class AppLoadingComponent extends React.Component<
  IAppLoadingComponentProps
> {
  componentDidMount = () => {
    this.lottie.play();
  };
  lottie: LottieView;
  public render() {
    return (
      <LottieView
        ref={el => (this.lottie = el)}
        source={require("../assets/528-spinner-loading.json")}
        style={{ width: 100, height: 100, alignSelf: "center" }}
      />
    );
  }
}
