import { AppDataSource } from "../db/connection";

//Query all data files out
export const userTotal = async () => {
  const consulta = AppDataSource.createQueryBuilder()
    .addSelect(
      `QU.ID_USUARIO_QX, 
    ATD.DESCRIPCION, 
    ASP.PLACA_INVENTARIO, 
    CP.FECHA AS FECHA_COMPARENDO,
    CASE
        WHEN CP.FECHA_REGISTRA IS NOT NULL THEN TO_CHAR(CP.FECHA_REGISTRA)
        ELSE 'SIN REGISTRAR'
    END AS FECHA_REGISTRA,
    QU.NOMBRE_USUARIO_QX, 
    QG.NOMBRE_GRUPO_QX, 
    TEC.DESCRIPCION_ESTADO, 
    ABS(TO_DATE(ASP.FECHA_PROCESO, 'DD/MM/YYYY') - TO_DATE(SYSDATE, 'DD/MM/YYYY')) AS DIAS,
    CASE 
        WHEN CAD.NRO_RADICADO_COMPARENDO IS NOT NULL 
            THEN 'SI'
        ELSE 'SIN DIGITAR'
    END AS DIGITADO,
    CASE
        WHEN CAD.FECHA_DOCUMENTO IS NOT NULL 
            THEN TO_CHAR(CAD.FECHA_DOCUMENTO, 'DD/MM/YYYY')
        ELSE 'SIN DIGITAR'
    END AS FECHA_DIGITADO`
    )
    .from("ARCHIVO_SOLICITUD_PROCESO", "ASP")
    .innerJoin(
      "ARCHIVO_TIPO_DOCUMENTO",
      "ATD",
      "ASP.TIPO_DOC_ARCHIVO = ATD.ID_TIPO_DOC"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .innerJoin(
      "ARCHIVO_SOLICITUD",
      "ARS",
      "ASP.NRO_SOLICITUD = ARS.NRO_SOLICITUD"
    )
    .innerJoin("QX_USUARIO", "QU", "ARS.ID_QX_USUARIO = QU.ID_USUARIO_QX")
    .innerJoin("QX_GRUPO", "QG", "QU.ID_GRUPO_QX = QG.ID_GRUPO_QX")
    .innerJoin("COMPARENDOS", "CP", "ASP.PLACA_INVENTARIO = CP.NRO_COMPARENDO")
    .innerJoin(
      "TIPO_ESTADO_COMPARENDO",
      "TEC",
      "CP.ESTADO_COMPARENDO = TEC.ESTADO_COMPARENDO"
    )
    .innerJoin("TIPO_FUENTE_COMPARENDO", "TFC", "CP.ID_FUENTE = TFC.ID_FUENTE")
    .leftJoin(
      "COMP_ARCHIVO_DIGITAL",
      "CAD",
      "CP.NRO_COMPARENDO = CAD.NRO_RADICADO_COMPARENDO"
    )
    .where("AIP.ID_ESTADO = 3")
    // .andWhere("QU.ID_CARGO = 51")
    .getQuery();

  const consulta2 = AppDataSource.createQueryBuilder()
    .addSelect(
      `QU.ID_USUARIO_QX,
    ATD.DESCRIPCION,
    ASP.PLACA_INVENTARIO,
    TO_DATE('01/01/2000', 'DD/MM/YYYY'),
    TO_CHAR('NO APLICA'),
    QU.NOMBRE_USUARIO_QX,
    QG.NOMBRE_GRUPO_QX,
    TO_CHAR('NO APLICA'),
    ABS(TO_DATE(ASP.FECHA_PROCESO, 'DD/MM/YYYY') - TO_DATE(SYSDATE, 'DD/MM/YYYY')) AS DIAS,
    TO_CHAR('NO APLICA'),
    TO_CHAR('NO APLICA')`
    )
    .from("ARCHIVO_SOLICITUD_PROCESO", "ASP")
    .innerJoin(
      "ARCHIVO_TIPO_DOCUMENTO",
      "ATD",
      "ASP.TIPO_DOC_ARCHIVO = ATD.ID_TIPO_DOC"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .innerJoin(
      "ARCHIVO_SOLICITUD",
      "ARS",
      "ASP.NRO_SOLICITUD = ARS.NRO_SOLICITUD"
    )
    .innerJoin("QX_USUARIO", "QU", "ARS.ID_QX_USUARIO = QU.ID_USUARIO_QX")
    .innerJoin("QX_GRUPO", "QG", "QU.ID_GRUPO_QX = QG.ID_GRUPO_QX")
    .where("AIP.ID_ESTADO = 3")
    // .andWhere("QU.ID_CARGO =51")
    .andWhere("ATD.DESCRIPCION <>  'Comparendo'")
    .orderBy("DIAS", "DESC")
    .getQuery();

  const result = await AppDataSource.manager.query(
    `${consulta} UNION ${consulta2}`
  );

  return result;
};

export const expdientesTotal = async () => {
  const consulta = await AppDataSource.createQueryBuilder()
    .addSelect(`COUNT(*) AS TOTAL`)
    .from("ARCHIVO_SOLICITUD_PROCESO", "ASP")
    .innerJoin(
      "ARCHIVO_TIPO_DOCUMENTO",
      "ATD",
      "ASP.TIPO_DOC_ARCHIVO = ATD.ID_TIPO_DOC"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .innerJoin(
      "ARCHIVO_SOLICITUD",
      "ARS",
      "ASP.NRO_SOLICITUD = ARS.NRO_SOLICITUD"
    )
    .innerJoin("QX_USUARIO", "QU", "ARS.ID_QX_USUARIO = QU.ID_USUARIO_QX")
    .innerJoin("QX_GRUPO", "QG", "QU.ID_GRUPO_QX = QG.ID_GRUPO_QX")
    .innerJoin("COMPARENDOS", "CP", "ASP.PLACA_INVENTARIO = CP.NRO_COMPARENDO")
    .innerJoin(
      "TIPO_ESTADO_COMPARENDO",
      "TEC",
      "CP.ESTADO_COMPARENDO = TEC.ESTADO_COMPARENDO"
    )
    .innerJoin("TIPO_FUENTE_COMPARENDO", "TFC", "CP.ID_FUENTE = TFC.ID_FUENTE")
    .leftJoin(
      "COMP_ARCHIVO_DIGITAL",
      "CAD",
      "CP.NRO_COMPARENDO = CAD.NRO_RADICADO_COMPARENDO"
    )
    .where("ASP.ESTADO_ACTUAL =:ESTADO_ACTUAL", { ESTADO_ACTUAL: "S" })
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .andWhere("QU.ID_CARGO =:ID_CARGO", { ID_CARGO: 51 })
    .orderBy("QU.ID_USUARIO_QX")
    .getRawMany();

  return consulta;
};

export const expdientesbByDay = async () => {
  const consulta = await AppDataSource.createQueryBuilder()
    .addSelect(`COUNT(*) AS TOTAL`)
    .from("ARCHIVO_SOLICITUD_PROCESO", "ASP")
    .innerJoin(
      "ARCHIVO_TIPO_DOCUMENTO",
      "ATD",
      "ASP.TIPO_DOC_ARCHIVO = ATD.ID_TIPO_DOC"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .innerJoin(
      "ARCHIVO_SOLICITUD",
      "ARS",
      "ASP.NRO_SOLICITUD = ARS.NRO_SOLICITUD"
    )
    .innerJoin("QX_USUARIO", "QU", "ARS.ID_QX_USUARIO = QU.ID_USUARIO_QX")
    .innerJoin("QX_GRUPO", "QG", "QU.ID_GRUPO_QX = QG.ID_GRUPO_QX")
    .innerJoin("COMPARENDOS", "CP", "ASP.PLACA_INVENTARIO = CP.NRO_COMPARENDO")
    .innerJoin(
      "TIPO_ESTADO_COMPARENDO",
      "TEC",
      "CP.ESTADO_COMPARENDO = TEC.ESTADO_COMPARENDO"
    )
    .innerJoin("TIPO_FUENTE_COMPARENDO", "TFC", "CP.ID_FUENTE = TFC.ID_FUENTE")
    .leftJoin(
      "COMP_ARCHIVO_DIGITAL",
      "CAD",
      "CP.NRO_COMPARENDO = CAD.NRO_RADICADO_COMPARENDO"
    )
    .where("ASP.ESTADO_ACTUAL =:ESTADO_ACTUAL", { ESTADO_ACTUAL: "S" })
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .andWhere("QU.ID_CARGO =:ID_CARGO", { ID_CARGO: 51 })
    .andWhere(
      "TO_CHAR(ASP.FECHA_PROCESO, 'DD/MM/YYYY') = TO_CHAR(SYSDATE, 'DD/MM/YYYY')"
    )
    .orderBy("QU.ID_USUARIO_QX")
    .getRawMany();

  return consulta;
};

export const expdientesbByMonth = async () => {
  const consulta = await AppDataSource.createQueryBuilder()
    .addSelect(`COUNT(*) AS TOTAL`)
    .from("ARCHIVO_SOLICITUD_PROCESO", "ASP")
    .innerJoin(
      "ARCHIVO_TIPO_DOCUMENTO",
      "ATD",
      "ASP.TIPO_DOC_ARCHIVO = ATD.ID_TIPO_DOC"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .innerJoin(
      "ARCHIVO_SOLICITUD",
      "ARS",
      "ASP.NRO_SOLICITUD = ARS.NRO_SOLICITUD"
    )
    .innerJoin("QX_USUARIO", "QU", "ARS.ID_QX_USUARIO = QU.ID_USUARIO_QX")
    .innerJoin("QX_GRUPO", "QG", "QU.ID_GRUPO_QX = QG.ID_GRUPO_QX")
    .innerJoin("COMPARENDOS", "CP", "ASP.PLACA_INVENTARIO = CP.NRO_COMPARENDO")
    .innerJoin(
      "TIPO_ESTADO_COMPARENDO",
      "TEC",
      "CP.ESTADO_COMPARENDO = TEC.ESTADO_COMPARENDO"
    )
    .innerJoin("TIPO_FUENTE_COMPARENDO", "TFC", "CP.ID_FUENTE = TFC.ID_FUENTE")
    .leftJoin(
      "COMP_ARCHIVO_DIGITAL",
      "CAD",
      "CP.NRO_COMPARENDO = CAD.NRO_RADICADO_COMPARENDO"
    )
    .where("ASP.ESTADO_ACTUAL =:ESTADO_ACTUAL", { ESTADO_ACTUAL: "S" })
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .andWhere("QU.ID_CARGO =:ID_CARGO", { ID_CARGO: 51 })
    .andWhere(
      "TO_CHAR(ASP.FECHA_PROCESO, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY')"
    )
    .orderBy("QU.ID_USUARIO_QX")
    .getRawMany();

  return consulta;
};

export const expdientesbByYear = async () => {
  const consulta = await AppDataSource.createQueryBuilder()
    .addSelect(`COUNT(*) AS TOTAL`)
    .from("ARCHIVO_SOLICITUD_PROCESO", "ASP")
    .innerJoin(
      "ARCHIVO_TIPO_DOCUMENTO",
      "ATD",
      "ASP.TIPO_DOC_ARCHIVO = ATD.ID_TIPO_DOC"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .innerJoin(
      "ARCHIVO_SOLICITUD",
      "ARS",
      "ASP.NRO_SOLICITUD = ARS.NRO_SOLICITUD"
    )
    .innerJoin("QX_USUARIO", "QU", "ARS.ID_QX_USUARIO = QU.ID_USUARIO_QX")
    .innerJoin("QX_GRUPO", "QG", "QU.ID_GRUPO_QX = QG.ID_GRUPO_QX")
    .innerJoin("COMPARENDOS", "CP", "ASP.PLACA_INVENTARIO = CP.NRO_COMPARENDO")
    .innerJoin(
      "TIPO_ESTADO_COMPARENDO",
      "TEC",
      "CP.ESTADO_COMPARENDO = TEC.ESTADO_COMPARENDO"
    )
    .innerJoin("TIPO_FUENTE_COMPARENDO", "TFC", "CP.ID_FUENTE = TFC.ID_FUENTE")
    .leftJoin(
      "COMP_ARCHIVO_DIGITAL",
      "CAD",
      "CP.NRO_COMPARENDO = CAD.NRO_RADICADO_COMPARENDO"
    )
    .where("ASP.ESTADO_ACTUAL =:ESTADO_ACTUAL", { ESTADO_ACTUAL: "S" })
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .andWhere("QU.ID_CARGO =:ID_CARGO", { ID_CARGO: 51 })
    .andWhere("TO_CHAR(ASP.FECHA_PROCESO, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')")
    .orderBy("QU.ID_USUARIO_QX")
    .getRawMany();

  return consulta;
};
