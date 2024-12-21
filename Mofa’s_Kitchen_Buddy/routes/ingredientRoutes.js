const express = require('express');
const Ingredient = require('../models/Ingredient');
const router = express.Router();

// Add a new ingredient
router.post('/', async (req, res) => {
  try {
    const { name, quantity, unit } = req.body;

    // Check if the ingredient already exists
    const existingIngredient = await Ingredient.findOne({ name });
    if (existingIngredient) {
      return res.status(400).json({ message: "Ingredient already exists. Use the update endpoint." });
    }

    const ingredient = new Ingredient({ name, quantity, unit });
    await ingredient.save();
    res.status(201).json({ message: "Ingredient added successfully", ingredient });
  } catch (error) {
    res.status(500).json({ message: "Error adding ingredient", error });
  }
});

// Update an ingredient (shopping or cooking)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, action } = req.body;

    // Find the ingredient by ID
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    // Update quantity based on action
    if (action === 'ADD') {
      ingredient.quantity += quantity;
    } else if (action === 'REMOVE') {
      ingredient.quantity -= quantity;
      if (ingredient.quantity < 0) ingredient.quantity = 0;
    } else {
      return res.status(400).json({ message: "Invalid action. Use 'ADD' or 'REMOVE'." });
    }

    ingredient.updatedAt = new Date();
    await ingredient.save();
    res.status(200).json({ message: "Ingredient updated successfully", ingredient });
  } catch (error) {
    res.status(500).json({ message: "Error updating ingredient", error });
  }
});

// Get all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ingredients", error });
  }
});

module.exports = router;