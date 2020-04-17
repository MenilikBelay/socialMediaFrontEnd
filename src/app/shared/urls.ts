/**
 * File for URLs
 */

export const BASE_URL = "http://localhost:3000/"; // notice the trailing slash

const ADMIN_URL = `${BASE_URL}admin/`; // notice the trailing slash

export const unHealthyWordsURL = `${ADMIN_URL}unhealthywords/`;
export const deleteUnhealthywordsURL = (id: string): string =>
  `${ADMIN_URL}unhealthyword/${id}`;
export const createUnhealthyWord = `${ADMIN_URL}unhealthyword`;
