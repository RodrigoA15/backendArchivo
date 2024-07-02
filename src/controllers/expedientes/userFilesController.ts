import { Request, Response } from "express";
import {
  userTotal,
  expdientesTotal,
  expdientesbByDay,
  expdientesbByMonth,
  expdientesbByYear,
} from "../../consultas/userTotal";

import { AppDataSource, Connection } from "../../db/connection";
class UserFilesController {
  constructor() {}

  async userDocumentsByDay(req: Request, res: Response) {
    try {
      const total = await AppDataSource.createQueryBuilder()
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

  async userTotalDocuments(req: Request, res: Response) {
    try {
      const data: { [key: string]: any } = {};
      const query = await userTotal();

      query.forEach((i) => {
        if (!data.hasOwnProperty(i.ID_USUARIO_QX)) {
          data[i.ID_USUARIO_QX] = {
            id_usuario: i.ID_USUARIO_QX,
            nombre_usuario: i.NOMBRE_USUARIO_QX,
            data: [],
            total_dias: 0,
            max_dia: 0,
            menores_60: 0,
            entre_60_y_180: 0,
            mayores_180: 0,
          };
        }

        data[i.ID_USUARIO_QX].data.push({
          ID_USUARIO_QX: i.ID_USUARIO_QX,
          DESCRIPCION: i.DESCRIPCION,
          PLACA_INVENTARIO: i.PLACA_INVENTARIO,
          FECHA_COMPARENDO: i.FECHA_COMPARENDO,
          FECHA_REGISTRA: i.FECHA_REGISTRA,
          FUENTE: i.FUENTE,
          NOMBRE_USUARIO_QX: i.NOMBRE_USUARIO_QX,
          NOMBRE_GRUPO_QX: i.NOMBRE_GRUPO_QX,
          DESCRIPCION_ESTADO: i.DESCRIPCION_ESTADO,
          DIAS: i.DIAS,
          DIGITADO: i.DIGITADO,
          FECHA_DIGITADO: i.FECHA_DIGITADO,
        });

        // Actualizar el total de días y el día más alto
        data[i.ID_USUARIO_QX].total_dias += i.DIAS;
        if (i.DIAS > data[i.ID_USUARIO_QX].max_dia) {
          data[i.ID_USUARIO_QX].max_dia = i.DIAS;
        }

        // Contar los registros en los diferentes rangos de días
        if (i.DIAS < 60) {
          data[i.ID_USUARIO_QX].menores_60 += 1;
        } else if (i.DIAS >= 60 && i.DIAS < 180) {
          data[i.ID_USUARIO_QX].entre_60_y_180 += 1;
        } else if (i.DIAS >= 180) {
          data[i.ID_USUARIO_QX].mayores_180 += 1;
        }
      });

      // Convertir el objeto data en un array
      const result = Object.keys(data).map((key) => ({
        ...data[key],
        total_registros_usuario: data[key].data.length, // Calcular el total de registros
      }));

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocurrió un error al procesar la solicitud." });
    }
  }

  async expedientesTotal(req: Request, res: Response) {
    try {
      const total = await expdientesTotal();
      if (total.length > 0) {
        res.status(200).json(total);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async expedientesByDay(req: Request, res: Response) {
    try {
      const total = await expdientesbByDay();
      if (total.length > 0) {
        res.status(200).json(total);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async expedientesByMonth(req: Request, res: Response) {
    try {
      const total = await expdientesbByMonth();
      if (total.length > 0) {
        res.status(200).json(total);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async expedientesByYear(req: Request, res: Response) {
    try {
      const total = await expdientesbByYear();
      if (total.length > 0) {
        res.status(200).json(total);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserFilesController();
