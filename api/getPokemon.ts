import apiClient from "./apiClient";
export default async function getPokemon(pokemonName: string) {
  const { data } = await apiClient.get(`/pokemon/${pokemonName}`);
  return data;
}