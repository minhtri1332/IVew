import React, { memo } from "react";
import { CssImage } from "@/componens/View/index";
import { IC_USER_Fill } from "@/assets";
import { Colors } from "@/themes/Colors";
import { styled } from "@/global";

interface Props {
  uri?: string;
}

const Avatar = memo(({ uri }: Props) => {
  return (
    <>
      {uri ? (
        <CssImage source={{ uri: uri }} size={70} tintColor={Colors.grey4} />
      ) : (
        <SViewAvatar>
          <CssImage source={IC_USER_Fill} size={40} tintColor={Colors.grey4} />
        </SViewAvatar>
      )}
    </>
  );
});

export default Avatar;

const SViewAvatar = styled.View`
  background-color: ${Colors.grey5};
  width: 70px;
  height: 70px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
