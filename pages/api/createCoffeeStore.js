const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

const table = base('Table 1');
console.log({ table });

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    try {
      const findCoffeeStoreRecord = await table.select({
        filterByFormula: `id="1"`,
      }).firstPage()
      console.log({ findCoffeeStoreRecord });
      if (findCoffeeStoreRecord.length != 0) {
        const record = findCoffeeStoreRecord.map(record => {
          return {
            ...record.fields
          }
        })
        res.json(record)
      } else {
        res.json({ message: 'create database' })
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