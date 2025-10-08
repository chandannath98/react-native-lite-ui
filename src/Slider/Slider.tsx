import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const size = 40;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
Animated.addWhitelistedNativeProps({text: true});

const springConfig = () => {
  'worklet';
  return {
    stiffness: 1000,
    damping: 500,
    mass: 2,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };
};

function Slider({initialvalue, animationEnabled, onProgress}) {
  const layoutDetails = useSharedValue();
  const animation = useSharedValue(0);
  const progress = useSharedValue(initialvalue.toString());
  const aRef = useAnimatedRef();

  //=========== get bar width and other layout information =========== start
  const onLayoutBar = () => {
    runOnUI(getLayoutDetails)();
  };
  const getLayoutDetails = () => {
    'worklet';
    layoutDetails.value = measure(aRef);
    animation.value = ((layoutDetails.value.width - size) / 100) * initialvalue;
  };
  //=========== get bar width and other layout information =========== end

  // =========== same logic is written inside onStart and onActive events ===========
  const eventHandler = useAnimatedGestureHandler({
    onStart: event => {
      const newVal = Math.max(
        0,
        Math.min(
          event.absoluteX - size / 2 - layoutDetails.value.pageX,
          layoutDetails.value.width - size,
        ),
      );
      // animation.value = animationEnabled
      //   ? withSpring(newVal, springConfig())
      //   : newVal;
    },
    onActive: event => {
      const newVal = Math.max(
        0,
        Math.min(
          event.absoluteX - size / 2 - layoutDetails.value.pageX,
          layoutDetails.value.width - size,
        ),
      );
      // animation.value = animationEnabled
      //   ? withSpring(newVal, springConfig())
      //   : newVal;
    },
  });

  // =========== translate styles and also the progress value calcuated here ===========
  const _style = useAnimatedStyle(() => {
    if (layoutDetails.value) {
      const newProgress = Math.round(
        (animation.value / (layoutDetails.value.width - size)) * 100,
      ).toString();
      if (newProgress !== progress.value) {
        progress.value = newProgress;
        runOnJS(onProgress)(progress.value);
      }
    }
    return {
      transform: [{translateX: animation.value}],
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: progress.value,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.bar]} ref={aRef} onLayout={onLayoutBar}>
        <Animated.View style={[styles.moveRightBar, _style]} />
        <Animated.View style={[styles.dot, _style]}>
          <View pointerEvents="none">
            <Animated.TextInput
              style={styles.txt}
              defaultValue={initialvalue.toString()}
              editable={false}
              {...{animatedProps}}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

  function SliderReanimated() {
  const [animationEnabled, setAnimationEnabled] = useState(true);
  return (
    <View style={styles.container}>
      <Button
        title={'Animation: ' + (animationEnabled ? 'on' : 'off')}
        onPress={() => setAnimationEnabled(val => !val)}
      />
      <Slider
        initialvalue={50}
        animationEnabled={animationEnabled}
        onProgress={val => console.log(val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  bar: {
    width: '100%',
    backgroundColor: 'lightgreen',
    borderRadius: size,
    overflow: 'hidden',
  },
  dot: {
    height: size,
    width: size,
    borderRadius: size,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 10,
    color: '#fff',
    padding: 0,
    textAlign: 'center',
  },
  moveRightBar: {
    height: '100%',
    width: '100%',
    backgroundColor: '#eee',
    position: 'absolute',
    marginLeft: size / 2,
  },
});
