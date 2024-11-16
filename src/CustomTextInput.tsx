import React, {FC} from 'react';
import {TextInput, StyleSheet, TextInputProps, TextStyle} from 'react-native';
import {useTheme} from './ThemeContext';
import useFont from './hooks/useFont';

interface CustomTextInputProps extends TextInputProps {
  style?: TextStyle;
  fontWeight?: 'medium' | 'bold' | 'regular';
  disabled?: boolean;
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  style,
  disabled,
  fontWeight = 'regular',
  ...props
}) => {
  const theme = useTheme();
  const {fonts, fontWeights} = useFont();
  const fontWeightStyle = fonts[fontWeight];

  return (
    <TextInput
      style={[
        styles.input,
        {
          color: theme.colors?.textColor,
          borderColor: '#E7E8E9',
          fontFamily: fontWeightStyle,
          fontSize:theme.fontSizes?.medium
        },
        !fonts.bold && {fontWeight: fontWeight},
        disabled && {backgroundColor:theme?.colors.disabledColor || "#E7E8E9"},
        style,
      ]}
      placeholderTextColor={'#d4d4d4'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default CustomTextInput;
