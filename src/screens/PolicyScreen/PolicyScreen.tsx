import React, {memo, useEffect} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {requestGetInfo} from '@/store/constant/functions';
import {HeaderBack} from '@/components/HeaderBack';
import WebView from 'react-native-webview';
import {useAsyncFn} from '@/hooks/useAsyncFn';

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

export const PolicyScreen = memo(function HomeScreen() {
  const [{value, loading, error}, getData] = useAsyncFn(async () => {
    return await requestGetInfo({key: 'about'});
  }, []);

  useEffect(() => {
    getData().then();
  }, []);

  return (
    <Container>
      <HeaderBack title={'Thông tin ngân hàng'} />
      <WebView
        containerStyle={{
          flex: 1,
        }}
        style={{
          flex: 1,
        }}
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
    </Container>
  );
});
