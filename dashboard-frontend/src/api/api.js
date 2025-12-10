import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

// 사용자 목록
export const fetchUsers = () => API.get("/users");

// 사용자 선택 단계 API
export const fetchYears = (user) =>
  API.get(`/user/${user}/years`);

export const fetchDatasets = (user, year) =>
  API.get(`/user/${user}/${year}/datasets`);

export const fetchEquipments = (user, year, dataset) =>
  API.get(`/user/${user}/${year}/${dataset}/equipments`);

export const fetchRecipe = (user, year, dataset, eqp) =>
  API.get(`/recipe/${user}/${year}/${dataset}/${eqp}`);

export default API;
