import FileType from 'file-type/browser';
import { ZIP_MIMES } from '@constants/file';
import { SandboxFileError } from '@enums/sandbox';
import { SandboxFiles } from '@interfaces/sandbox';
import { unzipFile } from '@utils/file';
import { SNIPPET_HTML } from '@constants/snippet-html';

export const processSandboxZipFile = async (
  file: File
): Promise<SandboxFiles> => {
  const fileType = await FileType.fromBlob(file);
  if (!fileType || !ZIP_MIMES.includes(fileType.mime)) {
    throw SandboxFileError.WRONG_FORMAT;
  }

  let files;
  try {
    files = await unzipFile(file);
  } catch (err) {
    throw SandboxFileError.FAILED_UNZIP;
  }

  if (!files['index.html']) {
    throw SandboxFileError.NO_INDEX_HTML;
  }

  const indexContents = await files['index.html'].text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(indexContents, 'text/html');

  const snippet = doc.querySelector('#fxhash-snippet');
  if (!snippet) {
    throw SandboxFileError.NO_SNIPPET;
  }

  snippet.innerHTML = SNIPPET_HTML;
  const newIndexContents = doc.documentElement.outerHTML;
  files['index.html'] = new Blob([newIndexContents], { type: 'text/html' });

  const record: SandboxFiles = {};
  for (const name in files) {
    if (name.slice(-4) === '.svg') {
      files[name] = files[name].slice(0, files[name].size, 'image/svg+xml');
    }
    record[name] = {
      url: URL.createObjectURL(files[name]),
    };
    if (name === 'index.html') {
      record[name].blob = files[name];
    }
  }

  return record;
};
