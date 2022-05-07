const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

const table = base('Table 1');
console.log({ table });

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    try {
      const findCoffeeStoreRecord = await table.select({
        filterByFormula: `id="4"`,
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
        



        // 
       const createRecords= await table.create([
          {
            "fields": {
              "id": "3",
              "name": "juicy coffee store",
              "address": "my address",
              "imgUrl": "https://img1.com",
              "voting": 20,
              "country": "BD"
            }
          }
        ])
        const record = createRecords.map(record => {
          return {
            ...record.fields
          }})
        // 
        res.json({ message: 'created database', record })
      }
    }
    catch (err) {
      console.log('airtable data error:', err);
      res.status(500)
      res.json({ message: "something is wrong with airtable ", err })
    }
  }
}
export default createCoffeeStore;