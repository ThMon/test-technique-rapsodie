import { ArtistQuery } from "./artist-types";

export interface SignatureQuery {
  id: number;
  label_id: number;
  artist_id: number;
}

export interface CompleteSignatureQuery {
  signature: SignatureQuery;
  artist: ArtistQuery;
  slot: null | number;
  slotIndex: null | number;
}

export interface SignatureState {
  signatures: CompleteSignatureQuery[];
  slots: {
    slot1: null | CompleteSignatureQuery;
    slot2: [null | CompleteSignatureQuery, null | CompleteSignatureQuery];
    slot3: [
      null | CompleteSignatureQuery,
      null | CompleteSignatureQuery,
      null | CompleteSignatureQuery
    ];
  };
}
