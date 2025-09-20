
const userModel = require("../Model/UserModel")

const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    // Initialize item object if not present
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Add size or increase quantity
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = userData.cartData || {};

    if (quantity === 0) {
      if (cartData[itemId]) {
        delete cartData[itemId][size];

        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);

    // ✅ Return empty cart if not available
    const cartData = userData.cartData || {};

    res.json({ success: true, cart: cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


module.exports = { addToCart, updateCart, getUserCart };
