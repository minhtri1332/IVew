/* eslint-disable no-console */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import {RNCamera, RNCameraProps} from 'react-native-camera';
import ImageEditor from '@react-native-community/image-editor';
import {Colors} from '@/themes/Colors';
import {IC_CAMERA, IC_LOGO} from '@/assets';
import {openFaceDetectScreen} from '@/utils/navigation';
import {styled} from '@/global';

const {width: DWidth, height: DHeight} = Dimensions.get('window');


const CameraWidth = DWidth;
const CameraHeight = 4 / 3 * DWidth;

const ContentCamera = styled.View`
    width: ${CameraWidth};
    height: ${CameraHeight};
`;

const Header = styled.View`
  flex: 1;
  background-color: #000;
  padding-top: 32px;
`;

const Bottom = styled.View`
  flex: 1;
  padding-top: 16px;
  background-color: #000;
`;
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
  state: any = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'front',
    whiteBalance: 'auto',
    ratio: '4:3',
    canDetectFaces: true,
    faces: [],
    uriImage: '',
    imageData: {},
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

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync({
        fixOrientation: this.state.type === 'front' ? true : false,
        mirrorImage: this.state.type === 'front' ? true : false,
      });


      this.setState({
        uriImage: data.uri,
        imageData: data,
      });
      console.log('takePicture ', data, data.width / data.height);
      openFaceDetectScreen({
        faces: this.state.faces,
        imageUri: data.uri,
        height: data.height,
        width: data.width,
      });
    }
  };

  toggle = (value) => () =>
    this.setState((prevState) => ({[value]: !prevState[value]}));

  facesDetected = ({faces}) => {
    this.setState({faces});
  };

  renderFace = ({bounds, faceID, rollAngle, yawAngle}: any) => (
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
      ]}>
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
      <ContentCamera>
        <RNCamera
          ref={(ref) => {
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
          onFacesDetected={canDetectFaces ? this.facesDetected : null}>
          {!!canDetectFaces && this.renderFaces()}
        </RNCamera>
      </ContentCamera>
    );
  }

  render() {
    return <View style={styles.container}>
      <Header>
        <View
          style={{
            flex: 0.9,
            marginTop: 16,
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>

            {/*<TouchableOpacity*/}
            {/*  style={styles.flipButton}*/}
            {/*  onPress={this.toggleFlash.bind(this)}>*/}
            {/*  <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity*/}
            {/*  style={styles.flipButton}*/}
            {/*  onPress={this.toggleWB.bind(this)}>*/}
            {/*  <Text style={styles.flipText}>*/}
            {/*    {' '}*/}
            {/*    WB: {this.state.whiteBalance}{' '}*/}
            {/*  </Text>*/}
            {/*</TouchableOpacity>*/}
          </View>
        </View>


      </Header>
      {this.renderCamera()}
      <Bottom>
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>
            Zoom: {this.state.zoom}
          </Text>
        )}
        <View
          style={{
            flex: 0.1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {/*<TouchableOpacity*/}
          {/*  style={[styles.flipButton, {flex: 0.1}]}*/}
          {/*  onPress={this.zoomOut.bind(this)}>*/}
          {/*  <Text style={styles.flipText}> - </Text>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            style={{marginRight: 16, marginLeft: 16}}
            onPress={this.takePicture.bind(this)}>
            <Image source={IC_CAMERA}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleFacing.bind(this)}>
            <Text style={styles.flipText}>
              {
                this.state.type === 'front' ? 'Sau' : 'Trước'
              }
            </Text>
          </TouchableOpacity>
          {/*<TouchableOpacity*/}
          {/*  style={[styles.flipButton, {flex: 0.1}]}*/}
          {/*  onPress={this.zoomIn.bind(this)}>*/}
          {/*  <Text style={styles.flipText}> + </Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </Bottom>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flipButton: {
    position: 'absolute',
    right: 20,
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
    minWidth: 80
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
