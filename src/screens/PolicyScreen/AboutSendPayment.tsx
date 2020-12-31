import React, {memo, useEffect} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {requestGetInfo} from '@/store/constant/functions';
import {HeaderBack} from '@/components/HeaderBack';
import WebView from 'react-native-webview';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {useNavigationParams} from "@/hooks/useNavigationParams";
import {moneyFormat} from "@/utils/string";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 0 16px
`;

const Title = styled.Text`
  font-size: 20px;
  margin-top: 12px;
  color: ${Colors.red1};
`;

export interface AboutSendPaymentProps {
    code: string,
    price: number
}

export const AboutSendPayment = memo(function AboutSendPayment() {
    const {code, price} = useNavigationParams<AboutSendPaymentProps>();

    const [{value}, getData] = useAsyncFn(async () => {
        return await requestGetInfo({key: 'payment'});
    }, []);

    useEffect(() => {
        getData().then();
    }, []);

    return (
        <Container>
            <HeaderBack title={'Nội dung chuyển khoản'}/>
            <ContentContainer>
                <Title>
                    Nội dung chuyển khoản: {code}
                </Title>
                <Title>
                    Số tiền: {moneyFormat(price)} VND
                </Title>
                <WebView
                    containerStyle={{
                        flex: 1,
                        paddingTop: 16
                    }}
                    style={{
                        flex: 1,
                        paddingTop: 16
                    }}
                    scrollEnabled={false}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    scalesPageToFit={false}
                    injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0.5'); meta.setAttribute('name', 'viewport');meta.setAttribute('charset', 'utf-8'); document.getElementsByTagName('head')[0].appendChild(meta);`}
                    source={{
                        html: `<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" charset="utf-8">
<style>
img{display: inline; min-height: 60vw; height: auto; max-width: 100%;}
</style></head>
<style>img{display: inline; min-height: 60vw; height: auto; border-radius: 8px; max-width: 100%;} body{font-family: Roboto-Regular, sans-serif;}</style> ${
                            value || ''
                        }`,
                    }}
                />
            </ContentContainer>
        </Container>
    );
});
