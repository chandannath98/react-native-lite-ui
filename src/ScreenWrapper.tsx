import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "./ThemeContext";






export default function ScreenWrapper({children,style}:{children:ReactNode,style?:ViewStyle|ViewStyle[]}) {
  const theme = useTheme();
  return (
    <View
      style={[{ flex: 1, backgroundColor: theme?.colors?.backgroundColor, },style]}
    >
        {children}
    </View>
  );
}

