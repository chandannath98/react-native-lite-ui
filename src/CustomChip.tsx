import React, { FC, ReactNode } from 'react';
import { TouchableOpacity,  StyleSheet, TextStyle, ViewStyle, TouchableOpacityProps, ViewProps, View } from 'react-native';
import { useTheme } from './ThemeContext';
import { Text } from '..';

interface CustomChipProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  type?: 'contained'|"outline"|"text"; // Add more types if needed
  radius?: 'xl'|'l'|"m"|"s"
  color?:string;
  icon?:ReactNode;
  gap?:number;
  selected?:boolean;
  isTouchable?:boolean
}

const CustomChip: FC<CustomChipProps> = ({ title,  style,type="outline",radius='xl',textStyle,color,icon,gap,selected,isTouchable,...props }) => {
  const theme = useTheme();
  const btnColor=color ||theme.colors?.buttonColor||theme.colors?.primary

  return (
    <TouchableOpacity
    disabled={!isTouchable}
    {...props}
      style={[styles.button, { 
        
        backgroundColor:( type=="contained" || selected)? btnColor:theme.colors.backgroundColor,
        borderWidth:1,
        borderColor: type=="outline"? btnColor:type=="contained"? btnColor:'none',
        borderRadius: radius=="xl"?50:radius=="l"?15:radius=="m"?10:radius=="s"?5:5,
        flexDirection:"row",
        alignItems:"center",
        gap: icon?(gap||3):0,
        alignSelf:"flex-start"
      
      
      }, style]}
    >
      <Text mode='medium' 
      
      style={[{ color: ( type=="contained" || selected)?"white":btnColor },textStyle]}
      
      
      >{title}</Text>

      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonTextColor:{
    color: 'white',
  }
});

export default CustomChip;
