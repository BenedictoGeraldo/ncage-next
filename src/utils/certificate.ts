import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs/promises";
import path from "path";

export async function generateCertificate(data: {
  ncage_code: string;
  entity_name: string;
  street: string;
  city: string;
  stt: string;
  psc: string;
  tel: string;
  ema: string;
  www: string;
}): Promise<Buffer> {
  const templatePath = path.join(process.cwd(), "Indonesia Certificate Template.docx");
  const content = await fs.readFile(templatePath, "binary");

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: "${", end: "}" },
  });

  const today = new Date();
  const year = today.getFullYear().toString();
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const monthRomawi = [
    "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII",
  ];

  doc.render({
    nomor_bulan_romawi: monthRomawi[today.getMonth()],
    tahun_download: year,
    bulan_download: monthNames[today.getMonth()],
    ncage_code: data.ncage_code,
    entity_name: data.entity_name,
    street: data.street,
    city: data.city,
    stt: data.stt,
    psc: data.psc,
    tel: data.tel,
    ema: data.ema,
    www: data.www,
  });

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  return buf;
}
