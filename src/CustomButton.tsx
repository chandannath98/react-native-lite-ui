import React, { FC } from 'react';
import { TouchableOpacity,  StyleSheet, TextStyle, ViewStyle, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { useTheme } from './ThemeContext';
import { Text } from '..';
import { fontSizes } from './constants/fontsizes';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  type?: 'contained'|"outline"|"text"; // Add more types if needed
  radius?: 'xl'|'l'|"m"|"s",
  color?: string
  loading?: boolean,
  disabled?: boolean
}

const CustomButton: FC<CustomButtonProps> = ({ title,disabled, onPress, style,type="contained",radius,textStyle,loading,color,...props }) => {
  const theme = useTheme();
  const btnColor=disabled ?theme.colors.disabledColor:color ||theme.colors?.buttonColor||theme.colors?.primary

  return (
    <TouchableOpacity
    {...props}
      style={[styles.button, { 
        
        backgroundColor: type=="contained"? btnColor:'none',
        borderWidth:type=="text"?0:1,
        borderColor: type=="outline"? btnColor:type=="contained"? btnColor:'none',
        borderRadius: radius=="xl"?50:radius=="l"?15:radius=="m"?10:radius=="s"?5:5
      
      
      }, style]}
      onPress={onPress}
    >
      {loading?
      <ActivityIndicator  color={type=="contained"?"white":btnColor}  />:
      <Text  mode='medium' 
      
      style={[{ color: type=="contained"?"white":btnColor },textStyle]}
      
      
      >{title}</Text>
}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 80,
  },
  buttonTextColor:{
    color: 'white',
  }
});

export default CustomButton;
