export interface UploadImageResponse {
  message: string;
  key: string;
  url: string;
}

export interface GetImageResponse {
  message: string;
  url: string;
}

export interface DeleteImageResponse {
  message: string;
}

export interface BatchimageKeysResponse {
  urls: Array<{
    key: string;
    url: string;
  }>;
}

// Utility functions for client-side file operations
export const uploadImageToS3 = async (
  file: File,
  category: string,
  pathname: string
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);
  formData.append("pathname", pathname);

  const response = await fetch("/api/files/images", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response.json();
};

export const getimageKey = async (
  category: string,
  pathname: string,
  imgname: string
): Promise<GetImageResponse> => {
  const response = await fetch(
    `/api/files/images?category=${category}&pathname=${pathname}&imgname=${imgname}`
  );

  if (!response.ok) {
    throw new Error(`Get image failed: ${response.statusText}`);
  }

  return response.json();
};

export const deleteImageFromS3 = async (
  category: string,
  pathname: string,
  imgname: string
): Promise<DeleteImageResponse> => {
  const response = await fetch(
    `/api/files/images?category=${category}&pathname=${pathname}&imgname=${imgname}`,
    { method: "DELETE" }
  );

  if (!response.ok) {
    throw new Error(`Delete image failed: ${response.statusText}`);
  }

  return response.json();
};

export const getBatchimageKeys = async (
  keys: string[]
): Promise<BatchimageKeysResponse> => {
  const response = await fetch("/api/files/images/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keys }),
  });

  if (!response.ok) {
    throw new Error(`Batch get URLs failed: ${response.statusText}`);
  }

  return response.json();
};
