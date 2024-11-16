import React, { useState, useRef, useEffect, ReactNode } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Easing,
  BackHandler,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { Text } from '../..';

const BottomSheet = React.forwardRef(
  (
    {
      children,
      height,
      onOpen,
      onDismiss,
      closeOnTouchOutside,
      cancellable = true,
    }: {
      children: ReactNode;
      height?: number;
      onDismiss?: () => void;
      onOpen?: () => void;
      closeOnTouchOutside?: boolean;
      cancellable?: boolean;
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const translateY = useRef(
      new Animated.Value(Dimensions.get('window').height)
    ).current; // Initial position off-screen (bottom)
    const screenHeight = Dimensions.get('window').height;

    const theme = useTheme();

    function showBottomSheet() {
      setIsVisible(true);
      Animated.timing(translateY, {
        toValue: 0, // Move up from the bottom
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        if (onOpen) onOpen();
      });
    }

    function hideBottomSheet() {
      Animated.timing(translateY, {
        toValue: screenHeight, // Move back to the bottom (off-screen)
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      });
    }

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dy) > 10, // Start responding if vertical movement
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > screenHeight * 0.3) {
            // If swiped more than 30% down, close the bottom sheet
            hideBottomSheet();
          } else {
            // Return to the original position
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;

    useEffect(() => {
      const backAction = () => {
        if (cancellable) {
          hideBottomSheet();
        }

        return true;
      };
      let backHandler: any;

      if (isVisible) {
        backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
      } else {
        if (backHandler) backHandler?.remove();
      }

      if (backHandler && !isVisible)
        return () => {
          try {
            if (backHandler) backHandler?.remove();
          } catch (error) {
            // Handle the error
          }
        };
    }, [isVisible]);

    React.useImperativeHandle(
      ref,
      React.useCallback(
        () => ({
          show() {
            showBottomSheet();
          },
          hide() {
            hideBottomSheet();
          },
        }),
        [translateY]
      )
    );

    useEffect(() => {
      if (!isVisible) {
        translateY.setValue(screenHeight); // Reset to off-screen position
      }
    }, [isVisible]);

    if (!isVisible) {
      return null;
    }

    return (
      <View
        style={styles.centeredView}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => {
          if (closeOnTouchOutside) hideBottomSheet();
        }}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.modalView,
            {
              transform: [{ translateY }],
              height: height || screenHeight * 0.6, // Custom or default height,
              backgroundColor:theme.colorMode=="dark"? '#121212':"white"
            },
          ]}
        >
          <View
            style={{ width: '100%', height: '100%' }}
            onStartShouldSetResponder={() => true} // This captures the touch inside the bottom sheet
          >
            {/* Drag handle for visual indication */}
            <View style={styles.dragHandle} />
            {/* Bottom sheet content */}
            {children}
          </View>
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end', // Align at the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dim background
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    zIndex: 2,
    elevation: 5,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 8,
  },
});

export default BottomSheet;
