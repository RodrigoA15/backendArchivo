import { AppDataSource } from "../db/connection";

export const getAllFoldersOutByMonth = async () => {
  const folders = await AppDataSource.createQueryBuilder()
    .select("EXTRACT(MONTH FROM FECHA_PROCESO) AS MES")
    .addSelect("COUNT(*) AS TOTAL")
    .from("ARCHIVO_SOLICITUD_PROCESO", "ASP")
    .innerJoin(
      "ARCHIVO_TIPO_DOCUMENTO",
      "ATD",
      "ASP.TIPO_DOC_ARCHIVO = ATD.ID_TIPO_DOC"
    )
    .innerJoin(
      "ARCHIVO_MOTIVO",
      "ARCHIVO_MOTIVO",
      "ASP.ID_MOTIVO = ARCHIVO_MOTIVO.ID_MOTIVO"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .where("ASP.ESTADO_ACTUAL =:ESTADO_ACTUAL", {
      ESTADO_ACTUAL: "S",
    })
    .andWhere("ATD.DESCRIPCION =:DESCRIPCION", {
      DESCRIPCION: "Carpeta Placa",
    })
    .andWhere("TO_CHAR(FECHA_PROCESO, 'YYYY') = TO_CHAR(SYSDATE , 'YYYY')")
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .groupBy("EXTRACT(MONTH FROM FECHA_PROCESO)")
    .orderBy("MES")
    .getRawMany();

  return folders;
};

export const getAllFoldersOutByDay = async () => {
  const folders = await AppDataSource.createQueryBuilder()
    .select("EXTRACT(DAY FROM FECHA_PROCESO) AS DIA")
    .addSelect("COUNT(*) AS TOTAL")
    .from("ARCHIVO_SOLICITUD_PROCESO", "ASP")
    .innerJoin(
      "ARCHIVO_TIPO_DOCUMENTO",
      "ATD",
      "ASP.TIPO_DOC_ARCHIVO = ATD.ID_TIPO_DOC"
    )
    .innerJoin(
      "ARCHIVO_MOTIVO",
      "ARCHIVO_MOTIVO",
      "ASP.ID_MOTIVO = ARCHIVO_MOTIVO.ID_MOTIVO"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .where("ASP.ESTADO_ACTUAL =:ESTADO_ACTUAL", {
      ESTADO_ACTUAL: "S",
    })
    .andWhere(
      "TO_CHAR(FECHA_PROCESO, 'MM/YYYY') = TO_CHAR(SYSDATE , 'MM/YYYY')"
    )
    .andWhere("ATD.DESCRIPCION =:DESCRIPCION", {
      DESCRIPCION: "Carpeta Placa",
    })
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .groupBy("EXTRACT(DAY FROM FECHA_PROCESO)")
    .orderBy("DIA")
    .getRawMany();

  return folders;
};
