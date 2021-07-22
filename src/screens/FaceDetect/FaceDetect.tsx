import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  InteractionManager,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {HeaderBack} from '@/components/HeaderBack';
import {styled} from '@/global';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import ImageEditor from '@react-native-community/image-editor';
import {IC_CAMERA_EDIT, IC_DETECT_FACE} from '@/assets';
import {
  goBack,
  navigateToFaceDetectScreen,
  openModalCreateDepartment,
} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import useBoolean from '@/hooks/useBoolean';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import RNFetchBlob from 'rn-fetch-blob';
import {requestAddEmployee} from '@/store/faceDetect/function';
import ToastService from '@/services/ToastService';
import {ItemFace} from '@/screens/FaceDetect/ItemFace';
import {InputBorder} from '@/components/ViewBorder/InputBorder';
import ButtonText from '@/components/button/ButtonText';
import {SelectModalBottom} from '@/components/ViewBorder/SelectModalBottom';
import {FilterBoxOption} from '@/components/Filter/types';
import {getDepartment, useDepartmentByQuery} from '@/store/department';
import {getGroup, useGroupByQuery} from '@/store/group';
import useAutoToastError from '@/hooks/useAutoToastError';
import ImageResizer from 'react-native-image-resizer';
import {CheckBoxBorder} from '@/components/ViewBorder/CheckboxBorder';

import PickFileActionsSheet from '@/components/PickFileActionsSheet';
import {FileType} from '@/types';

const {width: DWidth, height: DHeight} = Dimensions.get('window');

const CameraWidth = DWidth;
const CameraHeight = (4 / 3) * DWidth;

export interface FaceDetectScreenProps {
  faces?: any[];
  imageUri?: string;
  width?: number;
  height?: number;
}

export interface ParamEmployee {
  department: string;
  name: string;
  position: string;
  listGroup: string[];
  email: string;
  address: string;
  birthDate: string;
  identificationCard: string;
  phoneNumber: string;
  employeeID: string;
  taxID: string;
  dayComeIn: string;
  image: string;
}

