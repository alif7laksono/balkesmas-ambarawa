// app/lib/fileUtils.ts

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

// Validate image file before upload
export const validateImageFile = (
  file: File
): { isValid: boolean; error?: string } => {
  // Check file size (max 1MB)
  if (file.size > 1024 * 1024) {
    return { isValid: false, error: "Ukuran gambar maksimal 1MB" };
  }

  // Check file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Format gambar tidak didukung. Gunakan JPEG, PNG, WebP, atau AVIF",
    };
  }

  return { isValid: true };
};

// Utility functions for client-side file operations
export const uploadImageToS3 = async (
  file: File,
  category: string,
  pathname: string
): Promise<UploadImageResponse> => {
  // Validate file first
  const validation = validateImageFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);
  formData.append("pathname", pathname);

  const response = await fetch("/api/files/images", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
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
    const errorData = await response.json();
    throw new Error(
      errorData.error || `Get image failed: ${response.statusText}`
    );
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
    const errorData = await response.json();
    throw new Error(
      errorData.error || `Delete image failed: ${response.statusText}`
    );
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
    const errorData = await response.json();
    throw new Error(
      errorData.error || `Batch get URLs failed: ${response.statusText}`
    );
  }

  return response.json();
};
