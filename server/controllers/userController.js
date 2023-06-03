const User = require('../models/userModel');

// get all users
const getAllUsers= async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single user by id
const getUserById = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({id:data.userId}).exec();
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found", ok: false });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error", ok: false });
  }
};


// update a user password
const updateUserPassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await User.findOne({id:userId}).exec();
    if (user.password !== oldPassword) {
      return res.status(401).send({ message: "Incorrect old password", ok: false });
    }
    user.password = newPassword;
    console.log(user)
    await user.save();
    res.send({ message: "Password updated successfully", ok: true });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", ok: false });
  }
};


// delete a user by id
const deleteUserById = async (req, res) => {
  const { userId } = req.body;
  User.findByIdAndDelete(userId, function (err, user) {
    if (err) {
      res.status(500).send({ message: "Internal server error", ok: false });
    } else {
      if (user) {
        res.send({ message: "Account deleted!", ok: true });
      } else {
        res.status(404).send({ message: "User not found", ok: false });
      }
    }
  });
};

// create a new user
const createUser = async (req, res) => {
  try {
    const { username, email,password} = req.body;
    // 
    let userExists = false;
    let emailExists = false;
    let usernameExists = false;
    let maxId = 0;
    // 
    const users = await User.find();
    users.forEach((user) => {
      if (user.email === email) {
        userExists = true;
        emailExists = true;
      } else if (user.username === username) {
        userExists = true;
        usernameExists = true;
      }
      if (user.id >= maxId) {
        maxId = user.id + 1;
      }
    });
    if (!userExists) {
      const newUser = new User({
      id:maxId,
      username,
      email,
      password,
      cart:[],
      orders:[],
      accDate:new Date()
    });
    const savedUser = await newUser.save();
    // console.log('savedUser ==> ',savedUser)
    res.send({
      message: "Your account created successfully !",
      ok: true,
      userId: savedUser.id,
      username:username
    });
    } else if (usernameExists) {
      res.send({ message: "This username is already in use !", ok: false });
    } else if (emailExists) {
      res.send({ message: "This email is already in use !", ok: false });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// add a product to user cart
const addProductToCart = async (req, res) => {
  try {
    const { userId, price, name, color, image, id } = req.body;
    const user = await User.findOne({id:userId}).exec();
    if (user) {
      const productExists = user.cart.some(
        (item) => item.id === id && item.color === color
      );
      if (productExists) {
        res.send({message: "This product already exists in your cart!",ok: false});
      } else {
        user.cart.push({
          id: id,
          name: name,
          price: price,
          image: image,
          color: color,
          quantity: 1,
        });
        await user.save();
        res.send({ message: "Product added to your cart!", ok: true });
      }
    } else {
      res.status(404).send({ message: "User not found", ok: false });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", ok: false });
  }
};




// delete a product from user cart
const deleteProductFromCart = async (req, res) => {
  const { userId, id, color } = req.body;
  try {
    const result = await User.updateOne(
      { id: userId },
      { $pull: { cart: { id: id, color: color } } }
    );
    console.log('result => ',result)
    if (result.modifiedCount > 0) {
      res.send({ message: "The product is deleted", ok: true });
    } else {
      res.status(404).send({ message: "Product not found in the cart", ok: false });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error", ok: false });
  }
};


// update quantity
const editProduct = async (req, res) => {
  const { userId, id, color, newQuantity } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { id: userId, "cart.id": id, "cart.color": color },
      { $set: { "cart.$.quantity": newQuantity } },
      { new: true }
    );
    
    if (user) {
      res.send({ message: "Cart item quantity updated!", ok: true });
    } else {
      res.status(404).send({
        message: "Failed to update cart item quantity. Please try again.",
        ok: false,
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error", ok: false });
  }
};


// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.send({
        message: "Correct!",
        ok: true,
        userId: user._id,
        username: user.username,
      });
    } else {
      res.send({
        message: "Email or password is incorrect!",
        ok: false,
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error", ok: false });
  }
};

// checkout
const checkout = (req, res) => {
  const {userId,firstName,lastName,email,address,city,zipCode,paymentMethodId,total} = req.body;
  User.findById(userId, function (err, user) {
    if (err) {
      res.status(500).send({ message: "Internal server error", ok: false });
    } else {
      if (user) {
        if (user.cart.length === 0) {
          return res.status(400).send({ message: "Cart is empty", ok: false });
        }
        let order = {
          products: user.cart,
          total: total,
          date: new Date(),
        };
        user.orders.push(order);
        user.cart = [];
        user.save(function (err, savedUser) {
          if (err) {
            res
              .status(500)
              .send({ message: "Internal server error", ok: false });
          } else {
            res.send({ message: "Order confirmed!", ok: true });
          }
        });
      } else {
        res.status(404).send({ message: "User not found", ok: false });
      }
    }
  });
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserPassword,
  deleteUserById,
  addProductToCart,
  deleteProductFromCart,
  editProduct,
  login,
  checkout
};
