const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

const table = base('Table 1');
console.log({ table });

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const findCoffeeStoreRecord = await table.select({
      filterByFormula: `id="1"`,
    }).firstPage()
    console.log({findCoffeeStoreRecord});
    if (findCoffeeStoreRecord.length != 0) {
      res.json(findCoffeeStoreRecord)
    } else {
      res.json({ message: 'create database' })
    }
  }
}
export default createCoffeeStore;