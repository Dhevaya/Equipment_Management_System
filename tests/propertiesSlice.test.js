import { describe, it, expect } from "vitest";
import reducer, { editProperty } from "../src/store/slices/propertiesSlice";

describe("propertiesSlice reducer", () => {
  it("persists effectiveStartDate on editProperty.fulfilled", () => {
    const prevState = {
      items: [
        {
          autoId: 11,
          id: "prop_11",
          description: "Old prop",
          value: 1,
          uom: "unit",
          equipmentClassAutoId: 7,
          effectiveStartDate: "2024-02-01T00:00:00.000Z",
          effectiveEndDate: null,
        },
      ],
      status: "idle",
      error: null,
    };

    const payload = {
      autoId: 11,
      id: "prop_11",
      description: "New prop",
      value: 12,
      uom: "kg",
      equipmentClassAutoId: 7,
      effectiveStartDate: "2026-03-06T11:00:00.000Z",
      effectiveEndDate: "2026-03-30T00:00:00.000Z",
    };

    const action = editProperty.fulfilled(payload, "req-2", payload);
    const nextState = reducer(prevState, action);

    expect(nextState.items[0].description).toBe("New prop");
    expect(nextState.items[0].value).toBe(12);
    expect(nextState.items[0].uom).toBe("kg");
    expect(nextState.items[0].effectiveStartDate).toBe(
      "2026-03-06T11:00:00.000Z"
    );
    expect(nextState.items[0].effectiveEndDate).toBe(
      "2026-03-30T00:00:00.000Z"
    );
  });
});
