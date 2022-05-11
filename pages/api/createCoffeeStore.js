const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

const table = base('Table 1');
console.log({ table });

const createCoffeeStore = async (req, res) => {
  const { id, name, address, imgUrl, voting, country } = req.body;
  if (req.method === "POST") {
    try {
      // try to find coffeeStore with specific id
      if(id){const findCoffeeStoreRecord = await table.select({
        filterByFormula: `id="${id}"`,
      }).firstPage()
      console.log({ findCoffeeStoreRecord });
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
      } else {
        // check if id or name is given or not

        if (id && name) {

          // if id and name availlabe then create data using below
          const createRecords = await table.create([
            {
              "fields": {
                // "id": "3",
                // "name": "juicy coffee store",
                // "address": "my address",
                // "imgUrl": "https://img1.com",
                // "voting": 20,
                // "country": "BD",
                // get all the value from req.body
                id,
                name,
                address,
                imgUrl,
                voting,
                country,
              }
            }
          ])
          // after creating new database with given data then store the data in record
          const record = createRecords.map(record => {
            return {
              ...record.fields
            }
          })
          // send the data using res.json
          res.json({ message: 'created database', record })
        }else{
          res.json({message:"id or name is missing"})
          res.status(500)
        }
      }}else{
        res.status(400)
        res.json({message:'id is missing'})
      }
      
    }
    catch (err) {
      console.log('error creating or finding a store:', err);
      res.status(500)
      res.json({ message: 'error creating or finding a store:', err })
    }
  }
}
export default createCoffeeStore;