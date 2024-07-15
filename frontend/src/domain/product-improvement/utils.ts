export const mapProductImprovementData = (data) => {
  return data.map((productImprovement) => ({
    id: productImprovement.productImprovementId.toString(),
    name: productImprovement.productImprovementName,
    icon: productImprovement.productImprovementIcon,
  }));
};
