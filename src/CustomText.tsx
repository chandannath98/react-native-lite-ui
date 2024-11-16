import React, {FC} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {useTheme} from './ThemeContext';
import {fontSizes} from "./constants/fontsizes.tsx"


interface CustomTextProps extends TextProps{
  children: React.ReactNode;
  style?: TextStyle|(TextStyle|undefined)[]|undefined;
  mode?: 'regular' | 'bold' | 'medium'; // Add more modes if needed
  colored?: boolean;
  fontSize?:  'medium'|"large"|"extraLarge"|"extraExtraLarge"|"small"|"extraSmall";
}



const CustomText: FC<CustomTextProps> = ({children, fontSize='medium',style, mode, colored,...props}) => {
  const theme = useTheme();

  const fontS=theme?.fontSizes? theme?.fontSizes[fontSize]:theme.fontSizes?.medium
  return (
    <Text
      style={[
        {
          color: colored ? theme.colors?.primary : theme.colors?.textColor,
          fontSize: fontS,
          fontFamily:
            mode == 'bold'
              ? theme.fonts?.bold
              : mode == 'medium'
              ? theme.fonts?.medium
              : theme.fonts?.regular,
        },
        !theme.fonts?.bold && {fontWeight:mode == 'bold'?"bold":mode =="medium"?"700":"400"},
        style,
      ]}
      
      {...props}
      >
      {children}
    </Text>
  );
};

export default CustomText;
