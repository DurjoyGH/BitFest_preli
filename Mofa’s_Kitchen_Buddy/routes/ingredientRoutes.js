const express = require('express');
const Ingredient = require('../models/Ingredient');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const { name, quantity, unit } = req.query;
  
      if (!name || !quantity || !unit) {
        return res.status(400).json({ message: "Missing required fields: name, quantity, or unit." });
      }

      const existingIngredient = await Ingredient.findOne({ name });
      if (existingIngredient) {
        return res.status(400).json({ message: "Ingredient already exists. Use the update endpoint." });
      }
  
      const ingredient = new Ingredient({ 
        name, 
        quantity: parseFloat(quantity), 
        unit 
      });
      await ingredient.save();
      res.status(201).json({ message: "Ingredient added successfully", ingredient });
    } catch (error) {
      res.status(500).json({ message: "Error adding ingredient", error });
    }
});
  

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity, action } = req.body;
  
      const parsedQuantity = parseFloat(quantity);
      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity. Must be a positive number." });
      }
  
      const validActions = ['ADD', 'REMOVE'];
      if (!validActions.includes(action)) {
        return res.status(400).json({ message: "Invalid action. Use 'ADD' or 'REMOVE'." });
      }
  
      const ingredient = await Ingredient.findById(id);
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }

      if (action === 'ADD') {
        ingredient.quantity += parsedQuantity;
      } else if (action === 'REMOVE') {
        ingredient.quantity -= parsedQuantity;
        if (ingredient.quantity < 0) ingredient.quantity = 0;
      }
  
      ingredient.updatedAt = new Date();
      await ingredient.save();
  
      res.status(200).json({ message: "Ingredient updated successfully", ingredient });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: "Invalid ingredient ID" });
      }
      res.status(500).json({ message: "Error updating ingredient", error });
    }
  });
  
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ingredients", error });
  }
});

module.exports = router;