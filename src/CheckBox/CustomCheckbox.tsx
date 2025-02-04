import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, useTheme} from '../..';

type CheckBoxProps = {
  label?: string;

  checked: boolean;
  onChange: () => void;
  size?:number
  color?:string
};
const CustomCheckbox = ({label, checked, onChange,size,color}: CheckBoxProps) => {

  const {colors,fontSizes} = useTheme()
  return (
    <TouchableOpacity style={[styles.container, {borderColor:colors.primary}]} onPress={onChange}>
      <Icon
        name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={size || 24}
        color={color || colors.primary}
      />
      {label && <Text> {label}</Text>}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf:"flex-start",
    // backgroundColor:"red"
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
  },
});
