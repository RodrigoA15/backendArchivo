import * as foldersOutRepository from "../repositories/foldersOutRepository";

export const getAllFoldersOutByMonth = async () => {
  const folders = await foldersOutRepository.getAllFoldersOutByMonth();
  return folders;
};

export const getTotalFoldersOutByDay = async () => {
  const folders = await foldersOutRepository.getAllFoldersOutByDay();
  return folders;
};
