import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  Button,
  Pressable,
  Modal
} from 'react-native';

import axios from 'axios'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import  {launchCamera} from 'react-native-image-picker';
import {useState} from 'react'

const App = () => {
  // const windowHeight = Dimensions.get('window').height;
  // console.log('Window height: ',windowHeight)
  // const box_height = windowHeight/7
  // console.log('Box height: ',box_height)
  const [result, setResult] = useState(false);
  const [class_image, setClassImage] = useState('Evaluating Image');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
      <TouchableHighlight onPress={()=>{
        var options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        launchCamera(options, async (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          }else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          }else {
          console.log('User selected a file form camera or gallery', response); 
          setResult(true)
          const data = new FormData();
          data.append('name', 'avatar');
          data.append('fileData', {
            uri : response.uri,
            type: response.type,
            name: response.fileName
          });
          console.log('DATA SENT: ',data)
          const config = {
            method: 'POST',
            headers: {
            //'Accept': 'application/json',
            'content-type': 'multipart/form-data; boundary=some',
            },
            body: data,
          };
          class_result = await axios({
            method: 'post',
            url: 'http://192.168.1.215:5001/api/file/upload',
            data: data,
            headers: {'Content-Type': 'multipart/form-data; boundary=some' }
            })
            console.log('calasdafafdfadsf: ',class_result)
          setClassImage(class_result.data ? class_result.data.result_class: 'Please try again')
            // .then(function (response) {
            //     //handle success
            //     console.log(response);
            // })
            // .catch(function (response) {
            //     //handle error
            //     console.log(response);
            // });
          // fetch("http://192.168.0.116:5001" + "/api/file/upload", config)
          // .then((checkStatusAndGetJSONResponse)=> {       
          //   console.log('success:',checkStatusAndGetJSONResponse);
          // }).catch((err)=>{console.log(err)});
           }
        })
      }
    }><Text>Open Camera</Text></TouchableHighlight>
    {result ?
    <View style={styles.centeredView}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={result}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setClassImage('Evaluating Image')
          setResult(!result)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{class_image}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setClassImage('Evaluating Image');setResult(!result)}}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </View>
      :null}
      </SafeAreaView>
      
    </> 
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
