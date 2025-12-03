export const BASE_API_URL = "http://localhost:8080/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "dahb4maao";

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
