import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
import { Chip, useTheme } from '../..';
import { Text } from 'react-native-gesture-handler';


type ChipProps ={
    id:number|string
    title:string
    icon?:(color:string,selected:boolean)=>ReactNode
}

interface Props extends ViewStyle{

    chips:ChipProps[]
    onSelect:(id:string|number)=>void;
    
      containerStyle?: ViewStyle;
      textStyle?: TextStyle;
      type?: 'contained'|"outline"|"text"; // Add more types if needed
      radius?: 'xl'|'l'|"m"|"s"
      color?:string;
      gap?:number;
      isTouchable?:boolean;
      backgroundColor?:string
      iconGap?:number
      selectedId:string|number
      chipStyle?:ViewStyle
}

const ChipGroup = ({chips,onSelect,containerStyle={},textStyle,type,radius,color,gap,isTouchable=true,backgroundColor,iconGap,selectedId,chipStyle}:Props) => {
  const theme = useTheme();
  const btnColor=color ||theme.colors?.buttonColor||theme.colors?.primary

  return (
    <View style={[styles.container,{gap:gap?gap:5},containerStyle]}>
        {chips?.map((chip)=>(
            <Chip
            title={chip.title}
            icon={chip?.icon?.((( type=="contained" || chip.id==selectedId)?"white":btnColor),(chip.id==selectedId))}
            selected={chip.id==selectedId}
            onPress={()=>onSelect(chip?.id)}
           style={[{paddingHorizontal:15},chipStyle!]}
           textStyle={textStyle}
           type={type}
           radius={radius}
           color={color}
           isTouchable={isTouchable}
           backgroundColor={backgroundColor}
           gap={iconGap}

            />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flexDirection:"row",
    alignItems: 'center',
    flexWrap:"wrap"
    
  },
});

export default ChipGroup;