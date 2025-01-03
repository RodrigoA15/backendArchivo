import { AppDataSource } from "../../db/connection";

export const getAllAudienceInformation = async (numero_comparendo: string) => {
  const audienceInformation = await AppDataSource.createQueryBuilder()
    .select(
      `AU.NRO_RADICADO_COMPARENDO, TI.DESC_INFRACCION, CP.FECHA FECHA_COMPARENDO,  TEC.DESCRIPCION_ESTADO, CP.FECHA_REGISTRA, 
UT.NOMBRES NOMBRE_INFRACTOR, UT.APELLIDOS, AT.PLACA_AGENTE, 
AT.NOMBRES NOMBRE_AGENTE , AT.APELLIDOS  APELLIDO_AGENTE, AT.ESTADO_AGENTE,
AU.ID_FUNCIONARIO, AU.FECHA_AUDIENCIA, AU.HORA_AUDIENCIA, AU.TIPO_AUDIENCIA, AU.AUDIENCIA_REALIZADA, AU.ESTADO, AU.ID_FUENTE, AU.ID_TIPO_PROGRAMACION`
    )
    .from("AUDIENCIA", "AU")
    .innerJoin(
      "COMPARENDOS",
      "CP",
      "CP.NRO_COMPARENDO = AU.NRO_RADICADO_COMPARENDO"
    )
    .innerJoin(
      "TIPO_ESTADO_COMPARENDO",
      "TEC",
      "TEC.ESTADO_COMPARENDO = CP.ESTADO_COMPARENDO"
    )
    .innerJoin(
      "CONTRAVENTORES",
      "CTV",
      "CTV.NRO_COMPARENDO = AU.NRO_RADICADO_COMPARENDO"
    )
    .innerJoin("USUARIOS_TTO", "UT", "UT.ID_USUARIO = CTV.ID_USUARIO")
    .innerJoin("AGENTES_TTO", "AT", "AT.ID_AGENTE = CP.ID_AGENTE")
    .innerJoin(
      "INFRACCIONES_COMPARENDOS",
      "IC",
      "IC.NRO_COMPARENDO = AU.NRO_RADICADO_COMPARENDO"
    )
    .innerJoin("TIPO_INFRACCION", "TI", "TI.ID_INFRACCION = IC.ID_INFRACCION")
    .where("AU.NRO_RADICADO_COMPARENDO =:NRO_RADICADO_COMPARENDO", {
      NRO_RADICADO_COMPARENDO: numero_comparendo,
    })
    .getRawMany();
  return audienceInformation;
};
