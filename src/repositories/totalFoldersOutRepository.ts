import { AppDataSource } from "../db/connection";

export const getTotalFoldersOutByDay = async () => {
  const totalDay = await AppDataSource.createQueryBuilder()
    .select("COUNT(*) as TOTAL")
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
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .andWhere(
      "TO_CHAR(ASP.FECHA_PROCESO, 'DD/MM/YYYY') = TO_CHAR(SYSDATE, 'DD/MM/YYYY')"
    )
    .getRawMany();

  return totalDay;
};

export const getTotalFoldersOutByMonth = async () => {
  const totalMonth = await AppDataSource.createQueryBuilder()
    .select("COUNT(*) as TOTAL")
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
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .andWhere(
      "TO_CHAR(ASP.FECHA_PROCESO, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY')"
    )
    .getRawMany();

  return totalMonth;
};

export const getTotalFoldersOutByYear = async () => {
  const totalYear = await AppDataSource.createQueryBuilder()
    .select("COUNT(*) as TOTAL")
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
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .andWhere("TO_CHAR(ASP.FECHA_PROCESO, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')")
    .getRawMany();

  return totalYear;
};
