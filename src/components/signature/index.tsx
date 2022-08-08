import React, { ReactElement, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../lib/redux/hook";
import { CompleteSignatureQuery } from "../../types/signature-types";
import Slot from "./slot";
import { createSlots } from "../../lib/redux/signature/signatureReducer";

const Signature = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { signatures, slots } = useAppSelector((state) => state.signature);
  const { selectedLabel } = useAppSelector((state) => state.label);
  const [signatureByLabel, setSignaturesByLabel] = useState<
    CompleteSignatureQuery[]
  >([]);

  useEffect(() => {
    if (selectedLabel !== null) {
      setSignaturesByLabel(
        signatures.filter(
          (signature) => +signature.signature.label_id === +selectedLabel.id
        )
      );
    }
  }, [selectedLabel, signatures]);

  useEffect(() => {
    dispatch(createSlots(signatureByLabel));
  }, [signatureByLabel]);

  return (
    <>
      <h1>Signatures</h1>
      <h2>Chanteurs actifs</h2>
      <h3>Tier type 1</h3>
      <Slot
        slotNumber={1}
        slotIndex={0}
        selectedSignature={slots.slot1}
        otherSignatures={
          slots.slot1 === null
            ? signatureByLabel
            : signatureByLabel.filter(
                (signature) =>
                  signature.signature.id !== slots.slot1?.signature.id &&
                  signature.slot !== 1
              )
        }
      />
      <div>
        <h3>Tier type 2</h3>
        {slots.slot2.map((slot, index) => {
          return (
            <div key={index}>
              <Slot
                key={index}
                slotNumber={2}
                slotIndex={index}
                selectedSignature={slot}
                otherSignatures={
                  slot === null
                    ? signatureByLabel.filter((signature) => {
                        return signature.slot !== 2;
                      })
                    : signatureByLabel.filter((signature) => {
                        return (
                          signature.signature.id !== slot?.signature.id &&
                          signature.slot !== 2
                        );
                      })
                }
              />
            </div>
          );
        })}
      </div>
      <div>
        <h3>Tier type 3</h3>
        {slots.slot3.map((slot, index) => {
          return (
            <div key={index}>
              <Slot
                slotNumber={3}
                slotIndex={index}
                selectedSignature={slot}
                otherSignatures={
                  slot === null
                    ? signatureByLabel
                    : signatureByLabel.filter(
                        (signature) =>
                          signature.signature.id !== slot?.signature.id ||
                          signature.slot !== 3
                      )
                }
              />
            </div>
          );
        })}
      </div>
      <h2>Chanteurs inactifs</h2>
      {signatureByLabel.map((signature) => {
        if (signature.slot === null) {
          return <p key={signature.signature.id}>{signature.artist.name}</p>;
        }
      })}
    </>
  );
};

export default Signature;
