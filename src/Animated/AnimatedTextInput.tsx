import React, { FC, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet,  TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '../ThemeContext';
import useFont from '../hooks/useFont';
import { TextInput } from '../..';


interface CustomTextInputProps extends TextInputProps {
  style?: TextStyle;
  fontWeight?: 'medium' | 'bold' | 'regular';
  disabled?: boolean;
  value:string, 
  onBlur?:()=>void,
  onFocus?:()=>void,
   placeholder:string, 
   multiline?:boolean,
   outerBoxStyle?:ViewStyle,
   placeholderStyle?:TextStyle
}


const AnimatedInput: FC<CustomTextInputProps>= ({ value, onBlur,onFocus, placeholder, multiline,outerBoxStyle,placeholderStyle,

  ...props

 })=> {

    const theme =useTheme()
    const color =(props.style?.color) ||theme.colors.textColor  ||'red'
    const [inputHeight, setHeight] = useState<number|null>(null);
    const [placeholderWidth, setWidth] = useState(null);
    const animation = useRef(new Animated.Value(0)).current;
    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -inputHeight / 2],
    });
    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -placeholderWidth / 4],
    });
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.75],
    });
    const onFocusInput = () =>{
        
        animate(1)
        if(onFocus) onFocus()
    
    
    };
    const onBlurInput = () => {
        
        !value && animate(0)
       if(onBlur) onBlur()

    
    };
    const animate = val => {
        Animated.spring(animation, {
            toValue: val,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    };
    return (
        <View
            style={[styles.inputContainer,outerBoxStyle?outerBoxStyle:{},]}
            onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
            <View style={{ height: inputHeight, ...styles.placeholderContainer }}>
                <Animated.Text
                    style={[
                        styles.placeholder,
                        color &&{color: color,backgroundColor:theme.colors.backgroundColor,fontSize:theme.fontSizes.medium} ,
                        placeholderStyle?placeholderStyle:{},
                        
                        { transform: [{ translateY }, { translateX }, { scale }] },
                    ]}
                    onTextLayout={e =>
                        !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
                    }>
                    {placeholder}
                </Animated.Text>
            </View>
            <TextInput
                style={[
                    styles.input,
                    multiline && { height: 100, textAlignVertical: 'top' },
                    {borderWidth:0}
                ]}
                
                onFocus={onFocusInput}
                onBlur={onBlurInput}
              {...props}
            />
        </View>
    );
}

export default AnimatedInput

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#999',
        marginBottom: 25,
    },
    input: {
        paddingHorizontal: 10,
        fontSize: 18,
    },
    placeholderContainer: {
        position: 'absolute',
        backgroundColor: 'red',
        justifyContent: 'center',
    },
    placeholder: {
        fontSize: 22,
        position: 'absolute',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        color: '#999',
    },
});
