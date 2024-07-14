import React from "react";
import { View } from "react-native";
import svg from "../../icons/SendIcon";
import SVGIcon from "./SVGIcon/SVGIcon";

const SendButton = () => {
  return (
    <View
      style={{
        backgroundColor: "#3E41A8",
        width: 40,
        height: 40,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: -22,
        marginLeft: 5,
        marginRight: -4,
      }}
    >
      <SVGIcon width="40" height="20" src={svg} />
    </View>
  );
};

export default SendButton;
