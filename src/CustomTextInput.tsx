import React, {FC} from 'react';
import {TextInput, StyleSheet, TextInputProps, TextStyle,View, ColorValue} from 'react-native';
import {useTheme} from './ThemeContext';
import useFont from './hooks/useFont';
import { Text } from '..';

interface CustomTextInputProps extends TextInputProps {
  style?: TextStyle;
  fontWeight?: 'medium' | 'bold' | 'regular';
  disabled?: boolean;
  isError?:boolean;
  errorMessage?:String;
  gapBetweenErrorMessage?:string | number | undefined;
  errorColor?:ColorValue;
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  style,
  disabled,
  fontWeight = 'regular',
  isError,
  gapBetweenErrorMessage,
  errorMessage,
  errorColor,
  ...props
}) => {
  const theme = useTheme();
  const {fonts, fontWeights} = useFont();
  const fontWeightStyle = fonts[fontWeight];

  return (
    <>
    <TextInput
      style={[
        styles.input,
        {
          color: theme.colors?.textColor,
          borderColor:isError? (errorColor || "red"): '#E7E8E9',
          fontFamily: fontWeightStyle,
          fontSize:theme.fontSizes?.medium,
          borderWidth:isError?1:0,
      
        },
        !fonts.bold && {fontWeight: fontWeight},
        disabled && {backgroundColor:theme?.colors.disabledColor || "#E7E8E9"},
        style,
      ]}
      placeholderTextColor={'#d4d4d4'}
      {...props}
    />
  {isError &&  <Text style={{color:errorColor ||"red",marginTop:gapBetweenErrorMessage as any ||2}} >{errorMessage || "Invalid"}</Text>}
    </>
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
