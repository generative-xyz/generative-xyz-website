import FileType from 'file-type/browser';
import { ZIP_MIMES } from '@constants/file';
import { SandboxFileError } from '@enums/sandbox';
import { SandboxFiles } from '@interfaces/sandbox';
import { unzipFile } from '@utils/file';
import {
  SNIPPET_CONTRACT_HTML,
  SNIPPET_RANDOM_HTML,
} from '@constants/snippet-html';
import {
  SNIPPET_CONTRACT_CODE_SELECTOR,
  SNIPPET_RANDOM_CODE_SELECTOR,
} from '@constants/sandbox';

export const processSandboxZipFile = async (
  file: File
): Promise<SandboxFiles> => {
  const fileType = await FileType.fromBlob(file);
  if (!fileType || !ZIP_MIMES.includes(fileType.mime)) {
    throw Error(SandboxFileError.WRONG_FORMAT);
  }

  let files;
  try {
    files = await unzipFile(file);
  } catch (err) {
    throw Error(SandboxFileError.FAILED_UNZIP);
  }

  if (!files['index.html']) {
    throw Error(SandboxFileError.NO_INDEX_HTML);
  }

  const indexContents = await files['index.html'].text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(indexContents, 'text/html');

  const snippetContract = doc.querySelector(SNIPPET_CONTRACT_CODE_SELECTOR);
  if (!snippetContract) {
    throw Error(SandboxFileError.NO_SNIPPET_CONTRACT);
  }
  snippetContract.innerHTML = SNIPPET_CONTRACT_HTML;

  const snippetRandom = doc.querySelector(SNIPPET_RANDOM_CODE_SELECTOR);
  if (!snippetRandom) {
    throw Error(SandboxFileError.NO_SNIPPET_RANDOM);
  }
  snippetRandom.innerHTML = SNIPPET_RANDOM_HTML;

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
