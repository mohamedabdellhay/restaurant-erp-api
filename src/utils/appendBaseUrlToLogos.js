/**
 * Helper function to append BASE_URL to logo URLs in restaurant object
 */
const appendBaseUrlToLogos = (restaurant) => {
  if (!restaurant) return restaurant;

  const restaurantObj = restaurant.toObject
    ? restaurant.toObject()
    : restaurant;

  // Append BASE_URL to main logo
  if (restaurantObj.logo) {
    restaurantObj.logo = `${process.env.BASE_URL}${restaurantObj.logo}`;
  }

  // Append BASE_URL to theme logo
  if (restaurantObj.settings?.theme?.logo) {
    restaurantObj.settings.theme.logo = `${process.env.BASE_URL}${restaurantObj.settings.theme.logo}`;
  }

  return restaurantObj;
};

export default appendBaseUrlToLogos;
