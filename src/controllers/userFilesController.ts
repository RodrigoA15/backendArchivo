import { Request, Response } from "express";
import { AppDataSource } from "../db/connection";

class UserFilesController {
  constructor() {}

  async userDocumentsByDay(req: Request, res: Response) {
    try {
      const total = await AppDataSource.createQueryBuilder()
        .select("SOLICITANTE.NOMBRE_USUARIO_QX", "SOLICITANTE")
        .addSelect("COUNT(*)", "TOTAL")
        .from("ARCHIVO_SOLICITUD_PROCESO", "ARCHIVO_SOLICITUD_PROCESO")
        .innerJoin(
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_SOLICITUD_PROCESO.TIPO_DOC_ARCHIVO = ARCHIVO_TIPO_DOCUMENTO.ID_TIPO_DOC"
        )
        .innerJoin(
          "QX_USUARIO",
          "QX_USUARIO",
          "ARCHIVO_SOLICITUD_PROCESO.ID_USUARIO = QX_USUARIO.ID_USUARIO_QX"
        )
        .innerJoin(
          "ARCHIVO_MOTIVO",
          "ARCHIVO_MOTIVO",
          "ARCHIVO_SOLICITUD_PROCESO.ID_MOTIVO = ARCHIVO_MOTIVO.ID_MOTIVO"
        )
        .innerJoin(
          "ARCHIVO_TIPO_ESTADO",
          "ARCHIVO_TIPO_ESTADO",
          "ARCHIVO_SOLICITUD_PROCESO.ID_PROCESO_ARCHIVO = ARCHIVO_TIPO_ESTADO.ID_ESTADO"
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
          "ARCHIVO_SOLICITUD_PROCESO.NRO_SOLICITUD = SOLICITANTE.NRO_SOLICITUD"
        )
        .where("ARCHIVO_SOLICITUD_PROCESO.ESTADO_ACTUAL = :ESTADO", {
          ESTADO: "S",
        })
        .andWhere(
          "TO_CHAR(ARCHIVO_SOLICITUD_PROCESO.FECHA_PROCESO, 'DD/MM/YYYY') = TO_CHAR(SYSDATE, 'DD/MM/YYYY')"
        )
        .andWhere("ARCHIVO_TIPO_DOCUMENTO.DESCRIPCION = :DESCRIPCION", {
          DESCRIPCION: "Carpeta Placa",
        })
        .groupBy("SOLICITANTE.NOMBRE_USUARIO_QX")
        .orderBy("TOTAL")
        .getRawMany();

      if (total.length > 0) {
        res.status(200).json(total);
      } else {
        res.status(404).json({ message: "Not found", total: 0 });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }

  async userDocumentsByMonth(req: Request, res: Response) {
    try {
      const total = await AppDataSource.createQueryBuilder()
        .select("P1.NOMBRE_USUARIO_QX", "SOLICITANTE")
        .addSelect("COUNT(*)", "TOTAL")
        .from("ARCHIVO_SOLICITUD_PROCESO", "ARCHIVO_SOLICITUD_PROCESO")
        .innerJoin(
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_SOLICITUD_PROCESO.TIPO_DOC_ARCHIVO = ARCHIVO_TIPO_DOCUMENTO.ID_TIPO_DOC"
        )
        .innerJoin(
          "QX_USUARIO",
          "QX_USUARIO",
          "ARCHIVO_SOLICITUD_PROCESO.ID_USUARIO = QX_USUARIO.ID_USUARIO_QX"
        )
        .innerJoin(
          "ARCHIVO_MOTIVO",
          "ARCHIVO_MOTIVO",
          "ARCHIVO_SOLICITUD_PROCESO.ID_MOTIVO = ARCHIVO_MOTIVO.ID_MOTIVO"
        )
        .innerJoin(
          "ARCHIVO_TIPO_ESTADO",
          "ARCHIVO_TIPO_ESTADO",
          "ARCHIVO_SOLICITUD_PROCESO.ID_PROCESO_ARCHIVO = ARCHIVO_TIPO_ESTADO.ID_ESTADO"
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
          "ARCHIVO_SOLICITUD_PROCESO.NRO_SOLICITUD = P1.NRO_SOLICITUD"
        )
        .where("ARCHIVO_SOLICITUD_PROCESO.ESTADO_ACTUAL = :ESTADO", {
          ESTADO: "S",
        })
        .andWhere(
          "TO_CHAR(ARCHIVO_SOLICITUD_PROCESO.FECHA_PROCESO, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY')"
        )
        .andWhere("ARCHIVO_TIPO_DOCUMENTO.DESCRIPCION = :DESCRIPCION", {
          DESCRIPCION: "Carpeta Placa",
        })
        .groupBy("P1.NOMBRE_USUARIO_QX")
        .orderBy("TOTAL")
        .getRawMany();
      if (total.length > 0) {
        res.status(200).json(total);
      } else {
        res.status(404).json({ message: "Not found", total: 0 });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }
}

export default new UserFilesController();
