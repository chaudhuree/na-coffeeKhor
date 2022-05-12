const getCoffeeStoreById =(req,res)=>{
    const {id}=req.query;
    try {
      res.json({message:`id is created ${id}`})
    } catch (error) {
      res.status(500)
      res.json({message:'error to get data from api',error})
    }
}

export default getCoffeeStoreById;