import React, { ReactElement, useState } from "react";
import { CompleteSignatureQuery } from "../../types/signature-types";
import { useAppDispatch } from "../../lib/redux/hook";
import { changeSlot } from "../../lib/redux/signature/signatureReducer";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RemoveBlock = styled.div`
  width: 100px;
  padding: 0 10px;
`;

const RemoveButton = styled.div`
  border: 1px solid red;
  color: red;
  cursor: pointer;
`;

const ArtistName = styled.h4`
  font-size: 1.3em;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Slot = ({
  slotNumber,
  slotIndex,
  selectedSignature,
  otherSignatures,
}: {
  slotNumber: number;
  slotIndex: number;
  selectedSignature: CompleteSignatureQuery | null;
  otherSignatures: CompleteSignatureQuery[];
}): ReactElement => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number>(0);
  return (
    <>
      <div className="flex-center" style={{ justifyContent: "center" }}>
        {selectedSignature !== null ? (
          <ArtistName>
            <Link to={`/artiste/${selectedSignature.artist.id}`}>
              {selectedSignature.artist.name}
            </Link>
          </ArtistName>
        ) : (
          <p>Séléctionnez un artiste</p>
        )}

        <select
          className="m-l-15"
          onChange={(e) => {
            dispatch(
              changeSlot({
                oldSignature_id:
                  selectedSignature === null
                    ? null
                    : +selectedSignature.signature.id,
                newSignature_id: +e.target.value,
                slotNumber,
                slotIndex,
              })
            );
          }}
          value={value}
        >
          <option value={0} disabled selected>
            {" "}
            -- select an option --{" "}
          </option>
          {otherSignatures.map((signature, index) => {
            return (
              <option key={index} value={signature.signature.id}>
                {signature.artist.name}{" "}
                {signature.slot !== null
                  ? `(sélectionné tier ${signature.slot})`
                  : "(inactif)"}
              </option>
            );
          })}
        </select>
        <RemoveBlock>
          {selectedSignature !== null && (
            <RemoveButton
              onClick={(e) => {
                e.preventDefault();
                console.log(
                  +selectedSignature.signature.id,
                  slotNumber,
                  slotIndex
                );
                dispatch(
                  changeSlot({
                    oldSignature_id: +selectedSignature.signature.id,
                    newSignature_id: null,
                    slotNumber,
                    slotIndex,
                  })
                );
              }}
            >
              retirer artiste
            </RemoveButton>
          )}
        </RemoveBlock>
      </div>
    </>
  );
};

export default Slot;
