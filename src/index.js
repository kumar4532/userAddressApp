import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
import User from "./models/user.model.js";
import Address from "./models/address.model.js";

dotenv.config({
    path: './.env'
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/user/register', async (req, res) => {
    try {
      const { username, name, street, city, state, zipCode } = req.body;

      if (!username) {
        return res.status(400).json("Please enter username");
      }

      const lowerUser = username.toLowerCase();
  
      let user = await User.findOne({ username });
  
      if (user) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      user = new User({ username: lowerUser, name });
      await user.save();

      const address = new Address({
        user: user._id,
        street,
        city,
        state,
        zipCode
      });
      await address.save();
  
      user.addresses.push(address._id);
      await user.save();
  
      res.status(201).json({ message: 'User and address created successfully', user, address });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user and address', error: error.message });
    }
  });
  
  app.post('/api/user/:username/address', async (req, res) => {
    try {
      const { street, city, state, zipCode } = req.body;
      const {username} = req.params
      const lowerUser = username.toLowerCase();
      const user = await User.findOne({ username: lowerUser });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const address = new Address({
        user: user._id,
        street,
        city,
        state,
        zipCode
      });
      await address.save();
  
      user.addresses.push(address._id);
      await user.save();
  
      res.status(201).json({ message: 'Address added successfully', address });
    } catch (error) {
      res.status(500).json({ message: 'Error adding address', error: error.message });
    }
  });
  
  app.get('/api/user/:username', async (req, res) => {
    try {
      const {username} = req.params
      const lowerUser = username.toLowerCase();
      const user = await User.findOne({username: lowerUser}).populate('addresses');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user.addresses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching addresses', error: error.message });
    }
  });

connectDB()
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`Server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection Failed !!!", err);
    })