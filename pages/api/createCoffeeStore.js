const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

const table = base('Table 1');
console.log({ table });

const createCoffeeStore = async (req, res) => {
  const { id, name, address, imgUrl, voting, country } = req.body;
  if (req.method === "POST") {
    try {
      if(id){const findCoffeeStoreRecord = await table.select({
        filterByFormula: `id="${id}"`,
      }).firstPage()
      console.log({ findCoffeeStoreRecord });
      if (findCoffeeStoreRecord.length != 0) {
        const record = findCoffeeStoreRecord.map(record => {
          return {
            ...record.fields
          }
        })
        res.status(200)
        res.json(record)
      } else {


        if (id && name) {

          // 
          const createRecords = await table.create([
            {
              "fields": {
                // "id": "3",
                // "name": "juicy coffee store",
                // "address": "my address",
                // "imgUrl": "https://img1.com",
                // "voting": 20,
                // "country": "BD",
                id,
                name,
                address,
                imgUrl,
                voting,
                country,
              }
            }
          ])
          const record = createRecords.map(record => {
            return {
              ...record.fields
            }
          })
          // 
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