
/* eslint-disable no-console */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import {RNCamera} from 'react-native-camera';
import ImageEditor from '@react-native-community/image-editor';
import {Colors} from '@/themes/Colors';
import {IC_CAMERA, IC_LOGO} from '@/assets';
import {openFaceDetectScreen} from '@/utils/navigation';

const {width: DWidth, height: DHeight} = Dimensions.get('window');


const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    canDetectFaces: true,
    faces: [],
    uriImage: '',
    imageData: {},
    measuredSize: null,
  };

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {

    this.setState({
      // @ts-ignore
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      // @ts-ignore
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  takePicture = async function () {

    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      this.setState({
        uriImage: data.uri,
        imageData: data,
      });
      console.warn('takePicture ', data);
      openFaceDetectScreen({faces: this.state.faces,imageUri: data.uri, height:data.height, width:data.width})
    }
  };

  toggle = value => () => this.setState(prevState => ({[value]: !prevState[value]}));

  facesDetected = ({faces}) => {
    this.setState({faces});
  };

  onCapture() {
    this.state.uriImage && this.state.faces.length > 0 && this.state.faces.map(item => {
      const ratioWidth = item.bounds.size.width / DWidth;
      const ratioHeight = item.bounds.size.height / DHeight;
      const offsetX = item.bounds.origin.x / DWidth;
      const offsetY = item.bounds.origin.y / DHeight;

      const cropData = {
        offset: {x: offsetX * this.state.imageData.width, y: offsetY * this.state.imageData.height},
        size: {width: ratioWidth * this.state.imageData.width, height: ratioHeight * this.state.imageData.height},
        resizeMode: 'contain',
      };

      ImageEditor.cropImage(this.state.uriImage, cropData).then(url => {
        this.setState({
          uriImage: url,
        });
      });
    });
  }

  renderFace = ({bounds, faceID, rollAngle, yawAngle}) => (
    <View
      key={faceID}
      transform={[
        {perspective: 600},
        {rotateZ: `${rollAngle.toFixed(0)}deg`},
        {rotateY: `${yawAngle.toFixed(0)}deg`},
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    >
      {/*<Text style={styles.faceText}>ID: {faceID}</Text>*/}
      {/*<Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>*/}
      {/*<Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>*/}
    </View>
  );

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  );

  renderCamera() {
    const {canDetectFaces} = this.state;
    return (
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
          }}
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          zoom={this.state.zoom}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}
          focusDepth={this.state.depth}
          trackingEnabled
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks
              ? RNCamera.Constants.FaceDetection.Landmarks.all
              : undefined
          }
          faceDetectionClassifications={
            RNCamera.Constants.FaceDetection.Classifications
              ? RNCamera.Constants.FaceDetection.Classifications.all
              : undefined
          }
          onFacesDetected={canDetectFaces ? this.facesDetected : null}
        >
          <View
            style={{
              flex: 0.9,
              marginTop:16
            }}
          >
            <View
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
                <Text style={styles.flipText}> FLIP </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
                <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
                <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
              </TouchableOpacity>

            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',

              }}
            >
              <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.flipButton}>
                <Text style={styles.flipText}>
                  {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onCapture.bind(this)} style={styles.flipButton}>
                <Text style={styles.flipText}>
                  detect snap
                </Text>
              </TouchableOpacity>

            </View>
          </View>

          {this.state.zoom !== 0 && (
            <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
          )}
          <View
            style={{
              flex: 0.1,
              width:'100%',
              flexDirection: 'row',
              justifyContent:'center',
            }}
          >

            <TouchableOpacity
              style={[styles.flipButton, {flex: 0.1}]}
              onPress={this.zoomOut.bind(this)}
            >
              <Text style={styles.flipText}> - </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight:16, marginLeft:16}}
              onPress={this.takePicture.bind(this)}>
              <Image source={IC_CAMERA}/>

            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.flipButton, {flex: 0.1}]}
              onPress={this.zoomIn.bind(this)}
            >
              <Text style={styles.flipText}> + </Text>
            </TouchableOpacity>
          </View>
          {!!canDetectFaces && this.renderFaces()}

        </RNCamera>

    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: Colors.red1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
