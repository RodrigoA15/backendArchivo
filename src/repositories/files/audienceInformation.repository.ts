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
        `(CASE 
        WHEN CRP.ID_TIPO_RESOLUCION NOT IN ('25')THEN NULL
        ELSE CRP.ID_TIPO_RESOLUCION
        END) AS MOROSO`,
        "REGEXP_SUBSTR(CRP.JUSTIFICACION, '[^  ]+', 1, 5) AS NUMERO_RESOLUCION",
        "CRP.NRO_RESOLUCION AS NRO_RESOLUCION_QX",
        "CRP.FECHA_GENERA",
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
        `(CASE  
        WHEN CAD.ID_EVIDENCIA = ${statusDigitalized} THEN 'DIGITALIZADO' ELSE 'NO DIGITALIZADO' END)  AS DIGITALIZADO`,
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
      .leftJoin("MOROSOS", "MS", "CP.NRO_COMPARENDO = MS.NRO_COMPARENDO_MOROSO")
      .leftJoin(
        "COMP_RESOLUCION_PROCESO",
        "CRP",
        "MS.CONSECUTIVO_MOROSOS = CRP.CONSECUTIVO_MOROSOS"
      )
      .where("CP.NRO_COMPARENDO IN (:...numeroComparendo)", {
        numeroComparendo,
      })
      .andWhere("CAD.ID_EVIDENCIA = :statusDigitalized", { statusDigitalized })
      .andWhere("CP.ESTADO_COMPARENDO = :ticketStatus", { ticketStatus })
      .getRawMany();

    return audienceInformation;
  }

  public async getAllAudienceInformation(
    numero_comparendo: number[]
  ): Promise<string[]> {
    // Validar que el array no esté vacío
    if (!numero_comparendo || numero_comparendo.length === 0) {
      console.warn("El array numero_comparendo está vacío.");
      return []; // Devuelve un array vacío si no hay datos
    }

    const audienceInformation = await this.dataSource
      .createQueryBuilder()
      .select([
        "ACTOS.NRO_RADICADO_COMPARENDO",
        "DATOSCOMPARENDOS.COD_SIMIT",
        "DATOSCOMPARENDOS.FECHA_COMPARENDO",
        "DATOSCOMPARENDOS.DESCRIPCION_ESTADO",
        "DATOSCOMPARENDOS.FECHA_REGISTRA",
        "DATOSCOMPARENDOS.ID_INFRACTOR",
        "DATOSCOMPARENDOS.NOMBRES_INFRACTOR",
        "DATOSCOMPARENDOS.APELLIDOS_INFRACTOR",
        "DATOSCOMPARENDOS.PLACA_AGENTE",
        "DATOSCOMPARENDOS.NOMBRE_AGENTE",
        "DATOSCOMPARENDOS.APELLIDO_AGENTE",
        "DATOSCOMPARENDOS.ESTADO_AGENTE",
        `COALESCE(
            CASE DATOSCOMPARENDOS.ID_EVIDENCIA 
                WHEN 914 THEN 'AUDIENCIA' 
                WHEN 406 THEN 'FALLO AUDIENCIA' 
                WHEN 55  THEN 'PRESCRIPCION' 
                WHEN 38  THEN 'CADUCIDAD' 
                WHEN 33  THEN 'REVOCATORIA' 
            END, 'NO DIGITALIZADO') AS ID_EVIDENCIA`,
        "ACTOS.NRO_RESOLUCION",
        "ACTOS.FECHA_RESOLUCION",
        `CASE 
            WHEN ACTOS.ID_TIPO_RESOLUCION IS NULL THEN 'SIN RESOLUCION' 
            WHEN ACTOS.ID_TIPO_RESOLUCION = '23' THEN 'REVOCATORIA' 
            WHEN ACTOS.ID_TIPO_RESOLUCION = '16' THEN 'CADUCIDAD' 
            WHEN ACTOS.ID_TIPO_RESOLUCION = '13' THEN 'PRESCRIPCION' 
            WHEN ACTOS.ID_TIPO_RESOLUCION = '6' THEN 'FALLO AUDIENCIA' 
        END AS ID_TIPO_RESOLUCION`,
        "ACTOS.NOMBRE_USUARIO_QX AS FUNCIONARIO_EMTEL",
        "ACTOS.CONSECUTIVO_MOROSOS",
      ])
      .from((subQuery) => {
        return subQuery
          .select([
            `CASE
                    WHEN CRP.NRO_COMPARENDO IS NULL THEN MS.NRO_COMPARENDO_MOROSO
                    ELSE TO_CHAR(CRP.NRO_COMPARENDO)
                END AS NRO_RADICADO_COMPARENDO`,
            "CRP.NRO_RESOLUCION",
            "CRP.ID_USUARIO_QX",
            "QU.NOMBRE_USUARIO_QX",
            "COALESCE(CRP.NRO_COMPARENDO, MS.NRO_COMPARENDO_MOROSO) AS NRO_COMPARENDO",
            "COALESCE(CRP.CONSECUTIVO_MOROSOS, MS.CONSECUTIVO_MOROSOS) AS CONSECUTIVO_MOROSOS",
            "CRP.FECHA_RESOLUCION",
            "CRP.ID_TIPO_RESOLUCION",
          ])
          .from("COMP_RESOLUCION_PROCESO", "CRP")
          .leftJoin("QX_USUARIO", "QU", "CRP.ID_USUARIO_QX = qu.ID_USUARIO_QX")
          .leftJoin(
            "MOROSOS",
            "MS",
            "CRP.NRO_COMPARENDO = MS.NRO_COMPARENDO_MOROSO OR CRP.CONSECUTIVO_MOROSOS = MS.CONSECUTIVO_MOROSOS"
          )
          .where(
            "COALESCE(CRP.NRO_COMPARENDO, MS.NRO_COMPARENDO_MOROSO) IN (:...radicados)",
            { radicados: numero_comparendo }
          )
          .andWhere("CRP.ID_TIPO_RESOLUCION IN (:...resoluciones)", {
            resoluciones: ["6", "16", "23", "13"],
          });
      }, "ACTOS")
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select([
              "CP.NRO_COMPARENDO",
              "CP.FECHA AS FECHA_COMPARENDO",
              "TI.COD_INFRACCION AS COD_SIMIT",
              "TEC.DESCRIPCION_ESTADO",
              "CP.FECHA_REGISTRA",
              "UT.ID_USUARIO AS ID_INFRACTOR",
              "UT.NOMBRES AS NOMBRES_INFRACTOR",
              "UT.APELLIDOS AS APELLIDOS_INFRACTOR",
              "AT.PLACA_AGENTE",
              "AT.NOMBRES AS NOMBRE_AGENTE",
              "AT.APELLIDOS AS APELLIDO_AGENTE",
              "AT.ESTADO_AGENTE",
              "CAD.ID_EVIDENCIA",
            ])
            .from("COMPARENDOS", "CP")
            .innerJoin(
              "INFRACCIONES_COMPARENDOS",
              "IC",
              "CP.NRO_COMPARENDO = IC.NRO_COMPARENDO"
            )
            .innerJoin(
              "TIPO_INFRACCION",
              "TI",
              "IC.ID_INFRACCION = TI.ID_INFRACCION"
            )
            .innerJoin(
              "TIPO_ESTADO_COMPARENDO",
              "TEC",
              "CP.ESTADO_COMPARENDO = TEC.ESTADO_COMPARENDO"
            )
            .innerJoin(
              "CONTRAVENTORES",
              "CTV",
              "CP.NRO_COMPARENDO = CTV.NRO_COMPARENDO"
            )
            .innerJoin("USUARIOS_TTO", "UT", "CTV.ID_USUARIO = UT.ID_USUARIO")
            .innerJoin("AGENTES_TTO", "AT", "CP.ID_AGENTE = AT.ID_AGENTE")
            .innerJoin(
              "COMP_ARCHIVO_DIGITAL",
              "CAD",
              "CP.NRO_COMPARENDO = CAD.NRO_RADICADO_COMPARENDO"
            )
            .where("CAD.ID_EVIDENCIA IN (:...evidencias)", {
              evidencias: ["914", "406", "38", "33", "55"],
            });
        },
        "DATOSCOMPARENDOS",
        "ACTOS.NRO_RADICADO_COMPARENDO = DATOSCOMPARENDOS.NRO_COMPARENDO"
      )
      .getRawMany();

    return audienceInformation;
  }
}
