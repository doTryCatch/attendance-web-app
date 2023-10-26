export default  (req, res) => {
    if (req.method=="POST"){


    const { email, password } = req.body;
  
    // Find the user by email
    const user = users.find((user) => user.email === email);
  
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
  
    // Compare the provided password with the hashed password in user data
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY, // Replace with your secret key
        { expiresIn: '1d' } // Adjust expiration as needed
      );
  
      // Return the token
      res.status(200).json({ token });
    });
}
}

  