import { CoffeeStores } from "../../lib/CoffeeStores";

const getCoffeeStoresByLocation = async (req, res) => {
  try{
    const {latLong,limit}=req.query;
    const response=await CoffeeStores(latLong,limit);
    res.status(200)
    res.json(response)
  }catch(err){
    console.log(err);
    res.status(500)
    res.json({  message:"oh no there is an error",err})

  }
  // return
}
export default getCoffeeStoresByLocation;