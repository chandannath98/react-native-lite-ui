import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Divider({height}:{height?:number}) {

  return (
    <View style={{height:height||1,backgroundColor:"gray",width:"100%"}}/>
  )
}

const styles = StyleSheet.create({})