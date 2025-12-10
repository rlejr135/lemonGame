export function useRecipeCompare() {
  function buildMatrix(recipeA, recipeB) {
    const steps = Object.keys(recipeA);
    const rowParams = Object.keys(recipeA[steps[0]]);

    const matrix = {};

    for (const param of rowParams) {
      matrix[param] = {};

      for (const step of steps) {
        matrix[param][step] = {
          A: recipeA[step][param],
          B: recipeB[step][param]
        };
      }
    }

    return { steps, rowParams, matrix };
  }

  return { buildMatrix };
}
