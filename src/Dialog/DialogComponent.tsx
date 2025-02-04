import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  BackHandler,
} from 'react-native';
import {DialogProps} from './types/types.tsx';
import {useTheme} from '../ThemeContext.tsx';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, Text} from '../../index.tsx';

const DialogModal = React.forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertDetails, setDialogDetails] = useState<DialogProps>({
    heading: '',
    message: '',
    cancelButtonVisible: false,
    onAccept: () => {},
    onCancel: () => {},
    closeOnBackPress: true,
  });

  const theme = useTheme();

  function showDialog(params: DialogProps) {
    setDialogDetails(params);
    setModalVisible(true);
  }

  function hideDialog() {
    setModalVisible(false);
  }

  // Imperative handle for controlling visibility from the parent component
  React.useImperativeHandle(
    ref,
    React.useCallback(
      () => ({
        show(params: DialogProps) {
          showDialog(params);
        },
        hide() {
          hideDialog();
        },
      }),
      [],
    ),
  );

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(alertDetails?.closeOnBackPress ? false : true);
        }}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor:
                theme.colorMode == 'dark'
                  ? 'rgba(210, 210, 210, 0.3)'
                  : 'rgba( 0, 0, 0, 0.08)',
            },
          ]}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor:
                  theme.colorMode == 'dark'
                    ? '#121212'
                    : theme.colors.backgroundColor,
              },
            ]}>
            <View

            // style={{position: 'absolute', top: -25}}
            ></View>
              {alertDetails?.heading &&
            <Text mode="bold" fontSize='medium'>
              {alertDetails?.heading}
            </Text>
}

            <Text
              mode="regular"
              fontSize="medium"
              style={{color: theme.colors?.textColor}}>
              {alertDetails?.message}
            </Text>

            <View style={{flexDirection: 'row', gap: 10}}>
              <Button
                radius="xl"
                title="OK"
                type="text"
                onPress={()=>{
                  
                  if(alertDetails?.onAccept){
                    alertDetails?.onAccept()

                  }
                  hideDialog()
                
                
                }}
              />

              <Button
                radius="xl"
                title="Cancel"
                type="text"
                onPress={()=>{
                  
                  if(alertDetails?.onCancel){
                    alertDetails?.onCancel()

                  }
                  hideDialog()
                
                
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( , 0, 0, 0.08)',
    // marginTop: 22,
  },
  modalView: {
    gap: 15,
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width * 0.8,
    // height: Dimensions.get('window').height * 0.25,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DialogModal;
