import FileType from 'file-type/browser';
import {
  HTML_EXTENSION,
  JS_EXTENSION,
  NAIVE_MIMES,
  ZIP_MIMES,
} from '@constants/file';
import { SandboxFileError } from '@enums/sandbox';
import { SandboxFileContent, SandboxFiles } from '@interfaces/sandbox';
import { getFileExtensionByFileName, unzipFile } from '@utils/file';
import {
  SNIPPET_CONTRACT_HTML,
  SNIPPET_RANDOM_HTML,
} from '@constants/snippet-html';
import {
  SNIPPET_CONTRACT_CODE_SELECTOR,
  SNIPPET_RANDOM_CODE_SELECTOR,
} from '@constants/sandbox';
import { minifyFile } from '@services/file';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { utf8ToBase64 } from '@utils/format';

const LOG_PREFIX = 'SandboxUtil';

export const processSandboxZipFile = async (
  file: File
): Promise<SandboxFiles> => {
  const fileType = await FileType.fromBlob(file);

  if (!fileType || !ZIP_MIMES.includes(fileType.mime)) {
    throw Error(SandboxFileError.WRONG_FORMAT);
  }

  let files: Record<string, Blob>;
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

export const readSandboxFileContent = async (
  sandBoxFiles: SandboxFiles
): Promise<SandboxFileContent> => {
  const fileContents: SandboxFileContent = {};

  for (const [fileName, { url }] of Object.entries(sandBoxFiles)) {
    const fileExt = getFileExtensionByFileName(fileName);
    if (fileExt && url) {
      const blob = await fetch(url);
      let fileContent = await blob.text();

      if (fileExt === JS_EXTENSION) {
        let minifiedContent = fileContent;
        try {
          const { files: minifiedFiles } = await minifyFile({
            files: {
              [`${fileName}`]: {
                mediaType: NAIVE_MIMES.js,
                content: utf8ToBase64(fileContent),
              },
            },
          });
          minifiedContent = minifiedFiles[fileName].deflate
            ? minifiedFiles[fileName].deflate
            : minifiedFiles[fileName].content;
        } catch (err: unknown) {
          log(err as Error, LogLevel.Error, LOG_PREFIX);
        }

        fileContent = `<script>${minifiedContent}</script>`;
      }

      if (fileContents[fileExt]) {
        fileContents[fileExt] = [...fileContents[fileExt], fileContent];
      } else {
        fileContents[fileExt] = [fileContent];
      }
    }
  }

  return fileContents;
};

export const detectUsedLibs = async (
  sandBoxFiles: SandboxFiles
): Promise<Array<string>> => {
  const detectedLibs: Array<string> = [];

  for (const [fileName, { url }] of Object.entries(sandBoxFiles)) {
    const fileExt = getFileExtensionByFileName(fileName);
    if (fileExt && url) {
      const blob = await fetch(url);
      const fileContent = await blob.text();

      if (fileExt === HTML_EXTENSION) {
        const commentCodes = fileContent.match(/<!--(?:.|\n|\r)*?-->/g);
        const scriptCode = fileContent.match(
          /<script ([^>]*src="(.*(cdnjs)+.*)")*><\/script>/
        );
        // eslint-disable-next-line no-console
        console.log(commentCodes);
        // eslint-disable-next-line no-console
        console.log(scriptCode);
      }
    }
  }

  return detectedLibs;
};
