import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../ThemeContext';
import { Text } from '../..';


type buttonGroupProps= {
    buttons:string[],
    color?:string,
    radius?:number,
    value?:number
    
    onClick:(e:number)=>void
}

export default function ButtonGroup({ buttons, onClick,color,radius,value=0 }:buttonGroupProps) {

    const {colors}= useTheme(

    )
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateXOpposit = translateX.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    
    


    const onPress = (i:number) => {
      if(onClick)  onClick(i + 1);
        Animated.spring(translateX, {
            toValue: i * btnWidth,
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    };
    return (
        <View
            style={[styles.btnContainer,{borderColor: color|| colors.primary,borderRadius:radius ||50}]}
            onLayout={e =>{ 
                setWidth(e.nativeEvent.layout.width)
                translateX.setValue((e.nativeEvent.layout.width / buttons.length)*value)
                
                }}>
            {buttons.map((btn, i) => (
                <TouchableOpacity
                    key={btn}
                    style={[styles.btn,{borderColor:color || colors.primary}]}
                    onPress={() => onPress(i)}>
                    <Text style={{color:color || colors.primary}}>{btn}</Text>
                </TouchableOpacity>
            ))}
            <Animated.View
                style={[
                    styles.animatedBtnContainer,
                    {backgroundColor:color || colors.primary},
                    { width: btnWidth, transform: [{ translateX }] },
                ]}>
                {buttons.map(btn => (
                    <Animated.View
                        key={btn}
                        style={[
                            styles.animatedBtn,
                            { width: btnWidth, transform: [{ translateX: translateXOpposit }] },
                        ]}>
                        <Text style={styles.btnTextActive}>{btn}</Text>
                    </Animated.View>
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    btnContainer: {
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        // backgroundColor: 'red',
        width: '100%',
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:0.5
    },
    animatedBtnContainer: {
        height: 40,
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: '#444',
    },
    animatedBtn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

