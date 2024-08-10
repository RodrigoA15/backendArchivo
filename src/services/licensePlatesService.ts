import * as licensePlatesRepository from "../repositories/licensePlatesRepository";

// Function to get total license plates by day
export const totalAllLicensesByDay = async () => {
  const total = await licensePlatesRepository.totalAllLicensesByDay();
  return total;
};

export const getAllLicensesReturn = async () => {
  const total = await licensePlatesRepository.getAllLicensesReturn();
  return total;
};

export const totalLicensesOutArchive = async () => {
  const total = await licensePlatesRepository.totalLicensesOutArchive();
  return total;
};

export const getAllLicensesByDays = async () => {
  const total = await licensePlatesRepository.getAllLicensesByDays();
  return total;
};

export const getAllLicensesByMonth = async () => {
  const total = await licensePlatesRepository.getAllLicensesByMonth();
  return total;
};

export const getAllLicensesReturnMonths = async () => {
  const total = await licensePlatesRepository.getAllLicensesReturnMonths();
  return total;
};

export const getAllLicensesLastYear = async () => {
  const total = await licensePlatesRepository.getAllLicensesLastYear();
  return total;
};

export const getAllLicensesByUserQX = async () => {
  const total = await licensePlatesRepository.getAllLicensesByUserQX();
  return total;
};

export const getVehicleClassReturned = async () => {
  const total = await licensePlatesRepository.getVehicleClassReturned();
  return total;
};

export const getAllLicencesPlatesInfo = async () => {
  const data = await licensePlatesRepository.getAllLicencesPlatesInfo();
  //Agrupar matriculas por semana
  const semanas = [...new Set(data.map((user) => user.SEMANA))];
  const total = semanas.map((semana) => {
    return {
      semana: `${semana}`,
      data: data.filter((user) => user.SEMANA === semana),
    };
  });

  return total;
};
