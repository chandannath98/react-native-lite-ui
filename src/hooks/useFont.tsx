import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { useTheme } from '../ThemeContext'

export default function useFont() {
    const theme =useTheme()


    const fonts ={
        'bold':theme.fonts?.bold ,
        'medium':theme.fonts?.medium ,
       'regular':theme.fonts?.regular,
    }

    const fontWeights ={
        'bold':'bold' ,
        'medium':'700' ,
       'regular':'500',
    }
  return {fonts,fontWeights}
}

const styles = StyleSheet.create({})