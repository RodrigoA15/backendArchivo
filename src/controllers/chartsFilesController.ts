import { Request, Response } from "express";
// import { AppDataSource } from "../db/connection";
import Connection from "../db/connection";

const conexion = Connection();
class ChartFilesController {
  constructor() {}

  async chartByDay(req: Request, res: Response) {
    try {
      const total = await (
        await conexion
      ).execute(
        "SELECT DISTINCT  EXTRACT(DAY FROM FECHA_PROCESO) AS DIA, COUNT(*) TOTAL FROM  ARCHIVO_SOLICITUD_PROCESO ASP INNER JOIN ARCHIVO_TIPO_DOCUMENTO ATD ON ASP.TIPO_DOC_ARCHIVO = ATD.ID_TIPO_DOC INNER JOIN ARCHIVO_MOTIVO ON ASP.ID_MOTIVO = ARCHIVO_MOTIVO.ID_MOTIVO INNER JOIN ARCHIVO_INVENTARIO_PLACA AIP ON ASP.PLACA_INVENTARIO = AIP.PLACA_INVENTARIO WHERE ASP.ESTADO_ACTUAL = 'S' AND FECHA_PROCESO > TO_DATE('2022/06/01', 'YYYY/MM/DD') AND AIP.ID_ESTADO = 3 AND ATD.DESCRIPCION = 'Carpeta Placa' GROUP BY EXTRACT(DAY FROM FECHA_PROCESO)"
      );
      res.status(200).json(total.rows);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ChartFilesController();
