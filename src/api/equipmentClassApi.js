import axiosInstance from "./axiosInstance";

export const getEquipmentClasses = () => {
  return axiosInstance.get("/posts");
};

export const createEquipmentClass = (data) => {
  return axiosInstance.post("/posts", data);
};

export const updateEquipmentClass = (autoId, data) => {
  return axiosInstance.put(`/posts/${autoId}`, data);
};
