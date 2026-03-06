/**
 * Custom Hook: useProperties
 * Provides property data and CRUD actions for the selected equipment class.
 */

import { useSelector, useDispatch } from "react-redux";
import {
  fetchProperties,
  addProperty,
  editProperty,
  removeProperty,
} from "../store/slices/propertiesSlice";

const useProperties = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.properties);

  const loadProperties = (equipmentClassAutoId) =>
    dispatch(fetchProperties(equipmentClassAutoId));

  const createProperty = (data) => dispatch(addProperty(data));

  const updateProperty = (data) => dispatch(editProperty(data));

  const deletePropertyAction = (autoId) => dispatch(removeProperty(autoId));

  return {
    items,
    status,
    error,
    loadProperties,
    createProperty,
    updateProperty,
    deleteProperty: deletePropertyAction,
  };
};

export default useProperties;
