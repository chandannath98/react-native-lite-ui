import React, { useState, useRef } from 'react';
import { Animated, PanResponder, View, StyleSheet, Text } from 'react-native';

interface CustomSliderProps {
  minValue?: number;
  maxValue?: number;
  initialValue?: number;
  trackColor?: string;
  thumbColor?: string;
  trackHeight?: number;
  thumbSize?: number;
  onValueChange?: (value: number) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  minValue = 0,
  maxValue = 100,
  initialValue = 0,
  trackColor = '#ddd',
  thumbColor = '#007AFF',
  trackHeight = 6,
  thumbSize = 20,
  onValueChange
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value((initialValue - minValue) / (maxValue - minValue))).current;

  // Convert animation value to actual slider value
  const currentSliderValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [minValue, maxValue],
  });

  // Respond to touch events on the slider
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.stopAnimation();
      },
      onPanResponderMove: (evt, gestureState) => {
        const newValue = Math.min(Math.max(gestureState.dx, 0), sliderWidth);
        animatedValue.setValue(newValue / sliderWidth);
      },
      onPanResponderRelease: () => {
        animatedValue.flattenOffset();
        if (onValueChange) {
          animatedValue.addListener(({ value }) => {
            const sliderVal = minValue + value * (maxValue - minValue);
            onValueChange(Math.round(sliderVal));
          });
        }
      },
    })
  ).current;

  return (
    <View
      style={styles.container}
      onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
    >
      <View
        style={[
          styles.track,
          { backgroundColor: trackColor, height: trackHeight },
        ]}
      />
      <Animated.View
        style={[
          styles.fillTrack,
          {
            backgroundColor: thumbColor,
            width: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, sliderWidth],
            }),
            height: trackHeight,
          },
        ]}
      />
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            backgroundColor: thumbColor,
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, sliderWidth - thumbSize],
                }),
              },
            ],
          },
        ]}
      />
      <Text style={styles.sliderValue}>
        {currentSliderValue.__getValue().toFixed(0)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 3,
  },
  fillTrack: {
    position: 'absolute',
    left: 0,
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    top: -7,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  sliderValue: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default CustomSlider;
