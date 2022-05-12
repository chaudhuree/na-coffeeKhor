const favouriteCoffeeStoreById = (req, res) => {
  if(req.method==="PUT"){
const {id}=req.body;
    res.json({ message: 'it works',id })


  }else{
    res.json({ message: 'it does not work' })
  }
}
export default favouriteCoffeeStoreById;