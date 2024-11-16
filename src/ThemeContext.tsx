import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { Alert, Dialog, Toast } from '..';
import { Appearance, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  colors: {
    primary: string;
    secondary?: string;
    backgroundColor?: string;
    buttonColor?: string;
    textColor?: string;
    primary2?: string;
    primary3?: string;
    secondary2?: string;
    secondary3?: string;
    backgroundColor2?: string;
    backgroundColor3?: string;
    disabledColor?:string
  };
  themesColors?: {
    light: {
      primary: string;
      secondary?: string;
      backgroundColor?: string;
      buttonColor?: string;
      textColor?: string;
      disabledColor?:string

      primary2?:string,
      primary3?:string,
      secondary2?:string,
      secondary3?:string,
      backgroundColor2?:string,
      backgroundColor3?:string
    };
    dark: {
      primary: string;
      secondary?: string;
      backgroundColor?: string;
      buttonColor?: string;
      textColor?: string;
      disabledColor?:string

      primary2?:string,
      primary3?:string,
      secondary2?:string,
      secondary3?:string,
      backgroundColor2?:string,
      backgroundColor3?:string
    };
  };
  fontSizes: {
    medium?: number;
    large?: number;
    extraLarge?: number;
    extraExtraLarge?: number;
    small?: number;
    extraSmall?: number;
  };
  fonts: {
    regular?: string;
    bold?: string;
    medium?: string;
  };
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colorMode:string
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialValues: Omit<ThemeContextProps, 'themeMode' | 'setThemeMode'>;
}

const THEME_KEY = 'theme_preference';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialValues }) => {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [colors, setColors] = useState(initialValues.colors);
  const [fontSizes, setFontSizes] = useState(initialValues.fontSizes);
  const [fonts, setFonts] = useState(initialValues.fonts);
  const [colorMode, setColorMode] = useState('light')
  useEffect(() => {
    const loadThemePreference = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme) setThemeMode(storedTheme as ThemeMode);
    };
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (themeMode === 'system') {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        applyColors(colorScheme === 'dark' ? 'dark' : 'light');
      });
      return () => subscription.remove();
    }
  }, [themeMode]);

  const setTheme = async (mode: ThemeMode) => {
    await AsyncStorage.setItem(THEME_KEY, mode);
    setThemeMode(mode);
    applyColors(mode === 'system' ? (systemTheme === 'dark' ? 'dark' : 'light') : mode);
  };

  const applyColors = (mode: 'light' | 'dark') => {
    setColorMode(mode)
    setColors(initialValues.themesColors ? initialValues.themesColors[mode] : initialValues.colors);
  };

  useEffect(() => {
    applyColors(themeMode === 'system' ? (systemTheme === 'dark' ? 'dark' : 'light') : themeMode);
  }, [themeMode, systemTheme]);

  return (
    <ThemeContext.Provider value={{ colors, fontSizes, fonts, themeMode,colorMode, setThemeMode: setTheme ,}}>
      <Toast />
      <Alert />
      <Dialog />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
