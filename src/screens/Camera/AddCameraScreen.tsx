import React, {memo, useCallback, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {BaseStyles} from '@/themes/BaseStyles';
import {HeaderBack} from "@/components/HeaderBack";
import {InputBorder} from "@/components/InputBorder";
import {SelectModalBottom} from '@/components/BottomMenu/SelectModalBottom';
import {generateNumber} from "@/utils/constants";

const Container = styled.View`
    flex: 1;
    background-color: ${Colors.white};
`;
const ContentContainer = styled.ScrollView`
    flex: 1;
    background-color: ${Colors.white};
    padding: 0 16px
`;

const BtnCreate = styled.TouchableOpacity`
  height: 44px;
  background-color: ${Colors.backgroundColor};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 12px;
  margin-bottom: 50px;
`;

const BtnCreateText = styled.Text`
  color:${Colors.white};
  font-size: 16px;
  font-weight: bold;

`;
const SInputBorder = styled(InputBorder).attrs({
    containerStyle: {
        marginTop: 12,
    },
})``;



const CameraLocationData = [
    {
        value: 'hanh_lang',
        label: 'hành lang'
    }
];

export const AddCameraScreen = memo(function HomeScreen() {
    const [params, setParams] = useState({
        name: '', //0979294748
        camera_location: '', // hành lang
        camera_url: '', // rtsp://x.x.x.x:port/
        falling_threshold: '95',
        fighting_threshold: '95',
        staggering_threshold: '95',
        falling_sensitive: '7',
        fighting_sensitive: '4',
        staggering_sensitive: '2',
        stay_mode: '1',
        stay_interval: '60',
        use_warning_area: true,

    });
    const onTextChange = useCallback(
        (keyname: string, value: string) => {
            setParams({
                ...params,
                [keyname]: value,
            });
        },
        [params],
    );

    const onSelectOption = useCallback((inputName: string, value: any) => {
        setParams({
            ...params,
            [inputName]: value,
        });
    }, [params]);

    const fallingThreshold = useMemo(() => {
        return generateNumber(50, 100)
    }, []);

    const fighting_threshold = useMemo(() => {
        return generateNumber(50, 100)
    }, []);

    const staggering_threshold = useMemo(() => {
        return generateNumber(50, 100)
    }, []);

    const falling_sensitive = useMemo(() => {
        return generateNumber(1, 10)
    }, []);

    const fighting_sensitive = useMemo(() => {
        return generateNumber(1, 10)
    }, []);

    const staggering_sensitive = useMemo(() => {
        return generateNumber(1, 10)
    }, []);

    const stay_interval = useMemo(() => {
        return generateNumber(30, 60)
    }, []);


    return (
        <Container>
            <HeaderBack title={'Thêm mới camera'} />
            <ContentContainer>
                <SInputBorder
                    value={params.name}
                    keyName={'name'}
                    onTextChange={onTextChange}
                    placeHolder={'Nhập vào tên camera'}
                />
                <SInputBorder
                    value={params.name}
                    keyName={'client_id'}
                    onTextChange={onTextChange}
                    placeHolder={'ID khách hàng'}
                />
                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Chọn vị trí"
                    options={CameraLocationData}
                    selectedValue={params.camera_location}
                    inputName={'camera_location'}
                    onSelectOption={onSelectOption}
                    placeholder={'Chọn vị trí'}
                />
                <SInputBorder
                    value={params.name}
                    keyName={'camera_url'}
                    onTextChange={onTextChange}
                    placeHolder={'Địa chỉ RTSP: rtsp://x.x.x.x:port/'}
                />
                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Ngưỡng cảnh báo bị ngã"
                    options={fallingThreshold}
                    selectedValue={params.falling_threshold}
                    inputName={'falling_threshold'}
                    onSelectOption={onSelectOption}
                    placeholder={'Ngưỡng cảnh báo bị ngã'}
                />
                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Ngưỡng cảnh báo đánh nhau"
                    options={fighting_threshold}
                    selectedValue={params.fighting_threshold}
                    inputName={'fighting_threshold'}
                    onSelectOption={onSelectOption}
                    placeholder={'Ngưỡng cảnh báo đánh nhau'}
                />
                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Ngưỡng cảnh báo say rượu"
                    options={staggering_threshold}
                    selectedValue={params.staggering_threshold}
                    inputName={'staggering_threshold'}
                    onSelectOption={onSelectOption}
                    placeholder={'Ngưỡng cảnh báo say rượu'}
                />
                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Độ nhạy hành động ngã"
                    options={falling_sensitive}
                    selectedValue={params.falling_sensitive}
                    inputName={'falling_sensitive'}
                    onSelectOption={onSelectOption}
                    placeholder={'Độ nhạy hành động ngã'}
                />
                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Độ nhạy hành động đánh nhau"
                    options={fighting_sensitive}
                    selectedValue={params.fighting_sensitive}
                    inputName={'fighting_sensitive'}
                    onSelectOption={onSelectOption}
                    placeholder={'Độ nhạy hành động đánh nhau'}
                />
                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Độ nhạy hành động say rượu"
                    options={staggering_sensitive}
                    selectedValue={params.staggering_sensitive}
                    inputName={'staggering_sensitive'}
                    onSelectOption={onSelectOption}
                    placeholder={'Độ nhạy hành động say rượu'}
                />
                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Cảnh báo khi lảng vảng tại chỗ"
                    options={[
                        {
                            label: 'Bật',
                            value: '1'
                        },
                        {
                            label: 'Tắt',
                            value: '0'
                        },
                    ]}
                    selectedValue={params.stay_mode}
                    inputName={'stay_mode'}
                    onSelectOption={onSelectOption}
                    placeholder={'Cảnh báo khi lảng vảng tại chỗ'}
                />
                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Thời gian lảng vảng tại chỗ (s)"
                    options={stay_interval}
                    selectedValue={params.stay_interval}
                    inputName={'stay_interval'}
                    onSelectOption={onSelectOption}
                    placeholder={'Thời gian lảng vảng tại chỗ (s)'}
                />

                <SelectModalBottom
                    containerStyle={BaseStyles.mt12}
                    label="Cảnh báo khi vào vùng cấm"
                    options={[
                        {
                            label: 'Bật',
                            value: true
                        },
                        {
                            label: 'Tắt',
                            value: false
                        },
                    ]}
                    selectedValue={params.use_warning_area}
                    inputName={'use_warning_area'}
                    onSelectOption={onSelectOption}
                    placeholder={'Cảnh báo khi vào vùng cấm'}
                />
                <BtnCreate>
                    <BtnCreateText>
                        Tạo mới
                    </BtnCreateText>
                </BtnCreate>
            </ContentContainer>

        </Container>
    );
});
