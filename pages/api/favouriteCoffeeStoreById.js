const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);
const table = base('Table 1');

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      // try to find coffeeStore with specific id
      if (id) {
        const findCoffeeStoreRecord = await table.select({
          filterByFormula: `id="${id}"`,
        }).firstPage()
        // console.log({ findCoffeeStoreRecord });
        // if coffeeStore is available 
        if (findCoffeeStoreRecord.length != 0) {
          const record = findCoffeeStoreRecord.map(record => {
            return {
              ...record.fields
            }
          })
          res.status(200)
          res.json(record)
          // if coffeestore is not available then
        }
        else {
          res.status(500)
          res.json({ message: 'id does not match with any id.given id:' ,id })
        }
      }else{
        res.status(500)
        res.json({ message: 'id is missing' })
      }
    } catch (error) {
      res.json({ message: 'error in upVoting api(favouriteCoffeeStoreById)', error })
    }
  }
}
  export default favouriteCoffeeStoreById;