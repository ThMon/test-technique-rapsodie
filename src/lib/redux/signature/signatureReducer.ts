import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  SignatureQuery,
  CompleteSignatureQuery,
  SignatureState,
} from "../../../types/signature-types";

const initialState: SignatureState = {
  signatures: [],
  slots: {
    slot1: null,
    slot2: [null, null],
    slot3: [null, null, null],
  },
};

export const signatureSlice = createSlice({
  name: "signature",
  initialState,
  reducers: {
    setSignatures: (state, action: PayloadAction<CompleteSignatureQuery[]>) => {
      state.signatures = action.payload;
    },
    createSlots: (state, action: PayloadAction<CompleteSignatureQuery[]>) => {
      const slots = { ...state.slots };

      const slot1 = action.payload.find((signature) => signature.slot === 1);
      if (slot1 === undefined) {
        slots.slot1 = null;
      } else {
        slots.slot1 = slot1;
      }

      const newSlots = action.payload.filter(
        (signature) => signature.slot === 2 || signature.slot === 3
      );
      if (newSlots !== undefined) {
        slots.slot2 = [null, null];
        slots.slot3 = [null, null, null];

        for (const slot of newSlots) {
          if (slot.slotIndex !== null && slot.slot !== null) {
            if (slot.slot === 2) {
              slots.slot2[slot.slotIndex] = slot;
            }
            if (slot.slot === 3) {
              slots.slot3[slot.slotIndex] = slot;
            }
          }
        }
      }

      state.slots = slots;
    },
    changeSlot: (
      state,
      action: PayloadAction<{
        oldSignature_id: number | null;
        newSignature_id: number | null;
        slotNumber: number;
        slotIndex: number;
      }>
    ) => {
      const signatures = [...state.signatures];
      if (action.payload.oldSignature_id !== null) {
        const oldIndex = signatures.findIndex((signature) => {
          return +signature.signature.id === action.payload.oldSignature_id;
        });

        signatures[oldIndex].slot = null;
        signatures[oldIndex].slotIndex = null;
      }

      const newIndex = signatures.findIndex(
        (signature) =>
          +signature.signature.id === action.payload.newSignature_id
      );

      console.log("newIndex", newIndex);

      if (action.payload.newSignature_id !== null) {
        signatures[newIndex].slot = +action.payload.slotNumber;
        signatures[newIndex].slotIndex = +action.payload.slotIndex;
      }

      const slots = { ...state.slots };
      if (action.payload.slotNumber === 1) {
        slots.slot1 = newIndex !== -1 ? signatures[newIndex] : null;
      } else if (action.payload.slotNumber === 2) {
        slots.slot2[action.payload.slotIndex] =
          newIndex !== -1 ? signatures[newIndex] : null;
      } else if (action.payload.slotNumber === 3) {
        slots.slot3[action.payload.slotIndex] =
          newIndex !== -1 ? signatures[newIndex] : null;
      }
      console.log("signature", signatures);
      console.log("slots", slots);
      state.signatures = signatures;
      state.slots = slots;
    },
  },
});

export const { setSignatures, changeSlot, createSlots } =
  signatureSlice.actions;
export const selectSignature = (state: RootState) => state.league;
export default signatureSlice.reducer;
