// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from "expo-file-system";

export default function App() {
  console.log('Camera', Camera)
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  console.log('type', type)
  console.log('Camera', Camera)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <Text>Mehmood Alam</Text>;
    // return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  };
  const takePicture = async () => {
    console.log("Mehmood Alam");
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri)
      setImage(data?.uri);
      let fsRead = await FileSystem.readAsStringAsync(data?.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64(fsRead)
      // console.log('fsRead', fsRead);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={type} ratio={'1:1'} ref={ref => setCamera(ref)} />
      </View>
      <View style={styles.cameraContainer}>
        <Image style={{ width: 300, height: 300, }} source={{ uri: image }} />
      </View>
      <Button title="Take Picture" style={{ marginBottom: 10 }} onPress={() => takePicture()} />
      <Button
        style={[styles.button, { marginVertical: 10 }]}
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
          );
        }}
      >
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
  camera: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
});