import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPopoverSelector from 'rn-popover-selector';
import { RNPopoverSelectorProps } from 'rn-popover-selector/RNPopoverSelector';
import { Text, TextInput, useTheme } from '../..';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



 const Selector = (props:RNPopoverSelectorProps) => {
  const theme = useTheme();
 
  return (
    <RNPopoverSelector
    themeEnabled
     colors={theme.colors}
      scale={scale}
      color={theme.colors.primary}
      vScale={verticalScale}
      mScale={moderateScale}
      TextComponent={Text}
      TextInputComponent={TextInput}
    {...props}

      />
  );
};


export default Selector;