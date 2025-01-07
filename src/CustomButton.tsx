import React, { FC, ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, TextStyle, ViewStyle, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { useTheme } from './ThemeContext';
import { Text } from '..';
import { fontSizes } from './constants/fontsizes';
import AntDesign from 'react-native-vector-icons/AntDesign';


interface CustomButtonProps extends TouchableOpacityProps {
 title: string;
 onPress: () => void;
 style?: ViewStyle;
 textStyle?: TextStyle;
 type?: 'contained' | 'outline' | 'text'; // Add more types if needed
 radius?: 'xl' | 'l' | 'm' | 's';
 color?: string;
 loading?: boolean;
 disabled?: boolean;
 startComponent?: ReactNode;
 trailingComponent?: ReactNode;
 trailingICon?:string
 trailingIconSize?:number;
 trailingIconColor?:string
}


const CustomButton: FC<CustomButtonProps> = ({
 title,
 disabled,
 onPress,
 style,
 type = "contained",
 radius,
 textStyle,
 loading,
 color,
 startComponent,
 trailingComponent,
 trailingICon,
 trailingIconSize,
 trailingIconColor,
 ...props
}) => {
 const theme = useTheme();
 const btnColor = disabled
   ? theme.colors.disabledColor
   : color || theme.colors?.buttonColor || theme.colors?.primary;


 return (
   <TouchableOpacity
     {...props}
     style={[
       styles.button,
       {
         backgroundColor: type === "contained" ? btnColor : 'none',
         borderWidth: type === "text" ? 0 : 1,
         borderColor: type === "outline" ? btnColor : type === "contained" ? btnColor : 'none',
         borderRadius: radius === "xl" ? 50 : radius === "l" ? 15 : radius === "m" ? 10 : radius === "s" ? 5 : 5
       },
       style
     ]}
     onPress={onPress}
     disabled={disabled}
   >
     {loading ? (
       <ActivityIndicator color={type === "contained" ? "white" : btnColor} />
     ) : (
       <View style={styles.contentContainer}>
         {startComponent && <View style={styles.componentContainer}>{startComponent}</View>}
         <Text
           mode='medium'
           style={[{ color: type === "contained" ? "white" : btnColor }, textStyle]}
         >
           {title}
         </Text>
         {trailingComponent && <View style={styles.componentContainer}>{trailingComponent}</View>}
         {trailingICon &&
                   <AntDesign name={trailingICon} size={trailingIconSize || 15} color={trailingIconColor ||( type === "contained" ? "white" : btnColor)} />
        
         }
       </View>
     )}
   </TouchableOpacity>
 );
};


const styles = StyleSheet.create({
 button: {
   padding: 10,
   borderRadius: 5,
   alignItems: 'center',
   minWidth: 80,
   flexDirection: 'row',
   justifyContent: 'center',
 },
 contentContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   gap:(5)
 },
 componentContainer: {
   marginHorizontal: 5,
 },
});


export default CustomButton;