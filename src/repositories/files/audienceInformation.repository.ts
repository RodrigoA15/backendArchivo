import { AppDataSource } from "../../db/connection";

//COD:800 = DIGITALIZADO AUDIENCIA PROGRAMA
//COD: 915 = ALCOHOLEMIA

export class AudiencesRepository {
  private dataSource = AppDataSource;

  public async getAudienceInformation(
    numeroComparendo: number[],
    statusDigitalized: string,
    ticketStatus: string
  ): Promise<string[]> {
    const audienceInformation = await this.dataSource
      .createQueryBuilder()
      .select([
        "CP.NRO_COMPARENDO",
        "CP.ESTADO_COMPARENDO",
        "TI.COD_SIMIT",
        "CP.FECHA AS FECHA_COMPARENDO",
        "TEC.DESCRIPCION_ESTADO",
        "CP.FECHA_REGISTRA",
        "UT.ID_USUARIO",
        "UT.NOMBRES AS NOMBRE_INFRACTOR",
        "UT.APELLIDOS",
        "AT.PLACA_AGENTE",
        "AT.NOMBRES AS NOMBRE_AGENTE",
        "AT.APELLIDOS AS APELLIDO_AGENTE",
        "AT.ESTADO_AGENTE",
        "'DIGITALIZADO' AS DIGITALIZADO",
      ])
      .from("COMPARENDOS", "CP")
      .innerJoin(
        "TIPO_ESTADO_COMPARENDO",
        "TEC",
        "TEC.ESTADO_COMPARENDO = CP.ESTADO_COMPARENDO"
      )
      .innerJoin(
        "CONTRAVENTORES",
        "CTV",
        "CTV.NRO_COMPARENDO = CP.NRO_COMPARENDO"
      )
      .innerJoin("USUARIOS_TTO", "UT", "UT.ID_USUARIO = CTV.ID_USUARIO")
      .innerJoin("AGENTES_TTO", "AT", "AT.ID_AGENTE = CP.ID_AGENTE")
      .innerJoin(
        "INFRACCIONES_COMPARENDOS",
        "IC",
        "IC.NRO_COMPARENDO = CP.NRO_COMPARENDO"
      )
      .innerJoin("TIPO_INFRACCION", "TI", "TI.ID_INFRACCION = IC.ID_INFRACCION")
      .leftJoin(
        "COMP_ARCHIVO_DIGITAL",
        "CAD",
        "CP.NRO_COMPARENDO = CAD.NRO_RADICADO_COMPARENDO"
      )
      .where("CP.NRO_COMPARENDO IN (:...numeroComparendo)", {
        numeroComparendo,
      })
      .andWhere("CP.ESTADO_COMPARENDO IN ('10', '24', '5')")
      .andWhere("CAD.ID_EVIDENCIA = :statusDigitalized", { statusDigitalized })
      .andWhere("CP.ESTADO_COMPARENDO = :ticketStatus", { ticketStatus })
      .getRawMany();

    return audienceInformation;
  }

  public async getAllAudienceInformation(
    numero_comparendo: []
  ): Promise<string[]> {
    const audienceInformation = await this.dataSource
      .createQueryBuilder()
      .select(
        `DISTINCT (AU.NRO_RADICADO_COMPARENDO),
        TI.COD_SIMIT,
        CP.FECHA AS FECHA_COMPARENDO,
        TEC.DESCRIPCION_ESTADO,
        CP.FECHA_REGISTRA,
        UT.ID_USUARIO,
        UT.NOMBRES AS NOMBRE_INFRACTOR,
        UT.APELLIDOS,
        AT.PLACA_AGENTE,
        AT.NOMBRES AS NOMBRE_AGENTE,
        AT.APELLIDOS AS APELLIDO_AGENTE,
        AT.ESTADO_AGENTE,
        AU.ID_FUNCIONARIO,
        AU.FECHA_AUDIENCIA,
        AU.HORA_AUDIENCIA,
        AU.TIPO_AUDIENCIA,
        AU.AUDIENCIA_REALIZADA,
        AU.ESTADO,
        AU.ID_FUENTE,
        AU.ID_TIPO_PROGRAMACION,
        CRP.NRO_RESOLUCION,
        CRP.FECHA_RESOLUCION,
        CRP.ID_TIPO_RESOLUCION,
        MAX(CASE WHEN CAD.ID_EVIDENCIA = 914 THEN 'SI' ELSE 'NO' END) AS EXPEDIENTE,
        MAX(CASE WHEN CAD.ID_EVIDENCIA IN (406, 38) THEN 'SI' ELSE 'NO' END) AS DIGITALIZADO
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
      .innerJoin(
        "COMP_RESOLUCION_PROCESO",
        "CRP",
        "AU.NRO_RADICADO_COMPARENDO = CRP.NRO_COMPARENDO"
      )
      .innerJoin(
        "COMP_TIPO_RESOLUCION",
        "CTR",
        "CRP.ID_TIPO_RESOLUCION = CTR.ID_TIPO"
      )
      .where(
        "(AU.NRO_RADICADO_COMPARENDO IN (:...NRO_RADICADO_COMPARENDO)) AND CRP.ID_TIPO_RESOLUCION IN ('6', '16')  AND CAD.ID_EVIDENCIA IN (914, 406, 38)",
        {
          NRO_RADICADO_COMPARENDO: numero_comparendo,
        }
      )
      .groupBy(
        `
      AU.NRO_RADICADO_COMPARENDO,
      TI.COD_SIMIT,
      CP.FECHA,
      TEC.DESCRIPCION_ESTADO,
      CP.FECHA_REGISTRA,
      UT.ID_USUARIO,
      UT.NOMBRES,
      UT.APELLIDOS,
      AT.PLACA_AGENTE,
      AT.NOMBRES,
      AT.APELLIDOS,
      AT.ESTADO_AGENTE,
      AU.ID_FUNCIONARIO,
      AU.FECHA_AUDIENCIA,
      AU.HORA_AUDIENCIA,
      AU.TIPO_AUDIENCIA,
      AU.AUDIENCIA_REALIZADA,
      AU.ESTADO,
      AU.ID_FUENTE,
      AU.ID_TIPO_PROGRAMACION,
      CRP.NRO_RESOLUCION,
      CRP.FECHA_RESOLUCION,
      CRP.ID_TIPO_RESOLUCION
        `
      )
      .getRawMany();
    return audienceInformation;
  }
}
