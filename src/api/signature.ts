import axios from "axios";
import { changeHandler } from "../lib/utils";
import {
  SignatureQuery,
  CompleteSignatureQuery,
} from "../types/signature-types";
import { ArtistQuery } from "../types/artist-types";

export const getCompleteSignatures = async (): Promise<
  CompleteSignatureQuery[] | null
> => {
  return axios
    .get("/data/signature.csv")
    .then(async (csvFileSignature) => {
      const res = changeHandler(csvFileSignature.data);
      if (res !== undefined) {
        const resSignatures = res.data as SignatureQuery[];

        const csvFileArtist = await axios.get("/data/artist.csv");
        const response = changeHandler(csvFileArtist.data);
        if (response !== undefined) {
          const artists = response.data as ArtistQuery[];

          const completeSignatures: CompleteSignatureQuery[] = [];

          for (const signature of resSignatures) {
            const findArtist = artists.find(
              (artist) => +artist.id === +signature.artist_id
            );
            if (findArtist !== undefined) {
              const completeSignature = {
                signature,
                artist: findArtist,
                slot: null,
                slotIndex: null,
              };

              completeSignatures.push(completeSignature);
            }
          }

          return completeSignatures;
        } else {
          return null;
        }
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};
