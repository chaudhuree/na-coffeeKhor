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
          const records = findCoffeeStoreRecord.map(record => {
            return {
              recordId: record.id,
              ...record.fields
            }
          })
          if(records.length!==0){
          // const record=records[0]
          const calCulateVoting=Number(records[0].voting)+1
          // console.log({ calCulateVoting });
          // update record
          const updateRecord = await table.update([
            {
              id: records[0].recordId,
              fields: {
                voting: calCulateVoting,
              },
            },
          ]);
          // if(updateRecord){
          //   const fvrecord= updateRecord.map( frecord => {
          //     frecord.fields
          //   })
          // }
          const data = updateRecord.map(record=>{
            return{
              ...record.fields
            }
          })
          res.status(200)
          res.json(data)
        }
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
      res.json({ message: 'error in upVoting api(favouriteCoffeeStoreById)', error: error.message })
    }
  }
}
  export default favouriteCoffeeStoreById;