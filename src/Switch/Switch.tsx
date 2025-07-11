import React, { useState, useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View, StyleSheet, Easing } from 'react-native';
import { useTheme } from '../ThemeContext';

interface CustomSwitchProps {
  isOn: boolean;
  onToggle: (newState: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  switchWidth?: number;
  switchHeight?: number;
  circleSize?: number;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  isOn,
  onToggle,
  activeColor, // Default active color (green)
  inactiveColor = '#E5E5EA', // Default inactive color (gray)
  switchWidth = 60, // Width of the switch
  switchHeight = 30, // Height of the switch
  circleSize = 26, // Size of the circle/knob
}) => {
  const [switchState, setSwitchState] = useState(isOn);
  const animatedValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;
    const theme =useTheme()
  const switchActiveColor:string|number =activeColor || theme.colors?.primary as string
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: switchState ? 1 : 0,
      duration: 300, // Duration of the animation
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  }, [switchState]);


  useEffect(() => {
    setSwitchState(isOn)
  }, [isOn])
  

  const toggleSwitch = () => {
    const newState = !switchState;
    setSwitchState(newState);
    onToggle(newState);
  };

  // Interpolating the switch position and background color based on the animation value
  const switchTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, switchWidth - circleSize - 4], // Circle movement from left to right
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, switchActiveColor],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.switchContainer,
          {
            width: switchWidth,
            height: switchHeight,
            borderRadius: switchHeight / 2,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.switchCircle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              transform: [{ translateX: switchTranslateX }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    justifyContent: 'center',
    padding: 2,
  },
  switchCircle: {
    backgroundColor: '#FFF', // White circle
  },
});

export default CustomSwitch;
