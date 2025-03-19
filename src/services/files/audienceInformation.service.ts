import { HttpException } from "../../exceptions/HttpException";
import * as audienceInformationRepository from "../../repositories/files/audienceInformation.repository";
import { isEmpty } from "../../utils/util";

export const getAudienceInformation = async (
  numero_comparendo: [],
  status_digitalized: string
) => {
  if (isEmpty(numero_comparendo)) throw new HttpException(400, "Bad Request");
  const audienceInformation =
    await audienceInformationRepository.getAudienceInformation(
      numero_comparendo,
      status_digitalized
    );

  if (isEmpty(audienceInformation))
    throw new HttpException(404, "No Audience Information Found");

  return audienceInformation;
};

export const getAllAudienceInformation = async (numero_comparendo: []) => {
  if (isEmpty(numero_comparendo)) throw new HttpException(400, "Bad Request");
  const audienceInformation =
    await audienceInformationRepository.getAllAudienceInformation(
      numero_comparendo
    );

  if (isEmpty(audienceInformation))
    throw new HttpException(404, "No Audience Information Found");

  return audienceInformation;
};
