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
    confirmButtonText:'OK'
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


 



  const buttonColor = alertDetails?.type == "success" ? '#3bbc5e' : alertDetails?.type == "error" ? "#fb2c56" : alertDetails?.type == "warning" ? "orange" : theme.colors?.primary;


  const getAnimationSource=()=>{
    let animationSource;

    switch (alertDetails?.type) {
      case 'success':
        animationSource = require('../../LottieJsons/Success.json');
        break;
      case 'error':
        animationSource = require('../../LottieJsons/error.json');
        break;
      case 'info':
        animationSource = require('../../LottieJsons/Info.json');
        break;
      default:
        animationSource = require('../../LottieJsons/Warning.json');
        break;
    }

    return animationSource
  }






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
            style={{backgroundColor:alertDetails?.type=="success"? '#3bbc5e':alertDetails?.type=="error"?"#fb2c56":alertDetails?.type=="warning"?"orange": theme.colors?.primary,height:5,width:Dimensions.get('window').width * 0.687,
            // borderTopLeftRadius:15,
            // borderTopRightRadius:15,
            }}
            /> 
            <View
            
            style={{marginBottom:-15}}
            
            >
              
              <LottieView
              style={{ width: 120, height: 120, }}
              source={getAnimationSource()}
              autoPlay
             resizeMode='cover' 
             
              loop={false}
              />
            </View>

            {alertDetails?.heading &&
            <Text
            
            mode='bold' fontSize='large'
            
            style={{ color: alertDetails?.type=="success"? '#3bbc5e':alertDetails?.type=="error"?"#fb2c56":alertDetails?.type=="warning"?"orange": theme.colors?.primary,textAlign:"center"}}>{alertDetails?.heading}</Text>
}


            <Text
            colored
            
            mode='regular' fontSize='medium'
            
            style={{ color: '#8a858e'}}>{alertDetails?.message}</Text>

            <View 
            style={{flexDirection:"row",gap:20}}>

                <Button
                color={buttonColor}
                radius='m'
                title={alertDetails?.confirmButtonText! || 'OK'}
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
                radius='m'
                  color={buttonColor}
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
    borderRadius: 15,
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
