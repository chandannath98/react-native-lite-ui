import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { ToastProps } from './ToastTypesAndValues/types';
import ToastComponent from './ToastComponent';
import { ToastDuration } from 'react-native-lite-ui';


let refs:any[] = [];

function addNewRef(newRef:any) {
  refs.push({
      current: newRef
  });
}
/**
* Removes the passed in ref from the file-level refs array using a strict equality check.
*
* @param oldRef the exact ref object to remove from the refs array.
*/
function removeOldRef(oldRef:any) {
  refs = refs.filter((r) => r.current !== oldRef);
}
export default function Toast(props:any) {
  console.log(props)
  const toastRef = useRef(null);

  const setRef = React.useCallback((ref:any) => {
    // Since we know there's a ref, we'll update `refs` to use it.
    if (ref) {
        // store the ref in this toast instance to be able to remove it from the array later when the ref becomes null.
        toastRef.current = ref;
        addNewRef(ref);
    }
    else {
        // remove the this toast's ref, wherever it is in the array.
        removeOldRef(toastRef.current);
    }
}, []);

  
  return (
    <View>
     
     <ToastComponent ref={setRef} />
    </View>
  )
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find((ref) => ref?.current !== null);
  if (!activeRef) {
      return null;
  }
  return activeRef.current;
}
Toast.show = (params:{
  type: "info" | "success" | "warning" | "error" 
  heading?: string,
  message: string,
  duration?: ToastDuration|number,
  onDismiss?: () => void,
  position?: "top"|"bottom"

}) => {
  console.log("first messageeeeeeeeee")
  getRef()?.show(params);
};
Toast.hide = () => {
  getRef()?.hide();
};

const styles = StyleSheet.create({})