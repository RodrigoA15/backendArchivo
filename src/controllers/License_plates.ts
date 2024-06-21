import { Request, Response } from "express";
// import { AppDataSource } from "../db/connection";

class License_plates_Controller {
  constructor() {}

  // async licensePlatesByDay(req: Request, res: Response) {
  //   try {
  //     const total = await AppDataSource.createQueryBuilder()
  //       .select("COUNT(*) AS TOTAL")
  //       .from("SOLICITUD_PROCESO", "SOLICITUD_PROCESO")
  //       .innerJoin(
  //         "SOLICITUD_MAESTRO",
  //         "SOLICITUD_MAESTRO",
  //         "SOLICITUD_PROCESO.NRO_TRAMITE = SOLICITUD_MAESTRO.NRO_TRAMITE"
  //       )
  //       .innerJoin(
  //         "MATRICULAS_INICIALES",
  //         "MATRICULAS_INICIALES",
  //         "SOLICITUD_MAESTRO.NRO_TRAMITE = MATRICULAS_INICIALES.NRO_TRAMITE"
  //       )
  //       .where(
  //         "TO_CHAR(SOLICITUD_MAESTRO.FECHA_REGISTRA, 'DD/MM/YYYY') = TO_CHAR(SYSDATE, 'DD/MM/YYYY')"
  //       )
  //       .andWhere(
  //         "SOLICITUD_PROCESO.ID_PROCESO_SOLICITUD =:ID_PROCESO_SOLICITUD",
  //         {
  //           ID_PROCESO_SOLICITUD: "9",
  //         }
  //       )
  //       .getRawMany();

  //     if (total.length > 0) {
  //       res.status(200).json(total);
  //     } else {
  //       res.status(404).json({ message: "Not found", TOTAL: 0 });
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(500).json(error.message);
  //     }
  //   }
  // }
}

export default new License_plates_Controller();
