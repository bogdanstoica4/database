const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
//const loading = require("loading-cli");

/**
 * constants
 */
const uri = "mongodb+srv://bogdanstoica4:Nobi1234@cluster0.ym3fj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("persons").find({}).count();

    /**
     * If existing records then delete the current collections
     */
    if (results) {
      db.dropDatabase();
    }


    /**
     * Import the JSON data into the database
     */

    const data = await fs.readFile(path.join(__dirname, "bsdata.json"), "utf8");
    await db.collection("persons").insertMany(JSON.parse(data));

    
    console.info(
      `users collection set up!`
    );


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
