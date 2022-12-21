import { ZIP_MIMES } from '@constants/file';
import { SandboxFileError } from '@enums/sandbox';
import { unzipFile } from '@utils/file';
import FileType from 'file-type/browser';

export const processScriptFiles = async (file: File): Promise<string[]> => {
  const fileType = await FileType.fromBlob(file);

  if (!fileType || !ZIP_MIMES.includes(fileType.mime)) {
    throw Error(SandboxFileError.WRONG_FORMAT);
  }

  const jsExtension = '.js';
  const cssExtension = '.css';
  const htmlExtension = '.html';

  let files: Record<string, Blob>;

  try {
    files = await unzipFile(file);
  } catch (err) {
    throw Error(SandboxFileError.FAILED_UNZIP);
  }

  if (!files['index.html']) {
    throw Error(SandboxFileError.NO_INDEX_HTML);
  }

  const fileLists = Object.keys(files);

  const jsFile = fileLists.filter(function (file) {
    return file.indexOf(jsExtension) !== -1;
  });
  const cssFile = fileLists.filter(function (file) {
    return file.indexOf(cssExtension) !== -1;
  });
  const htmlFile = fileLists.filter(function (file) {
    return file.indexOf(htmlExtension) !== -1;
  });

  const scriptFiles = [...htmlFile, ...cssFile, ...jsFile];
  const scriptStringFiles: string[] = [];

  Promise.all(
    scriptFiles.map(async file => {
      const content = await files[file].text();
      return content;
    })
  ).then(res => scriptStringFiles.push(...res));

  return scriptStringFiles;
};
