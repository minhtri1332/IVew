import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Colors} from '@/themes/Colors';
import {IC_BACK, IC_CAMERA} from '@/assets';
import {goBack, openFaceDetectScreen} from '@/utils/navigation';
import {styled} from '@/global';

const {width: DWidth, height: DHeight} = Dimensions.get('window');

const CameraWidth = DWidth;
const CameraHeight = (4 / 3) * DWidth;

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
    type: 'back',
    whiteBalance: 'auto',
    ratio: '4:3',
    canDetectFaces: true,
    faces: [],
    loadingTakePicture: false,
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
    this.setState({
      loadingTakePicture: true,
    });
    if (this.camera) {
      const data = await this.camera.takePictureAsync({
        fixOrientation: this.state.type === 'front' ? true : false,
        mirrorImage: this.state.type === 'front' ? true : false,
      });

      this.setState({
        loadingTakePicture: false,
      });
      openFaceDetectScreen({
        faces: this.state.faces,
        imageUri: data.uri,
        height: data.height,
        width: data.width,
      });
    }
  };

  toggle = (value: any) => () =>
    this.setState((prevState) => ({[value]: !prevState[value]}));

  facesDetected = ({faces}: any) => {
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
      {this.state.loadingTakePicture && (
        <Text style={styles.faceText}>Đang định dạng...</Text>
      )}
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
    return (
      <View style={styles.container}>
        <Header>
          <TouchableOpacity onPress={goBack}>
            <Image style={{margin: 16}} source={IC_BACK} />
          </TouchableOpacity>
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
            <TouchableOpacity
              disabled={this.state.loadingTakePicture}
              style={{position: 'absolute', marginRight: 16, marginLeft: 16}}
              onPress={this.takePicture.bind(this)}>
              <Image source={IC_CAMERA} />
              {this.state.loadingTakePicture && (
                <ActivityIndicator
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: 12,
                  }}
                  color={Colors.white}
                  size={'large'}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.flipButton}
              onPress={this.toggleFacing.bind(this)}>
              <Text style={styles.flipText}>
                {this.state.type === 'front' ? 'Trước' : 'Sau'}
              </Text>
            </TouchableOpacity>
          </View>
        </Bottom>
      </View>
    );
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
    minWidth: 80,
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
