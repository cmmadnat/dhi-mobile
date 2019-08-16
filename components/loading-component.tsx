import * as React from "react";
import LottieView from "lottie-react-native";

export interface IAppLoadingComponentProps {
  show: boolean;
}

export default class AppLoadingComponent extends React.Component<
  IAppLoadingComponentProps
> {
  componentDidMount = () => {
    this.lottie.play();
  };
  lottie: LottieView;
  public render() {
    const { show } = this.props;

    return (
      <LottieView
        ref={el => (this.lottie = el)}
        source={require("../assets/51-preloader.json")}
        style={{
          display: show ? "flex" : "none",
          width: 100,
          height: 100,
          alignSelf: "center"
        }}
      />
    );
  }
}
