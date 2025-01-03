import * as audienceInformationRepository from "../../repositories/files/audienceInformation.repository";

export const getAllAudienceInformation = async (
  numero_comparendo: string
) => {
  const audienceInformation =
    await audienceInformationRepository.getAllAudienceInformation(
      numero_comparendo
    );
  return audienceInformation;
};
