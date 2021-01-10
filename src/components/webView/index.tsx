import React, {memo, useCallback, useMemo, useRef} from 'react';

import RNWebview, {WebViewNavigation} from 'react-native-webview';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {styled} from '@/global';
import {goBack} from '@/utils/navigation';
import {View} from 'react-native';

export interface WebViewProps {
  url: string;
  title?: string;
}

export const WebviewComponent = memo(function WebviewComponent(
  props: WebViewProps,
) {
  const webviewRef = useRef<RNWebview>(null);

  const propsWeb = useMemo((): WebViewProps => {
    return {
      source: {uri: props.url},
      injectedJavaScript: `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `,
      scalesPageToFit: false,
      javaScriptEnabled: true,
      cacheEnabled: true,
      geolocationEnabled: true,
      domStorageEnabled: true,
      scrollEnabled: true,
    };
  }, [props.url]);

  return <RNWebview ref={webviewRef} {...propsWeb} />;
});
export default WebviewComponent;
