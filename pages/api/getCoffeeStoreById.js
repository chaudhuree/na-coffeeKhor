const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

const table = base('Table 1');
const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    // try to find coffeeStore with specific id
    if (id) {
      const findCoffeeStoreRecord = await table.select({
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
      }
      else {
        res.status(500)
        res.json({ message: 'id is not found' })
      }
    }
  } catch (error) {
    res.status(500)
    res.json({ message: 'error to get data from api', error })
  }
}

export default getCoffeeStoreById;