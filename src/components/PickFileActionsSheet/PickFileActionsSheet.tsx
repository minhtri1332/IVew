import React, {memo} from 'react';
import {PickFileActionsSheetProps} from './types';
import PickFileContent from './PickFileContent';
import {
  ActionSheetHeader,
  ActionSheetWrapper,
} from '@/components/PickFileActionsSheet/ActionSheet';

const PickFileActionsSheet = memo(
  ({
    isVisible,
    onCloseRequest,
    onFilePicked,
    takeCameraOptions,
    pickImageOptions,
    pickFileOptions,
    title,
    includeTakeCamera = true,
    includePickFile = true,
  }: PickFileActionsSheetProps) => {
    return (
      <ActionSheetWrapper isVisible={isVisible} onCloseRequest={onCloseRequest}>
        <ActionSheetHeader
          title={title || 'Tài liệu'}
          onCloseRequest={onCloseRequest}
        />
        <PickFileContent
          onCloseRequest={onCloseRequest}
          onFilePicked={onFilePicked}
          pickFileOptions={pickFileOptions}
          pickImageOptions={pickImageOptions}
          takeCameraOptions={takeCameraOptions}
          includeTakeCamera={includeTakeCamera}
          includePickFile={includePickFile}
        />
      </ActionSheetWrapper>
    );
  },
);

PickFileActionsSheet.displayName = 'PickFileActionsSheet';

export default PickFileActionsSheet;
