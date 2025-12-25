import React from "react";
import { 
  Pressable, 
  StyleSheet, 
  PressableProps, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle,
  View
} from "react-native";
import Text from "./Text";
import color from "../../constants/themes/color";

type Props = PressableProps & {
  title: string;
  variant?: "primary" | "outline" | "secondary" | "neutral";
  size?: "small" | "medium";
  loading?: boolean;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
};

export default function Button({ 
  title, 
  style, 
  variant = "primary", 
  size = "small",
  loading = false, 
  textStyle,
  disabled,
  icon,
  ...props 
}: Props) {
  
  const getButtonStyle = (): ViewStyle => {
    switch (variant) {
      case "outline":
        return styles.outlineButton;
      case "secondary":
        return styles.secondaryButton;
      case "neutral":
        return styles.neutralButton;
      case "primary":
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case "outline":
        return styles.outlineText;
      case "secondary":
        return styles.secondaryText;
      case "neutral":
        return styles.neutralText;
      case "primary":
      default:
        return styles.primaryText;
    }
  };

  const sizeStyle = size === "small" ? styles.smallButton : styles.mediumButton;
  const sizeText = size === "small" ? styles.smallText : styles.mediumText;

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button, 
        getButtonStyle(), 
        sizeStyle,
        style as ViewStyle,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed
      ]} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "outline" || variant === "neutral" ? color.green.primary : "#FFFFFF"} />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text 
            weight="medium" 
            style={[getTextStyle(), sizeText, textStyle]}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: color.green.primary,
    borderColor: color.green.primary,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderColor: color.green.secondary,
  },
  secondaryButton: {
    backgroundColor: color.green.secondary,
    borderColor: color.green.secondary,
  },
  neutralButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  outlineText: {
    color: color.green.secondary,
  },
  secondaryText: {
    color: "#FFFFFF",
  },
  neutralText: {
    color: "#1A1A1A",
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  iconContainer: {
    marginRight: 10,
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.8,
  }
});
