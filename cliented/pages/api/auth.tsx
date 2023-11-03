// Your Next.js API route
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
const Cookies=require('js-cookie')
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Sample user data (replace this with your actual user data)
const users = [{ id: 1, name: 'roshan', password: 'password' }];

// Generate a random secret key (replace this with your own secure secret key)
const JWT_SECRET = JSON.stringify(process.env.SECRET_KEY);
console.log(JWT_SECRET)

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
   
    // Extract the username and password from the request body
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find((user) => user.name === username);

    if (!user) {
      // User not found
      return res.status(401).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in user data
    if (password !== user.password) {
      // Invalid password
      console.log(password,user.password)
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    console.log("set_cookie")
    console.log(token)
   
    //   try{
        
    //     Cookies.set("loginToken",token,{expires:1/30,domain:"http://localhost:3000",path:"/"});
    //   }catch(err){
    //     console.log(err)
    //   }
    
    // console.log("token_saves")

    // Return the token in the response
     return res.status(200).json({ token });
  }
};
