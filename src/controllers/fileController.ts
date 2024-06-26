import { Request, Response } from "express";
import { AppDataSource } from "../db/connection";

class archivoController {
  constructor() {}

  async documentsOutByDay(req: Request, res: Response) {
    try {
      const total = await AppDataSource.createQueryBuilder()
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
          "TO_CHAR(ASP.FECHA_PROCESO, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')"
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
