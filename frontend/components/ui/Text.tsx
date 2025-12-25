import React from "react";
import { Text as RNText, TextProps, StyleSheet, TextStyle } from "react-native";

export type TextVariant = "h1" | "h2" | "h3" | "body" | "bodySmall" | "caption";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";

type Props = TextProps & {
  variant?: TextVariant;
  weight?: TextWeight;
};

export default function Text({
  children,
  style,
  variant = "body",
  weight = "regular",
  ...props
}: Props) {
  const getFontFamily = () => {
    switch (weight) {
      case "medium":
        return "Inter-Medium";
      case "semibold":
        return "Inter-SemiBold";
      case "bold":
        return "Inter-SemiBold"; // Assuming bold maps to SemiBold if Bold isn't loaded
      default:
        return "Inter-Regular";
    }
  };

  return (
    <RNText
      {...props}
      style={[
        styles.base,
        styles[variant],
        { fontFamily: getFontFamily() },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: "#1A1A1A",
  },
  h1: {
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
});
