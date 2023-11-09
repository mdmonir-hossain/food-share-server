const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n1jeyy1.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const foodCollection = client.db("fooddb").collection("food");
    const requestfoodCollection = client.db("fooddb").collection("requestfood");
   
    app.put("/Updatefood/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatefood = req.body;
      const foods = {
        $set: {
          name: updateProducts.name,
          image: updateProducts.image,
          brandname: updateProducts.brandname,
          type: updateProducts.type,
          price: updateProducts.price,
          rating: updateProducts.rating,
          description: updateProducts.description,

          additionalNotes:updateProducts.additionalNotes,

donatorEmail:updatefood.donatorEmail,

donatorImage:updatefood.donatorImage,

donatorName:updatefood.donatorName,

expiredDate:updatefood.expiredDate,

foodImage:updatefood.foodImage,

foodName:updatefood
.foodName,

foodQuantity:updatefood.foodQuantity,

foodStatus:updatefood.foodQuantity,

pickupLocation:updatefood.pickupLocation,

        },
      };
      const result = await foodCollection.updateOne(filter,foods,options);

      res.send(result);
    });

    app.post("/food", async (req, res) => {
      const addfood = req.body;
      console.log(addfood);
      const result = await foodCollection.insertOne(addfood);
      res.send(result);
    });
    app.post("/requestfood", async (req, res) => {
      const addrequestfood = req.body;
      console.log(addrequestfood);
      const result = await requestfoodCollection.insertOne(addrequestfood);
      res.send(result);
    });

    app.get("/food", async (req, res) => {
        const cursor = foodCollection.find().limit(6).sort({foodQuantity:-1});
        const result = await cursor.toArray();
        res.send(result);
      });

    app.get("/foodall", async (req, res) => {
        const cursor = foodCollection.find().sort({expiredDate:1});
        const result = await cursor.toArray();
        res.send(result);
      });

    app.get("/requestfood", async (req, res) => {
        const cursor = requestfoodCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      });
    
      app.delete("/requestfood/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id:new ObjectId(id)  }
        const result = await requestfoodCollection.deleteOne(query);
        res.send(result);
      });
      app.delete("/Delete/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id:new ObjectId(id)  }
        const result = await foodCollection.deleteOne(query);
        res.send(result);
      });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server running port: ${port}`);
});
