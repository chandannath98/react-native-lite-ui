import { ReactNode } from "react";
import { TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

export interface CustomChipProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle |ViewStyle[];
  textStyle?: TextStyle;
  type?: 'contained'|"outline"|"text"; // Add more types if needed
  radius?: 'xl'|'l'|"m"|"s"
  color?:string;
  icon?:ReactNode|((color:string,selected:boolean)=>React.JSX.Element);
  gap?:number;
  selected?:boolean;
  isTouchable?:boolean;
  backgroundColor?:string
}