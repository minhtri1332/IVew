import {FileType} from '@base/core/services/File';
import {UploadFileContent} from '@/types';

export const getFileContents = async (files: FileType[]) => {
  const fileContents: UploadFileContent[] = [];
  for (let i = 0; i < files.length; i++) {
    const fileContent = await getFileContent(files[i]);
    if (fileContent) {
      fileContents.push(fileContent);
    }
  }
  return fileContents;
};

export const getFileContent = async (file: FileType) => {
  const fileName = file.name || getFileNameFromPath(file.path || file.uri);
  const isHeicFile = !!file.type && file.type.toLowerCase() === 'image/heic';
  let fileContent: UploadFileContent | undefined;
  if (isHeicFile) {
    return undefined;
    // const { success, path, error } = await RNHeicConverter.convert({
    //   path: file.uri,
    // });
    // if (!error && success && path) {
    //   fileContent = {
    //     uri: path,
    //     name: fileName.endsWith('.HEIC')
    //       ? fileName.split('.HEIC')[0] + '.JPG'
    //       : fileName.split('.heic')[0] + '.jpg',
    //     type: 'imag/jpeg',
    //   };
    // } else {
    //   fileContent = undefined;
    // }
  } else {
    let uri = `${file.uri || file.path}`;
    if (
      !uri.startsWith('content://') &&
      !uri.startsWith('file://') &&
      !uri.startsWith('data:')
    ) {
      uri = `file://${uri}`;
    }
    fileContent = {
      uri,
      name: fileName.endsWith('.HEIC')
        ? fileName.split('.HEIC')[0] + '.JPG'
        : fileName.endsWith('.heic')
        ? fileName.split('.heic')[0] + '.jpg'
        : fileName,
      type: file.type || file.mime,
    };
  }
  return fileContent;
};

export const getFileNameFromPath = (path: string): string => {
  const part = path.split('\\').pop() || '';
  const fileName = part.split('/').pop();
  return fileName || '';
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
