import { describe, it, expect } from "vitest";
import reducer, {
  editEquipmentClass,
} from "../src/store/slices/equipmentClassSlice";

describe("equipmentClassSlice reducer", () => {
  it("persists effectiveStartDate on editEquipmentClass.fulfilled", () => {
    const prevState = {
      items: [
        {
          autoId: 7,
          id: "EQUIP007",
          description: "Old description",
          effectiveStartDate: "2024-01-01T00:00:00.000Z",
          effectiveEndDate: null,
          isActive: true,
        },
      ],
      selectedItem: null,
      status: "idle",
      error: null,
    };

    const payload = {
      autoId: 7,
      id: "EQUIP007",
      description: "New description",
      effectiveStartDate: "2026-03-06T10:00:00.000Z",
      effectiveEndDate: "2026-04-01T00:00:00.000Z",
      isActive: false,
    };

    const action = editEquipmentClass.fulfilled(payload, "req-1", payload);
    const nextState = reducer(prevState, action);

    expect(nextState.items[0].description).toBe("New description");
    expect(nextState.items[0].effectiveStartDate).toBe(
      "2026-03-06T10:00:00.000Z"
    );
    expect(nextState.items[0].effectiveEndDate).toBe(
      "2026-04-01T00:00:00.000Z"
    );
    expect(nextState.items[0].isActive).toBe(false);
  });
});
