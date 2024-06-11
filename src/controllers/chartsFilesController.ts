import { Request, Response } from "express";
import { AppDataSource } from "../db/connection";

class ChartFilesController {
  constructor() {}

  async chartByDay(req: Request, res: Response) {
    try {
      const total = await AppDataSource.createQueryBuilder()
        .select("EXTRACT(DAY FROM FECHA_PROCESO) AS DIA")
        .addSelect("COUNT(*) AS TOTAL")
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
        .where("ARCHIVO_SOLICITUD_PROCESO.ESTADO_ACTUAL =:ESTADO_ACTUAL", {
          ESTADO_ACTUAL: "S",
        })
        .andWhere(
          "TO_CHAR(FECHA_PROCESO, 'MM/YYYY') = TO_CHAR(SYSDATE , 'MM/YYYY')"
        )
        .andWhere("ARCHIVO_TIPO_DOCUMENTO.DESCRIPCION =:DESCRIPCION", {
          DESCRIPCION: "Carpeta Placa",
        })
        .groupBy("EXTRACT(DAY FROM FECHA_PROCESO)")
        .orderBy("DIA")
        .getRawMany();
      if (total.length > 0) {
        res.status(200).json(total);
      } else {
        res.status(404).json({ message: "Not found", TOTAL: 0 });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }

  async chartByMonth(req: Request, res: Response) {
    try {
      const total = await AppDataSource.createQueryBuilder()
        .select("EXTRACT(MONTH FROM FECHA_PROCESO) AS MES")
        .addSelect("COUNT(*) AS TOTAL")
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
        .where("ARCHIVO_SOLICITUD_PROCESO.ESTADO_ACTUAL =:ESTADO_ACTUAL", {
          ESTADO_ACTUAL: "S",
        })
        .andWhere("ARCHIVO_TIPO_DOCUMENTO.DESCRIPCION =:DESCRIPCION", {
          DESCRIPCION: "Carpeta Placa",
        })
        .andWhere("TO_CHAR(FECHA_PROCESO, 'YYYY') = TO_CHAR(SYSDATE , 'YYYY')")
        .groupBy("EXTRACT(MONTH FROM FECHA_PROCESO)")
        .orderBy("MES")
        .getRawMany();
      if (total.length > 0) {
        res.status(200).json(total);
      } else {
        res.status(404).json({ message: "Not found", TOTAL: 0 });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }
}

export default new ChartFilesController();
