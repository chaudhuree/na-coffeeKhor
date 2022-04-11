

export const CoffeeStores = async () => {
  const response = await fetch(
    "https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575,-79.39545615725015&query=coffee stores&v=20220105&limit=6",
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_KEY},
      },
  )
 


  const data = await response.json();
  console.log(data);
  return data?.results;
    }

    