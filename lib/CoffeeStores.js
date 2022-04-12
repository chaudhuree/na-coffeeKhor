// initialize unsplash
import { createApi } from 'unsplash-js';

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API,
  //...other fetch options
});


const getUrl=(latLong,query,limit)=>{
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20220105&limit=${limit}`
}

export const CoffeeStores = async () => {

  // unsplash photo fetch
  const photos= await unsplashApi.search.getPhotos({
    query: 'coffee store',
    page: 1,
    perPage: 10,
  });
  console.log(photos);
  const unsplashResults = photos.response?.results || [];
  const photo=unsplashResults.map((result) => result.urls["small"]);
  console.log(photo);
  // foursquare fetch
  const response = await fetch(
    getUrl("23.750698345114404,90.39043205078158", "coffee stores", 7)
    // 23.750698345114404, 90.39043205078158
    ,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_KEY},
      },
  )
 


  const data = await response.json();
  console.log(data);
  return data?.results.map((data,index)=>{
    return{
        imgUrl:photo[index],
        ...data
    }
  })
    }
