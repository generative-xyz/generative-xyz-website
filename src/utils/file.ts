import FileType from 'file-type/browser';
import { NAIVE_MIMES } from '@constants/file';
import { unzip } from 'unzipit';

export function getNaiveMimeType(filename: string): string | false {
  const ext = filename.split('.').pop();
  return (ext && NAIVE_MIMES[ext]) || false;
}

export async function unzipFile(file: File): Promise<Record<string, Blob>> {
  const { entries } = await unzip(file);

  const blobs: Record<string, Blob> = {};
  for (const name in entries) {
    let mime = getNaiveMimeType(name);
    if (!mime) {
      const buffer = await entries[name].arrayBuffer();
      const type = await FileType.fromBuffer(buffer);
      if (type) {
        mime = type.mime;
      }
    }
    blobs[name] = await entries[name].blob(mime || undefined);
  }

  return blobs;
}
