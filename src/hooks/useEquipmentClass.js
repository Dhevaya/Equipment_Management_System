import { useSelector, useDispatch } from "react-redux";
import {
  fetchEquipmentClasses,
  addEquipmentClass,
  editEquipmentClass,
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
    selectEquipmentClass,
  };
};

export default useEquipmentClass;
