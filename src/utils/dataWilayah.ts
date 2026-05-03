export const PROVINSI = [
  { id: "11", nama: "ACEH" },
  { id: "12", nama: "SUMATERA UTARA" },
  { id: "31", nama: "DKI JAKARTA" },
  { id: "32", nama: "JAWA BARAT" },
  { id: "33", nama: "JAWA TENGAH" },
  { id: "34", nama: "DI YOGYAKARTA" },
  { id: "35", nama: "JAWA TIMUR" },
  { id: "51", nama: "BALI" },
];

export const KOTA: Record<string, { id: string; nama: string }[]> = {
  "11": [{ id: "1171", nama: "BANDA ACEH" }],
  "12": [{ id: "1271", nama: "MEDAN" }],
  "31": [
    { id: "3171", nama: "JAKARTA PUSAT" },
    { id: "3172", nama: "JAKARTA UTARA" },
    { id: "3173", nama: "JAKARTA BARAT" },
    { id: "3174", nama: "JAKARTA SELATAN" },
    { id: "3175", nama: "JAKARTA TIMUR" },
  ],
  "32": [
    { id: "3273", nama: "BANDUNG" },
    { id: "3271", nama: "BOGOR" },
    { id: "3276", nama: "DEPOK" },
    { id: "3275", nama: "BEKASI" },
  ],
  "33": [
    { id: "3374", nama: "SEMARANG" },
    { id: "3372", nama: "SURAKARTA" },
  ],
  "34": [
    { id: "3471", nama: "YOGYAKARTA" },
    { id: "3404", nama: "SLEMAN" },
  ],
  "35": [
    { id: "3578", nama: "SURABAYA" },
    { id: "3573", nama: "MALANG" },
  ],
  "51": [
    { id: "5171", nama: "DENPASAR" },
    { id: "5103", nama: "BADUNG" },
  ],
};
