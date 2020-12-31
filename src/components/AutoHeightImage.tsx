import React, {memo, useEffect, useState} from 'react';
import {Dimensions, Image, ImageProps} from "react-native";
import styled from "styled-components/native";
import FastImage, {FastImageProps} from "react-native-fast-image";

const DWidth = Dimensions.get("window").width;

const BgImage = styled(FastImage)<{ width: number, height: number }>`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  background-color: red;
`;


interface Props extends FastImageProps {

}

export const AutoHeightImage = memo((props: Props) => {
    const {source} = props;
    const [wh, setWH] = useState({width: DWidth, height: 0});

    useEffect(() => {
        if (typeof source === 'object' && source.uri) {
            Image.getSize(source.uri || '',
                (w, h) => {
                    const _ratio = h / w;
                    setWH({
                        width: DWidth,
                        height: DWidth * _ratio
                    })
                },
                () => {
                },
            );
        }
    }, []);

    return (
        <BgImage width={wh.width}
                 height={wh.height}
                 resizeMode={"contain"}
                 {...props}/>
    )
});
