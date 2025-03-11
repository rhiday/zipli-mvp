import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from '../../app/navigation/AppNavigator';
import { Colors } from '../../src/design-system/theme/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

interface BackButtonProps {
  toHome?: boolean;
  text?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
  iconColor?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  toHome = false,
  text,
  style,
  textStyle,
  iconSize = 24,
  iconColor,
}) => {
  const navigation = useAppNavigation();
  const colorScheme = useColorScheme();
  const theme = colorScheme || 'light';

  const handlePress = () => {
    if (toHome) {
      navigation.goHome();
    } else {
      navigation.goBack();
    }
  };

  // Get the appropriate icon color based on theme or custom color
  const getIconColor = () => {
    if (iconColor) return iconColor;
    return Colors[theme].tint;
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={toHome ? "Back to home" : "Go back"}
    >
      <Ionicons
        name={toHome ? "home-outline" : "arrow-back"}
        size={iconSize}
        color={getIconColor()}
      />
      {text && <Text style={[styles.text, { color: Colors[theme].text }, textStyle]}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
}); 