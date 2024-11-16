import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import AlertModal from './AlertComponent';
import { AlertProps } from './AlertTypesAndValues/types';



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
export default function Alert(props:any) {
  console.log(props)
  const alertRef = useRef(null);

  const setRef = React.useCallback((ref:any) => {
    // Since we know there's a ref, we'll update `refs` to use it.
    if (ref) {
        // store the ref in this alert instance to be able to remove it from the array later when the ref becomes null.
        alertRef.current = ref;
        addNewRef(ref);
    }
    else {
        // remove the this alert's ref, wherever it is in the array.
        removeOldRef(alertRef.current);
    }
}, []);

  
  return (
    <View>
     
     <AlertModal ref={setRef} />
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
Alert.show = (params:AlertProps) => {

  getRef()?.show(params);
};
Alert.hide = () => {
  getRef()?.hide();
};

const styles = StyleSheet.create({})