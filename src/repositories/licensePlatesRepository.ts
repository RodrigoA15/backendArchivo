import { AppDataSource } from "../db/connection";

export const totalAllLicensesByDay = async () => {
  const total = await AppDataSource.createQueryBuilder()
    .select("COUNT(*) AS TOTAL")
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin(
      "TIPO_ESTADO_SOLICITUD",
      "TES",
      "SM.ID_ESTADO_SOLICITUD = TES.ID_ESTADO_SOLICITUD"
    )
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .innerJoin("SOLICITUD_PROCESO", "SP", "SM.NRO_TRAMITE = SP.NRO_TRAMITE")
    .leftJoin("MATRICULAS_INICIALES", "MI", "MI.NRO_TRAMITE = SM.NRO_TRAMITE")
    .leftJoin(
      "TIPO_PROCESO_SOLICITUD",
      "TPS",
      "SP.ID_PROCESO_SOLICITUD = TPS.ID_PROCESO_SOLICITUD"
    )
    .leftJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "SM.IDENTIFICADOR_SOLICITUD = AIP.PLACA_INVENTARIO"
    )
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere(
      "TO_CHAR(MI.FECHA_MATRICULA, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY')"
    )
    .andWhere("SP.ID_PROCESO_SOLICITUD =:ID_PROCESO_SOLICITUD", {
      ID_PROCESO_SOLICITUD: 6,
    })
    .getRawMany();

  return total;
};

export const getAllLicensesReturn = async () => {
  const total = await AppDataSource.createQueryBuilder()
    .select("COUNT(*) AS TOTAL")
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere("TO_CHAR(SM.FECHA_LIQUIDA, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')")
    .andWhere("SM.ID_ESTADO_SOLICITUD =:ID_ESTADO_SOLICITUD", {
      ID_ESTADO_SOLICITUD: 4,
    })
    .getRawMany();

  return total;
};

export const totalLicensesOutArchive = async () => {
  const total = await AppDataSource.createQueryBuilder()
    .select("COUNT(*) AS TOTAL")
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .innerJoin("SOLICITUD_PROCESO", "SP", "SM.NRO_TRAMITE = SP.NRO_TRAMITE")
    .leftJoin("MATRICULAS_INICIALES", "MI", "MI.NRO_TRAMITE = SM.NRO_TRAMITE")
    .leftJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "SM.IDENTIFICADOR_SOLICITUD = AIP.PLACA_INVENTARIO"
    )
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere("TO_CHAR(MI.FECHA_MATRICULA, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')")
    .andWhere("SP.ID_PROCESO_SOLICITUD =:ID_PROCESO_SOLICITUD", {
      ID_PROCESO_SOLICITUD: 6,
    })
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .getRawMany();

  return total;
};

export const getAllLicensesByDays = async () => {
  const total = await AppDataSource.createQueryBuilder()
    .select("EXTRACT(DAY FROM MI.FECHA_MATRICULA) DIA")
    .addSelect("COUNT(*) TOTAL")
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .innerJoin("SOLICITUD_PROCESO", "SP", "SM.NRO_TRAMITE = SP.NRO_TRAMITE")
    .leftJoin("MATRICULAS_INICIALES", "MI", "MI.NRO_TRAMITE = SM.NRO_TRAMITE")
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere(
      "TO_CHAR(MI.FECHA_MATRICULA, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY')"
    )
    .andWhere("SP.ID_PROCESO_SOLICITUD =:ID_PROCESO_SOLICITUD", {
      ID_PROCESO_SOLICITUD: 6,
    })
    .groupBy("EXTRACT(DAY FROM MI.FECHA_MATRICULA)")
    .orderBy("DIA")
    .getRawMany();

  return total;
};

export const getAllLicensesByMonth = async () => {
  const total = await AppDataSource.createQueryBuilder()
    .select("EXTRACT(MONTH FROM MI.FECHA_MATRICULA) MES")
    .addSelect("COUNT(*) TOTAL")
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .innerJoin("SOLICITUD_PROCESO", "SP", "SM.NRO_TRAMITE = SP.NRO_TRAMITE")
    .leftJoin("MATRICULAS_INICIALES", "MI", "MI.NRO_TRAMITE = SM.NRO_TRAMITE")
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere("TO_CHAR(MI.FECHA_MATRICULA, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')")
    .andWhere("SP.ID_PROCESO_SOLICITUD =:ID_PROCESO_SOLICITUD", {
      ID_PROCESO_SOLICITUD: 6,
    })
    .groupBy("EXTRACT(MONTH FROM MI.FECHA_MATRICULA)")
    .orderBy("MES")
    .getRawMany();

  return total;
};

export const getAllLicensesReturnMonths = async () => {
  const total = await AppDataSource.createQueryBuilder()
    .select("EXTRACT(MONTH FROM SM.FECHA_LIQUIDA) MES")
    .addSelect("COUNT(*) TOTAL")
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere("TO_CHAR(SM.FECHA_LIQUIDA, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')")
    .andWhere("SM.ID_ESTADO_SOLICITUD =:ID_ESTADO_SOLICITUD", {
      ID_ESTADO_SOLICITUD: 4,
    })
    .groupBy("EXTRACT(MONTH FROM SM.FECHA_LIQUIDA)")
    .orderBy("MES")
    .getRawMany();

  return total;
};

