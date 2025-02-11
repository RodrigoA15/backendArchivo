import { AppDataSource } from "../../db/connection";

//0 = si  digitalizado 1 = no digitalizado
export const getAllAudienceInformation = async (numero_comparendo: []) => {
  const audienceInformation = await AppDataSource.createQueryBuilder()
    .select(
      `DISTINCT (AU.NRO_RADICADO_COMPARENDO), TI.COD_SIMIT, CP.FECHA FECHA_COMPARENDO,  TEC.DESCRIPCION_ESTADO, CP.FECHA_REGISTRA,
UT.ID_USUARIO, UT.NOMBRES NOMBRE_INFRACTOR, UT.APELLIDOS, AT.PLACA_AGENTE, 
AT.NOMBRES NOMBRE_AGENTE , AT.APELLIDOS  APELLIDO_AGENTE, AT.ESTADO_AGENTE,
AU.ID_FUNCIONARIO, AU.FECHA_AUDIENCIA, AU.HORA_AUDIENCIA, AU.TIPO_AUDIENCIA, AU.AUDIENCIA_REALIZADA, AU.ESTADO, AU.ID_FUENTE, AU.ID_TIPO_PROGRAMACION,
CASE 
    WHEN  MAX(CAD.ID_EVIDENCIA) = 800 THEN 'DIGITALIZADO' 
    ELSE 'NO DIGITALIZADO'
    END AS DIGITALIZADO
`
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
    .leftJoin(
      "COMP_ARCHIVO_DIGITAL",
      "CAD",
      "AU.NRO_RADICADO_COMPARENDO = CAD.NRO_RADICADO_COMPARENDO"
    )
    .where("AU.NRO_RADICADO_COMPARENDO  IN (:...NRO_RADICADO_COMPARENDO)", {
      NRO_RADICADO_COMPARENDO: numero_comparendo,
    })
    .andWhere("CP.ESTADO_COMPARENDO =:ESTADO_COMPARENDO", {
      ESTADO_COMPARENDO: "10",
    })
    .groupBy(
      `AU.NRO_RADICADO_COMPARENDO, TI.COD_SIMIT, CP.FECHA, TEC.DESCRIPCION_ESTADO, CP.FECHA_REGISTRA, 
    UT.ID_USUARIO, UT.NOMBRES, UT.APELLIDOS, AT.PLACA_AGENTE, AT.NOMBRES, AT.APELLIDOS, AT.ESTADO_AGENTE, 
    AU.ID_FUNCIONARIO, AU.FECHA_AUDIENCIA, AU.HORA_AUDIENCIA, AU.TIPO_AUDIENCIA, AU.AUDIENCIA_REALIZADA, 
    AU.ESTADO, AU.ID_FUENTE, AU.ID_TIPO_PROGRAMACION`
    )
    .getRawMany();
  return audienceInformation;
};
