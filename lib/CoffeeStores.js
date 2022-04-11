const getUrl=(latLong,query,limit)=>{
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20220105&limit=${limit}`
}

export const CoffeeStores = async () => {
  const response = await fetch(
    getUrl("43.65267326999575,-79.39545615725015", "coffee stores", 7)
    ,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_KEY},
      },
  )
 


  const data = await response.json();
  console.log(data);
  return data?.results;
    }

    // 