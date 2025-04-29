import { HttpException } from "../../exceptions/HttpException";
import { AudiencesRepository } from "../../repositories/files/audienceInformation.repository";
import { isEmpty } from "../../utils/util";

export class AudiencesService {
  private audiencesRepository = new AudiencesRepository();
  public async getAudienceInformation(
    numero_comparendo: [],
    status_digitalized: string,
    ticket_status: string
  ): Promise<string[]> {
    if (isEmpty(numero_comparendo)) throw new HttpException(400, "Bad Request");
    const audienceInformation =
      await this.audiencesRepository.getAudienceInformation(
        numero_comparendo,
        status_digitalized,
        ticket_status
      );

    if (isEmpty(audienceInformation))
      throw new HttpException(404, "El comparendo no cumple con las caracteristicas");

    return audienceInformation;
  }

  public async getAllAudienceInformation(
    numero_comparendo: []
  ): Promise<string[]> {
    if (isEmpty(numero_comparendo)) throw new HttpException(400, "Bad Request");
    const audienceInformation =
      await this.audiencesRepository.getAllAudienceInformation(
        numero_comparendo
      );

    if (isEmpty(audienceInformation))
      throw new HttpException(404, "No Audience Information Found");

    return audienceInformation;
  }
}
