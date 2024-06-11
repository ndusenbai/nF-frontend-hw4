import axiosUploadApi from "./api/base.upload";


async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosUploadApi.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('File uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}
