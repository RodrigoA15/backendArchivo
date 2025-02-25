import fs from "node:fs";
import multer from "multer";
import { join } from "node:path";
import SambaClient from "samba-client";
import { Request, Response } from "express";
import evidenceSchema from "../../../schemas/EvidenceFile.schema";
import { EvidenceFile } from "../../../interfaces/evidenceFile.interface";
import { CounterService } from "../../../services/files/Counters/counter.service";
// import { ADDRES, DOMAIN, MASK_CMD, MAX_PROTOCOL } from "../../../config";
export class EvidenceFileRepository {
  private evidenceFile = evidenceSchema;
  private counterService = new CounterService();

  public async createEvidence(
    dataEvidence: EvidenceFile | EvidenceFile[]
  ): Promise<EvidenceFile[]> {
    //Validacion Array
    const evidenceArray = Array.isArray(dataEvidence)
      ? dataEvidence
      : [dataEvidence];

    // Generar un consecutivo diferente para cada elemento
    const evidenceWithConsecutive = await Promise.all(
      evidenceArray.map(async (evidence) => {
        const consecutive = await this.counterService.getNextSequenceValue(
          "evidence_file"
        );
        return { ...evidence, consecutive };
      })
    );

    return await this.evidenceFile.insertMany(evidenceWithConsecutive, {
      ordered: true,
    });
  }

  public async importFile(req: Request, res: Response): Promise<any> {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString("default", {
      month: "long",
    });
    const day = currentDate.getDate().toString().padStart(2, "0");
    const sambaOptions = {
      address: "\\\\192.168.28.97pqr",
      username: "",
      password: "",
      domain: "WORKGROUP",
      maxProtocol: "SMB3",
      maskCmd: true,
    };

    new SambaClient(sambaOptions);

    const pathPDF = join(
      `\\\\192.168.28.97\\pqr\\evidence_files\\${year}\\${month}\\${day}`
    );

    if (!fs.existsSync(pathPDF)) {
      try {
        fs.mkdirSync(pathPDF, { recursive: true });
        console.log("Directorio creado");
      } catch (error) {
        console.log("No se creo el directorio");
      }
    }

    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, pathPDF);
      },

      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new Error("Solo se permiten archivos PDF"));
        }
      },
    });

    upload.single("EVIDENCE_FILES_R")(req, res, async (err) => {
      let fileName = req.file;
      if (err) {
        console.log(`Sucedio un error al momento de subir el archivo ${err}`);
      }

      if (!req.file) {
        console.log("No se ha enviado ningun archivo");
      }

      console.log(fileName?.path);
    });
  }

  public async getFile(id: string): Promise<any> {
    return await this.evidenceFile.findOne({ _id: id });
  }
}
