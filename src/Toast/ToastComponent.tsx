import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, Easing, PanResponder, Dimensions } from 'react-native';
import ToastDuration from './ToastTypesAndValues/ToastDuration';
import { ToastProps } from './ToastTypesAndValues/types';
import { Text, useTheme } from '../..';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';


const ToastComponent = React.forwardRef((props, ref) => {
 const [isVisible, setIsVisible] = useState(false);
 const translateY = useRef(new Animated.Value(-100)).current; // Initial position above the view
 const translateX = useRef(new Animated.Value(0)).current; // For swipe
 const [toastDetails, setToastDetails] = useState<ToastProps | null>(null);
 const theme = useTheme();
 const screenWidth = Dimensions.get('window').width;


 function showToast(params: ToastProps) {
   setToastDetails(params);
   setIsVisible(true);
  //  console.log(toastDetails?.position === 'bottom',"///////////")
  //  console.log(toastDetails,"///////////")
    const targetTranslateY = params?.position === 'bottom' ? Dimensions.get('window').height - Dimensions.get('window').height*0.07 : 0; // Adjust target position
   translateY.setValue(params?.position === 'bottom' ? Dimensions.get('window').height : -100); // Set initial position
    Animated.timing(translateY, {
     toValue: targetTranslateY, // Move to the target position
     duration: 200,
     easing: Easing.out(Easing.ease),
     useNativeDriver: true,
   }).start();
    setTimeout(() => {
     hideToast(params?.position as string);
   }, params?.duration || 2000);
 }
  function hideToast(position?:string) {
   setIsVisible(false);
   setToastDetails(null)
  //  console.log(toastDetails,".......................")
   const hidePosition = position === 'bottom'
     ? Dimensions.get('window').height
     : -100; // Hide position dynamically based on the toast position
    Animated.timing(translateY, {
     toValue: hidePosition, // Move to the appropriate hide position
     duration: 200,
     easing: Easing.out(Easing.ease),
     useNativeDriver: true,
   }).start(() => {
     setIsVisible(false);
     setToastDetails(null);
     translateX.setValue(0); // Reset the horizontal swipe position
   });
 }


 const panResponder = useRef(
   PanResponder.create({
     onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10, // Start responding if horizontal movement
     onPanResponderMove: Animated.event([null, { dx: translateX }], { useNativeDriver: false }),
     onPanResponderRelease: (_, gestureState) => {
       if (Math.abs(gestureState.dx) > screenWidth * 0.3) {
         // If swiped more than 30% of the width, hide the toast
         hideToast();
       } else {
         // Animate the toast back to its original position if not swiped far enough
         Animated.spring(translateX, {
           toValue: 0,
           useNativeDriver: true,
         }).start();
       }
     },
   })
 ).current;


 React.useImperativeHandle(
   ref,
   React.useCallback(
     () => ({
       show(params: ToastProps) {
         showToast(params);
       },
       hide() {
         hideToast();
       },
     }),
     [translateY]
   )
 );


 useEffect(() => {
   if (!isVisible) {
     translateY.setValue(-100);
   }
 }, [isVisible]);


 return (
   <Animated.View
 {...panResponder.panHandlers}
 style={{
   transform: [{ translateY }, { translateX }],
   opacity: isVisible ? 1 : 0,
   position: 'absolute',
   [toastDetails?.position === 'bottom' ? 'bottom' : 'top']: 30, // Dynamically set position
   left: 20,
   right: 20,
   backgroundColor: 'white',
   elevation: 5,
   padding: 15,
   borderRadius: 5,
   borderLeftColor:
     toastDetails?.type === 'success'
       ? 'green'
       : toastDetails?.type === 'error'
       ? 'red'
       : toastDetails?.type === 'warning'
       ? 'orange'
       : theme.colors?.primary,
   borderLeftWidth: 5,
   gap: 10,
   flexDirection: 'row',
   zIndex: 6000000,
 }}
>
     <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
       {toastDetails?.type === 'success' ? (
         <AntDesign name="checkcircle" size={25} color="green" />
       ) : toastDetails?.type === 'error' ? (
         <MaterialIcons name="error" size={25} color="red" />
       ) : toastDetails?.type === 'info' ? (
         <AntDesign name="infocirlce" size={25} color={theme.colors?.primary} />
       ) : (
         <Entypo name="warning" size={25} color="orange" />
       )}
     </View>


     <View style={{ gap: 10 }}>
     {toastDetails?.heading &&  <Text mode="bold" fontSize="medium" style={{ color: toastDetails?.type === 'success' ? 'green' : toastDetails?.type === 'error' ? 'red' : toastDetails?.type === 'warning' ? 'orange' : theme.colors?.primary }}>
         {toastDetails?.heading}
       </Text>
}
       <Text  style={{ color: '#8a858e' ,maxWidth:Dimensions.get("window").width *0.7}}>{toastDetails?.message}</Text>
     </View>
   </Animated.View>
 );
});


export default ToastComponent;