export const FaceDetectScreen = memo(function FaceDetectScreen() {
  const {faces, imageUri, height, width} =
    useNavigationParams<FaceDetectScreenProps>();
  const [imageShow, setImageShow] = useState(imageUri);
  const [myFace, setMyFace] = useState('');
  const [isFilePickerVisible, showFilePicker, hideFilePicker] = useBoolean();
  const departments = useDepartmentByQuery('all');
  const groups = useGroupByQuery('all');
  const [isLoading, loadingTrue, loadingFalse] = useBoolean();
  const [listFaceDetect, setListFaceDetect] = useState<Set<string>>(() => {
    return new Set([]);
  });

  const [paramEmployee, setParamEmployee] = useState<ParamEmployee>(() => ({
    name: 'Trần Minh Hoàng',
    department: 'BOD',
    position: 'dev',
    listGroup: [''],
    birthDate: '01/09/1997',
    email: 'tranhoang@gmail.com',
    address: 'Hà Nội',
    identificationCard: '124234234213124',
    phoneNumber: '0123456789',
    employeeID: '2435436456',
    taxID: '213214234',
    dayComeIn: '01/09/1997',
    image: '',
  }));

  const [listGroup, setListGroup] = useState<Set<string>>(() => {
    return new Set([]);
  });

  const setParamCustom = (name: string, value: any) => {
    setParamEmployee((state) => ({...state, [name]: value}));
  };

  const setParamGroup = useCallback((name: string, value: any) => {
    setListGroup((set) => {
      const newSet = new Set(set);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return newSet;
    });
  }, []);

  useEffect(() => {
    setParamCustom('listGroup', [...listGroup]);
  }, [listGroup]);

  useEffect(() => {
    setListFaceDetect(() => {
      return new Set([]);
    });

    if (imageUri) {
      ImageResizer.createResizedImage(imageUri, 400, 400, 'JPEG', 10, 0)
        .then((response) => {
          setImageShow(response.uri);
          RNFetchBlob.fs.readFile(response.uri, 'base64').then((data) => {
            setParamCustom('image', data);
          });
          cropImageFace(faces, response.uri, response.width, response.height);
        })
        .catch((err) => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
        });
    }
  }, [faces, imageUri, height, width]);

  const cropImageFace = useCallback((faces, imageUri, width, height) => {
    imageUri &&
      faces.map((item: any, index: number) => {
        const ratioWidth = item.bounds.size.width / CameraWidth;
        const ratioHeight = item.bounds.size.height / CameraHeight;
        const offsetX = item.bounds.origin.x / CameraWidth;
        const offsetY = item.bounds.origin.y / CameraHeight;

        const OX = offsetX * width > 0 ? offsetX * width : 0;
        const OY = offsetY * height > 0 ? offsetY * height : 0;

        const SW = ratioWidth * width > 0 ? ratioWidth * width : 0;
        const SY = ratioHeight * height > 0 ? ratioHeight * height : 0;

        const cropData = {
          offset: {x: OX, y: OY},
          size: {width: SW, height: SY},
          resizeMode: 'cover',
        };

        // @ts-ignore
        ImageEditor.cropImage(imageUri, cropData).then((url) => {
          setListFaceDetect((set) => {
            const newSet = new Set(set);
            newSet.has(url) ? newSet.delete(url) : newSet.add(url);
            return newSet;
          });
          RNFetchBlob.fs.readFile(url, 'base64').then((data) => {
            //setParamCustom('avatar', data);
            setMyFace(url);
          });
        });
      });
  }, []);

  const [{loading, error}, requestData] = useAsyncFn(async () => {
    let result = true;
    console.log(paramEmployee);
    Object.values(paramEmployee).map((item) => {
      if (item == '' || item == []) {
        ToastService.show('Bạn cần điền đầy đủ thông tin');
        result = false;
      }
    });
    if (result) {
      const data = await requestAddEmployee(paramEmployee);
      if (data) {
        ToastService.show('Success!');
        goBack();
      }
    }
  }, [paramEmployee]);

  const onPressImage = useCallback(
    (value: string) => {
      setMyFace(value);
      RNFetchBlob.fs.readFile(value, 'base64').then((data) => {
        setParamCustom('avatar', data);
      });
    },
    [setParamCustom],
  );

  const rightHeader = useMemo(() => {
    return (
      <ButtonText
        color={Colors.white}
        title={'Lưu'}
        onPress={requestData}
        loading={loading}
      />
    );
  }, [loading, paramEmployee]);

  const getListDepartment = useMemo(() => {
    let listFilterModel: FilterBoxOption[] = [];
    departments.map((item) => {
      const department = getDepartment(item);
      listFilterModel.push({
        label: department?.name || '',
        value: department?.name,
      });
    });
    return listFilterModel;
  }, [departments]);

  const getListGroup = useMemo(() => {
    let listFilterModel: FilterBoxOption[] = [];
    groups.map((item) => {
      const Group = getGroup(item);
      listFilterModel.push({
        label: Group?.name || '',
        value: Group?.name,
      });
    });
    return listFilterModel;
  }, [groups]);

  const navigateToCamera = useCallback(() => {
    hideFilePicker();
    InteractionManager.runAfterInteractions(() => {
      navigateToFaceDetectScreen();
    });
  }, []);

  const takePicture = useCallback(() => {
    showFilePicker();
  }, []);

  const fileCallback = useCallback((files: FileType[]) => {
    setListFaceDetect(() => {
      return new Set([]);
    });

    ImageResizer.createResizedImage(files[0].uri, 400, 400, 'JPEG', 10, 0)
      .then((response) => {
        RNFetchBlob.fs.readFile(response.uri, 'base64').then((data) => {
          setParamCustom('image', data);

          setListFaceDetect((set) => {
            const newSet = new Set(set);
            newSet.add(response.uri);
            return newSet;
          });
          setImageShow(response.uri);
        });
      })
      .catch((err) => {
        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
      });

    hideFilePicker();
  }, []);

  useAutoToastError(error);

  return (
    <View style={styles.container}>
      <HeaderBack title={'Thêm nhân viên'} right={rightHeader} />
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 24}}>
        <SViewImage onPress={takePicture}>
          <SImage
            source={imageShow ? {uri: imageShow} : IC_DETECT_FACE}
            resizeMode={'cover'}
          />
          <Image
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              bottom: 16,
              borderWidth: 1,
              opacity: 0.4,
            }}
            source={IC_CAMERA_EDIT}
          />
        </SViewImage>

        {!isLoading && (
          <SScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {[...listFaceDetect].map((item) => {
              return (
                <ItemFace
                  uri={item}
                  onPress={onPressImage}
                  isCheck={myFace == item}
                />
              );
            })}
          </SScrollView>
        )}

        {isLoading && (
          <ActivityIndicator
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
              paddingBottom: 20,
            }}
            color={'red'}
            size={'large'}
          />
        )}

        <SInputBorder
          value={paramEmployee.name}
          keyName={'name'}
          onTextChange={setParamCustom}
          placeHolder={'Họ tên'}
          required={true}
        />

        <SInputBorder
          value={paramEmployee.position}
          keyName={'position'}
          onTextChange={setParamCustom}
          placeHolder={'Vị trí'}
          required={false}
        />

        <SSelectModalBottom
          label={'Phòng ban'}
          options={getListDepartment}
          inputName={'department'}
          placeholder={'Lựa chọn'}
          selectedValue={paramEmployee.department}
          onSelectOption={setParamCustom}
          onPressRight={openModalCreateDepartment}
          required={true}
        />

        <SCheckBoxBorder
          placeholder={'Lựa chọn'}
          label={'Cơ sở'}
          options={getListGroup}
          selectedValue={paramEmployee.listGroup}
          inputName={'listGroup'}
          onSelectOption={setParamGroup}
          multiple={true}
          required={true}
        />
        <SInputBorder
          value={paramEmployee.phoneNumber}
          keyName={'phoneNumber'}
          onTextChange={setParamCustom}
          placeHolder={'Số điện thoại'}
          required={false}
        />
        <SInputBorder
          value={paramEmployee.email}
          keyName={'email'}
          onTextChange={setParamCustom}
          placeHolder={'Email'}
          required={false}
        />
        <SInputBorder
          value={paramEmployee.address}
          keyName={'address'}
          onTextChange={setParamCustom}
          placeHolder={'Địa chỉ'}
          required={false}
        />
        <SInputBorder
          value={paramEmployee.birthDate}
          keyName={'birthDate'}
          onTextChange={setParamCustom}
          placeHolder={'Sinh nhật'}
          required={false}
        />
        <SInputBorder
          value={paramEmployee.identificationCard}
          keyName={'identificationCard'}
          onTextChange={setParamCustom}
          placeHolder={'CMND/Căn cước'}
          required={false}
        />
        <SInputBorder
          value={paramEmployee.employeeID}
          keyName={'employeeID'}
          onTextChange={setParamCustom}
          placeHolder={'EmployeeID'}
          required={false}
        />
        <SInputBorder
          value={paramEmployee.taxID}
          keyName={'taxID'}
          onTextChange={setParamCustom}
          placeHolder={'Thuế'}
          required={false}
        />
        <SInputBorder
          value={paramEmployee.dayComeIn}
          keyName={'dayComeIn'}
          onTextChange={setParamCustom}
          placeHolder={'Ngày tạo'}
          required={false}
        />
      </ScrollView>

      <PickFileActionsSheet
        isVisible={isFilePickerVisible}
        onCloseRequest={hideFilePicker}
        onFilePicked={fileCallback}
        pickFileOptions={{multiple: false}}
        pickImageOptions={{multiple: false}}
        onPressDetect={navigateToCamera}
        includeTakeCamera={true}
      />
    </View>
  );
});

const SInputBorder = styled(InputBorder).attrs({
  containerStyle: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
})``;

const SSelectModalBottom = styled(SelectModalBottom).attrs({
  containerStyle: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
})``;

const SCheckBoxBorder = styled(CheckBoxBorder).attrs({
  containerStyle: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
})``;

const SViewImage = styled.TouchableOpacity`
  padding-bottom: 16px;
  padding-top: 16px;
  align-self: center;
  justify-content: center;
`;

const SImage = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 4px;
  border-color: ${Colors.grey5};
  border-width: 1px;
`;
const SScrollView = styled.ScrollView`
  width: 100%;
  padding: 0px 16px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
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
});
