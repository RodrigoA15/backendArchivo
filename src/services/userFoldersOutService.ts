import * as userFoldersOutRepository from "../repositories/userFoldersOutRepository";

export const getAllFoldersUserDay = async () => {
  const totalUser = await userFoldersOutRepository.getAllFoldersUserDay();
  return totalUser;
};

export const getAllFoldersUserMonth = async () => {
  const totalUser = await userFoldersOutRepository.getAllFoldersUserMonth();
  return totalUser;
};
