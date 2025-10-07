import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  BackHandler,
} from 'react-native';
import {AlertProps} from './AlertTypesAndValues/types';
import {useTheme} from '../ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Button, Text } from '../..';
import LottieView from 'lottie-react-native';
 
const AlertModal = React.forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertDetails, setAlertDetails] = useState<AlertProps>({
    heading: '',
    message: '',
    type:'success',
    cancelButtonVisible:false,
    onAccept: ()=>{},
    onCancel: ()=>{},
    closeOnBackPress:true,
  });
  
  const theme = useTheme();

  function showAlert(params: AlertProps) {
    // console.log(params);
    setAlertDetails(params);
    setModalVisible(true);
  }

  function hideAlert() {
    setModalVisible(false);
  }

  // Imperative handle for controlling visibility from the parent component
  React.useImperativeHandle(
    ref,
    React.useCallback(
      () => ({
        show(params: AlertProps) {
          showAlert(params);
        },
        hide() {
          hideAlert();
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
          setModalVisible(alertDetails?.closeOnBackPress?false:true);
        }}>
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <View
            style={{backgroundColor:alertDetails?.type=="success"? '#3bbc5e':alertDetails?.type=="error"?"#fb2c56":alertDetails?.type=="warning"?"orange": theme.colors?.primary,height:7,width:Dimensions.get('window').width * 0.687,
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
            }}
            /> 
            <View
            
            // style={{position: 'absolute', top: -25}}
            
            >
              
              {alertDetails?.type == 'success' ? (
                <LottieView style={{width:90,height:90}} source={require('../../LottieJsons/Success.json')} autoPlay loop={false}/>
                // <AntDesign name="checkcircle" size={60} color={'green'} />
              ) : alertDetails?.type == 'error' ? (
                <LottieView style={{width:100,height:100}} source={require('../../LottieJsons/error.json')} autoPlay loop={false}/>
              ) : alertDetails?.type == 'info' ? (
                <LottieView style={{width:90,height:90}} source={require('../../LottieJsons/Info.json')} autoPlay loop={false}/>
              ) : (
                <LottieView style={{width:90,height:90}} source={require('../../LottieJsons/Warning.json')} autoPlay loop={false}/>
              )}
            </View>

            {alertDetails?.heading &&
            <Text
            
            mode='bold' fontSize='medium'
            
            style={{ color: alertDetails?.type=="success"? '#3bbc5e':alertDetails?.type=="error"?"#fb2c56":alertDetails?.type=="warning"?"orange": theme.colors?.primary,textAlign:"center"}}>{alertDetails?.heading}</Text>
}


            <Text
            colored
            
            mode='regular' fontSize='medium'
            
            style={{ color: 'black'}}>{alertDetails?.message}</Text>

            <View 
            style={{flexDirection:"row",gap:20}}>

                <Button
                color={alertDetails?.type=="success"? '#3bbc5e':alertDetails?.type=="error"?"#fb2c56":alertDetails?.type=="warning"?"orange": theme.colors?.primary}
                radius='xl'
                title='OK'
                type='contained'
                onPress={()=>{
                  
                  if(alertDetails?.onAccept){
                    alertDetails?.onAccept()

                  }
                  hideAlert()
                
                
                }}
                />
                {alertDetails?.cancelButtonVisible&&
                <Button
                radius='xl'

                title='Cancel'
                type='outline'
                onPress={()=>{
                  
                  if(alertDetails?.onCancel){
                    alertDetails?.onCancel()

                  }
                  hideAlert()
                
                
                }}
                />
}
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
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    // marginTop: 22,
  },
  modalView: {
   overflow:"hidden",
    gap:15,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    paddingTop:0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width * 0.7,
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

export default AlertModal;
