export const mapProductRatingData = (data) => {
  return data.map((productRating) => ({
    id: productRating.productRatingId.toString(),
    name: productRating.productRatingName,
    icon: productRating.productRatingIcon,
  }));
};
