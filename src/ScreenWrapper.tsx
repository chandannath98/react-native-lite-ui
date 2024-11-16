import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "./ThemeContext";

export default function ScreenWrapper() {
  const theme = useTheme();
  return (
    <View
      style={{ flex: 1, backgroundColor: theme?.colors?.backgroundColor }}
    ></View>
  );
}

const styles = StyleSheet.create({});
