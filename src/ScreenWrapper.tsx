import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "./ThemeContext";

export default function ScreenWrapper({children}:{children:React.Node}) {
  const theme = useTheme();
  return (
    <View
      style={{ flex: 1, backgroundColor: theme?.colors?.backgroundColor }}
    >
        {children}
    </View>
  );
}

const styles = StyleSheet.create({});
