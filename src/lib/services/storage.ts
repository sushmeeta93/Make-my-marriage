export type UploadRequest = {
  key: string;
  contentType: string;
  size: number;
};

export interface FileStorage {
  createUploadUrl(input: UploadRequest): Promise<string>;
  createDownloadUrl(key: string): Promise<string>;
  delete(key: string): Promise<void>;
}

export class FileStorageNotConfigured implements FileStorage {
  async createUploadUrl(): Promise<string> {
    throw new Error("File storage is not configured.");
  }

  async createDownloadUrl(): Promise<string> {
    throw new Error("File storage is not configured.");
  }

  async delete(): Promise<void> {
    throw new Error("File storage is not configured.");
  }
}
