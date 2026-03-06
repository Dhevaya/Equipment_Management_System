/**
 * Custom Hook: useEquipmentClass
 * Provides equipment class data and actions to components.
 * Abstracts Redux dispatch and selector logic.
 */


import { useSelector, useDispatch } from "react-redux";
import {
  fetchEquipmentClasses,
  addEquipmentClass,
  editEquipmentClass,
  removeEquipmentClass,
  setSelectedEquipmentClass,
} from "../store/slices/equipmentClassSlice";

const useEquipmentClass = () => {
  const dispatch = useDispatch();
  const { items, selectedItem, status, error } = useSelector(
    (state) => state.equipmentClass
  );

  const loadEquipmentClasses = () => dispatch(fetchEquipmentClasses());

  const createEquipmentClass = (data) => dispatch(addEquipmentClass(data));

  const updateEquipmentClass = (data) => dispatch(editEquipmentClass(data));

  const deleteEquipmentClass = (autoId) =>
    dispatch(removeEquipmentClass(autoId));

  const selectEquipmentClass = (item) =>
    dispatch(setSelectedEquipmentClass(item));

  return {
    items,
    selectedItem,
    status,
    error,
    loadEquipmentClasses,
    createEquipmentClass,
    updateEquipmentClass,
    deleteEquipmentClass,
    selectEquipmentClass,
  };
};

export default useEquipmentClass;
