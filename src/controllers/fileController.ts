import { Request, Response } from "express";
import { AppDataSource } from "../db/connection";

class archivoController {
  constructor() {}

  async documentsOutByDay(req: Request, res: Response) {
    try {
      const total = await AppDataSource.createQueryBuilder()
        .select("COUNT(*) as TOTAL")
        .from("ARCHIVO_SOLICITUD_PROCESO", "ARCHIVO_SOLICITUD_PROCESO")
        .innerJoin(
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_SOLICITUD_PROCESO.TIPO_DOC_ARCHIVO = ARCHIVO_TIPO_DOCUMENTO.ID_TIPO_DOC"
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
          "ARCHIVO_SOLICITUD",
          "ARCHIVO_SOLICITUD",
          "ARCHIVO_SOLICITUD_PROCESO.NRO_SOLICITUD = ARCHIVO_SOLICITUD.NRO_SOLICITUD"
        )
        .innerJoin(
          "QX_USUARIO",
          "QX_USUARIO",
          "ARCHIVO_SOLICITUD_PROCESO.ID_USUARIO = QX_USUARIO.ID_USUARIO_QX"
        )
        .where("ARCHIVO_SOLICITUD_PROCESO.ESTADO_ACTUAL =:ESTADO_ACTUAL", {
          ESTADO_ACTUAL: "S",
        })
        .andWhere("ARCHIVO_TIPO_DOCUMENTO.DESCRIPCION =:DESCRIPCION", {
          DESCRIPCION: "Carpeta Placa",
        })
        .andWhere(
          "TO_CHAR(ARCHIVO_SOLICITUD_PROCESO.FECHA_PROCESO, 'DD/MM/YYYY') = TO_CHAR(SYSDATE, 'DD/MM/YYYY')"
        )
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

  async documentsOutByMonth(req: Request, res: Response) {
    try {
      const total = await AppDataSource.createQueryBuilder()
        .select("COUNT(*) as TOTAL")
        .from("ARCHIVO_SOLICITUD_PROCESO", "ARCHIVO_SOLICITUD_PROCESO")
        .innerJoin(
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_SOLICITUD_PROCESO.TIPO_DOC_ARCHIVO = ARCHIVO_TIPO_DOCUMENTO.ID_TIPO_DOC"
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
          "ARCHIVO_SOLICITUD",
          "ARCHIVO_SOLICITUD",
          "ARCHIVO_SOLICITUD_PROCESO.NRO_SOLICITUD = ARCHIVO_SOLICITUD.NRO_SOLICITUD"
        )
        .innerJoin(
          "QX_USUARIO",
          "QX_USUARIO",
          "ARCHIVO_SOLICITUD_PROCESO.ID_USUARIO = QX_USUARIO.ID_USUARIO_QX"
        )
        .where("ARCHIVO_SOLICITUD_PROCESO.ESTADO_ACTUAL =:ESTADO_ACTUAL", {
          ESTADO_ACTUAL: "S",
        })
        .andWhere("ARCHIVO_TIPO_DOCUMENTO.DESCRIPCION =:DESCRIPCION", {
          DESCRIPCION: "Carpeta Placa",
        })
        .andWhere(
          "TO_CHAR(ARCHIVO_SOLICITUD_PROCESO.FECHA_PROCESO, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY')"
        )
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

  async documentsOutByYear(req: Request, res: Response) {
    try {
      const total = await AppDataSource.createQueryBuilder()
        .select("COUNT(*) as TOTAL")
        .from("ARCHIVO_SOLICITUD_PROCESO", "ARCHIVO_SOLICITUD_PROCESO")
        .innerJoin(
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_TIPO_DOCUMENTO",
          "ARCHIVO_SOLICITUD_PROCESO.TIPO_DOC_ARCHIVO = ARCHIVO_TIPO_DOCUMENTO.ID_TIPO_DOC"
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
          "ARCHIVO_SOLICITUD",
          "ARCHIVO_SOLICITUD",
          "ARCHIVO_SOLICITUD_PROCESO.NRO_SOLICITUD = ARCHIVO_SOLICITUD.NRO_SOLICITUD"
        )
        .innerJoin(
          "QX_USUARIO",
          "QX_USUARIO",
          "ARCHIVO_SOLICITUD_PROCESO.ID_USUARIO = QX_USUARIO.ID_USUARIO_QX"
        )
        .where("ARCHIVO_SOLICITUD_PROCESO.ESTADO_ACTUAL =:ESTADO_ACTUAL", {
          ESTADO_ACTUAL: "S",
        })
        .andWhere("ARCHIVO_TIPO_DOCUMENTO.DESCRIPCION =:DESCRIPCION", {
          DESCRIPCION: "Carpeta Placa",
        })
        .andWhere(
          "TO_CHAR(ARCHIVO_SOLICITUD_PROCESO.FECHA_PROCESO, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')"
        )
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

export default new archivoController();
