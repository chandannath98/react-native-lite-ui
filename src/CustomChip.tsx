import React, { FC } from 'react';
import { TouchableOpacity,  StyleSheet, TextStyle, ViewStyle, TouchableOpacityProps, ViewProps, View } from 'react-native';
import { useTheme } from './ThemeContext';
import { Text } from '..';

interface CustomChipProps extends ViewProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  type?: 'contained'|"outline"|"text"; // Add more types if needed
  radius?: 'xl'|'l'|"m"|"s"
  color?:string
}

const CustomChip: FC<CustomChipProps> = ({ title,  style,type="outline",radius='xl',textStyle,color,...props }) => {
  const theme = useTheme();
  const btnColor=color ||theme.colors?.buttonColor||theme.colors?.primary

  return (
    <View
    {...props}
      style={[styles.button, { 
        
        backgroundColor: type=="contained"? btnColor:'none',
        borderWidth:1,
        borderColor: type=="outline"? btnColor:type=="contained"? btnColor:'none',
        borderRadius: radius=="xl"?50:radius=="l"?15:radius=="m"?10:radius=="s"?5:5
      
      
      }, style]}
    >
      <Text mode='medium' 
      
      style={[{ color: type=="contained"?"white":btnColor },textStyle]}
      
      
      >{title}</Text>
    </View>
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
