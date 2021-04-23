import {Image as ImagePickerImage} from "react-native-image-crop-picker";
import {DocumentPickerResponse} from "react-native-document-picker";
import {PickFileOptions, PickImageOptions, TakeCameraOptions} from "@/utils/file";

export type FileType = Partial<Omit<ImagePickerImage, 'size'>> & DocumentPickerResponse;

export interface PickFileActionsSheetProps extends PickFileContentProps {
    isVisible: boolean
}

export interface PickFileContentProps {
    title?: string,
    onCloseRequest: () => any,
    onFilePicked: (files: FileType[]) => any,
    takeCameraOptions?: TakeCameraOptions,
    pickImageOptions?: PickImageOptions,
    pickFileOptions?: PickFileOptions,
    includeTakeCamera?: boolean,
    includePickFile?: boolean
}
