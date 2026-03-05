import { useSelector, useDispatch } from "react-redux";
import {
  fetchProperties,
  addProperty,
  editProperty,
} from "../store/slices/propertiesSlice";

const useProperties = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.properties);

  const loadProperties = (equipmentClassAutoId) =>
    dispatch(fetchProperties(equipmentClassAutoId));

  const createProperty = (data) => dispatch(addProperty(data));

  const updateProperty = (data) => dispatch(editProperty(data));

  return {
    items,
    status,
    error,
    loadProperties,
    createProperty,
    updateProperty,
  };
};

export default useProperties;
