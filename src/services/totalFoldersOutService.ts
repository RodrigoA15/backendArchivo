import * as totalFoldersOutRepository from "../repositories/totalFoldersOutRepository";

export const getTotalFoldersOutByDay = async () => {
  const totalDay = await totalFoldersOutRepository.getTotalFoldersOutByDay();
  return totalDay;
};

export const getTotalFoldersOutByMonth = async () => {
  const totalMonth =
    await totalFoldersOutRepository.getTotalFoldersOutByMonth();
  return totalMonth;
};

export const getTotalFoldersOutByYear = async () => {
  const totalYear = await totalFoldersOutRepository.getTotalFoldersOutByYear();
  return totalYear;
};
