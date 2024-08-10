import { AppDataSource } from "../db/connection";

export const getAllFoldersUserDay = async () => {
  const totalUser = await AppDataSource.createQueryBuilder()
    .select("SOLICITANTE.NOMBRE_USUARIO_QX", "SOLICITANTE")
    .addSelect("COUNT(*)", "TOTAL")
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
      (subQuery) =>
        subQuery
          .select("ARCHIVO_SOLICITUD.NRO_SOLICITUD", "NRO_SOLICITUD")
          .addSelect("QX_USUARIO.NOMBRE_USUARIO_QX", "NOMBRE_USUARIO_QX")
          .from("ARCHIVO_SOLICITUD", "ARCHIVO_SOLICITUD")
          .innerJoin(
            "QX_USUARIO",
            "QX_USUARIO",
            "ARCHIVO_SOLICITUD.ID_QX_USUARIO = QX_USUARIO.ID_USUARIO_QX"
          ),
      "SOLICITANTE",
      "ASP.NRO_SOLICITUD = SOLICITANTE.NRO_SOLICITUD"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .where("ASP.ESTADO_ACTUAL = :ESTADO", {
      ESTADO: "S",
    })
    .andWhere(
      "TO_CHAR(ASP.FECHA_PROCESO, 'DD/MM/YYYY') = TO_CHAR(SYSDATE, 'DD/MM/YYYY')"
    )
    .andWhere("ATD.DESCRIPCION = :DESCRIPCION", {
      DESCRIPCION: "Carpeta Placa",
    })
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .groupBy("SOLICITANTE.NOMBRE_USUARIO_QX")
    .orderBy("TOTAL")
    .getRawMany();

  return totalUser;
};

export const getAllFoldersUserMonth = async () => {
  const totalUser = await AppDataSource.createQueryBuilder()
    .select("P1.NOMBRE_USUARIO_QX", "SOLICITANTE")
    .addSelect("COUNT(*)", "TOTAL")
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
      (qb) =>
        qb
          .select("ARCHIVO_SOLICITUD.NRO_SOLICITUD", "NRO_SOLICITUD")
          .addSelect("QX_USUARIO.NOMBRE_USUARIO_QX", "NOMBRE_USUARIO_QX")
          .from("ARCHIVO_SOLICITUD", "ARCHIVO_SOLICITUD")
          .innerJoin(
            "QX_USUARIO",
            "QX_USUARIO",
            "ARCHIVO_SOLICITUD.ID_QX_USUARIO = QX_USUARIO.ID_USUARIO_QX"
          ),
      "P1",
      "ASP.NRO_SOLICITUD = P1.NRO_SOLICITUD"
    )
    .innerJoin(
      "ARCHIVO_INVENTARIO_PLACA",
      "AIP",
      "ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO"
    )
    .where("ASP.ESTADO_ACTUAL = :ESTADO", {
      ESTADO: "S",
    })
    .andWhere(
      "TO_CHAR(ASP.FECHA_PROCESO, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY')"
    )
    .andWhere("ATD.DESCRIPCION = :DESCRIPCION", {
      DESCRIPCION: "Carpeta Placa",
    })
    .andWhere("AIP.ID_ESTADO =:ID_ESTADO", { ID_ESTADO: 3 })
    .groupBy("P1.NOMBRE_USUARIO_QX")
    .orderBy("TOTAL")
    .getRawMany();

  return totalUser;
};