export const getAllLicensesLastYear = async () => {
  const total = await AppDataSource.createQueryBuilder()
    .select("EXTRACT(MONTH FROM MI.FECHA_MATRICULA) MES")
    .addSelect("COUNT(*) TOTAL")
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .innerJoin("SOLICITUD_PROCESO", "SP", "SM.NRO_TRAMITE = SP.NRO_TRAMITE")
    .leftJoin("MATRICULAS_INICIALES", "MI", "MI.NRO_TRAMITE = SM.NRO_TRAMITE")
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere(
      "TO_CHAR(MI.FECHA_MATRICULA, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY') -1"
    )
    .andWhere("SP.ID_PROCESO_SOLICITUD =:ID_PROCESO_SOLICITUD", {
      ID_PROCESO_SOLICITUD: 6,
    })
    .groupBy("EXTRACT(MONTH FROM MI.FECHA_MATRICULA)")
    .orderBy("MES")
    .getRawMany();

  return total;
};

export const getAllLicensesByUserQX = async () => {
  const total = AppDataSource.createQueryBuilder()
    .select("QU.NOMBRE_USUARIO_QX")
    .addSelect("COUNT(*) TOTAL")
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .innerJoin("SOLICITUD_PROCESO", "SP", "SM.NRO_TRAMITE = SP.NRO_TRAMITE")
    .leftJoin("MATRICULAS_INICIALES", "MI", "MI.NRO_TRAMITE = SM.NRO_TRAMITE")
    .leftJoin("QX_USUARIO", "QU", "SP.ID_USUARIO_QX= QU.ID_USUARIO_QX")
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere("TO_CHAR(MI.FECHA_MATRICULA, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')")
    .andWhere("SP.ID_PROCESO_SOLICITUD =:ID_PROCESO_SOLICITUD", {
      ID_PROCESO_SOLICITUD: 1,
    })
    .groupBy("QU.NOMBRE_USUARIO_QX")
    .orderBy("TOTAL", "DESC")
    .getRawMany();

  return total;
};

export const getVehicleClassReturned = async () => {
  const total = await AppDataSource.createQueryBuilder()
    .addSelect(
      "CASE WHEN CV.DESC_CLASE IS NULL THEN 'DESCONOCIDO'ELSE CV.DESC_CLASE END AS CLASE_VEHICULO , COUNT(*) TOTAL"
    )
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .leftJoin(
      "MATRICULAS_INICIALES",
      "MI",
      "SM.IDENTIFICADOR_SOLICITUD = MI.NRO_PLACA"
    )
    .leftJoin("LIC_TTO", "LT", "MI.NRO_LIC_TTO = LT.NRO_LIC_TTO")
    .leftJoin("CLASE_VEHICULOS", "CV", "LT.ID_CLASE = CV.ID_CLASE")
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere("TO_CHAR(SM.FECHA_LIQUIDA, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')")
    .andWhere("SM.ID_ESTADO_SOLICITUD =:ID_ESTADO_SOLICITUD", {
      ID_ESTADO_SOLICITUD: 4,
    })
    .groupBy("CV.DESC_CLASE")
    .orderBy("TOTAL")
    .getRawMany();

  return total;
};

export const getAllLicencesPlatesInfo = async () => {
  const total = await AppDataSource.createQueryBuilder()
    .select(
      "TO_NUMBER(TO_CHAR(TO_DATE(SM.FECHA_REGISTRA, 'DD/MM/YYYY'), 'WW'))SEMANA, SM.IDENTIFICADOR_SOLICITUD AS PLACA, SM.ID_ESTADO_SOLICITUD AS APROBADO, MI.FECHA_MATRICULA , TPS.PROCESO_SOLICITUD, AIP.ID_ESTADO, ADM.NRO_PLACA AS ARCHIVO_DIGITAL"
    )
    .from("SOLICITUD_MAESTRO", "SM")
    .innerJoin("SOLICITUD_TRAMITE", "ST", "SM.NRO_TRAMITE = ST.NRO_TRAMITE")
    .innerJoin("SOLICITUD_PROCESO", "SP", "SM.NRO_TRAMITE = SP.NRO_TRAMITE")
    .leftJoin("MATRICULAS_INICIALES", "MI", "MI.NRO_TRAMITE = SM.NRO_TRAMITE")
    .leftJoin(
      "TIPO_PROCESO_SOLICITUD",
      "TPS",
      "SP.ID_PROCESO_SOLICITUD = TPS.ID_PROCESO_SOLICITUD"
    )
    .leftJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "SM.IDENTIFICADOR_SOLICITUD = AIP.PLACA_INVENTARIO"
    )
    .leftJoin(
      "ARCHIVO_DIGITAL_MATRICULAS",
      "ADM",
      "SM.IDENTIFICADOR_SOLICITUD = ADM.NRO_PLACA"
    )
    .where("ST.ID_TRAMITE =:ID_TRAMITE", { ID_TRAMITE: 1 })
    .andWhere("TO_CHAR(SM.FECHA_REGISTRA, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')")
    .andWhere("SP.PROCESO_ACTIVO =:PROCESO_ACTIVO", { PROCESO_ACTIVO: "S" })
    .groupBy(
      "TO_NUMBER(TO_CHAR(TO_DATE( SM.FECHA_REGISTRA, 'DD/MM/YYYY'), 'WW'))  , SM.IDENTIFICADOR_SOLICITUD , SM.ID_ESTADO_SOLICITUD , MI.FECHA_MATRICULA , TPS.PROCESO_SOLICITUD, AIP.ID_ESTADO, ADM.NRO_PLACA"
    )
    .orderBy("SEMANA", "DESC")
    .getRawMany();

  return total;
};
