import axiosInstance from "./axiosInstance";

export const getProperties = (equipmentClassAutoId) => {
  return axiosInstance.get(`/comments?postId=${equipmentClassAutoId}`);
};

export const createProperty = (data) => {
  return axiosInstance.post("/comments", data);
};

export const updateProperty = (autoId, data) => {
  return axiosInstance.put(`/comments/${autoId}`, data);
};
