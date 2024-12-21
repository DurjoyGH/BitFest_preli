const express = require("express");
const multer = require("multer");
const fs = require("fs");
const tesseract = require("tesseract.js");
const path = require("path");

const router = express.Router();


const upload = multer({ dest: "uploads/" });

const RECIPES_FILE = "my_fav_recipes.txt";

if (!fs.existsSync(RECIPES_FILE)) {
  fs.writeFileSync(RECIPES_FILE, "", "utf8");
}

const saveRecipe = ({ name, ingredients, steps, taste, reviews, cuisineType, preparationTime, imagePath }) => {
  const recipeData = `
  Recipe Name: ${name}
  Ingredients: ${ingredients.join(", ")}
  Steps: ${steps.join(" -> ")}
  Taste: ${taste}
  Reviews: ${reviews.join(", ")}
  Cuisine Type: ${cuisineType}
  Preparation Time: ${preparationTime}
  Image Path: ${imagePath}
  -------------------------------
  `;
  fs.appendFileSync(RECIPES_FILE, recipeData, "utf8");
};
  
  router.post("/text", (req, res) => {
    const { name, ingredients, steps, taste, reviews, cuisineType, preparationTime } = req.body;
  
    if (!name || !ingredients || !steps || !taste || !reviews || !cuisineType || !preparationTime || !Array.isArray(ingredients) || !Array.isArray(steps)) {
      return res.status(400).json({ message: "Invalid recipe data. Ensure all fields are provided and ingredients/steps are arrays." });
    }
  
    saveRecipe({ name, ingredients, steps, taste, reviews, cuisineType, preparationTime });
    res.status(201).json({ message: "Recipe added successfully." });
  });
  
  router.post("/image", upload.single("image"), async (req, res) => {
    const { file } = req;
  
    if (!file) {
      return res.status(400).json({ message: "No image uploaded." });
    }
  
    try {
      const imagePath = path.resolve(file.path);
      const result = await tesseract.recognize(imagePath, "eng");
      const recipeText = result.data.text.trim();
  
      console.log("Extracted Text:", recipeText);
  
      if (!recipeText) {
        return res.status(400).json({ message: "No text found in the image." });
      }
  
      const [nameLine, ...otherLines] = recipeText.split("\n").map(line => line.trim()).filter(line => line);
      const name = nameLine.replace("Recipe Name:", "").trim();
      const ingredients = otherLines
        .find(line => line.startsWith("Ingredients:"))
        ?.replace("Ingredients:", "")
        ?.split(",")
        ?.map(ing => ing.trim()) || [];
      const steps = otherLines
        .find(line => line.startsWith("Steps:"))
        ?.replace("Steps:", "")
        ?.split("->")
        ?.map(step => step.trim()) || [];
  
      const taste = otherLines.find(line => line.startsWith("Taste:"))?.replace("Taste:", "").trim() || "Unknown";
      const reviews = otherLines.filter(line => line.startsWith("Review:")).map(line => line.replace("Review:", "").trim()) || [];
      const cuisineType = otherLines.find(line => line.startsWith("Cuisine Type:"))?.replace("Cuisine Type:", "").trim() || "Unknown";
      const preparationTime = otherLines.find(line => line.startsWith("Preparation Time:"))?.replace("Preparation Time:", "").trim() || "Unknown";
  
      if (!name || !ingredients.length || !steps.length) {
        return res.status(400).json({ message: "Invalid recipe format in the image text." });
      }
  
      saveRecipe({ name, ingredients, steps, taste, reviews, cuisineType, preparationTime });
  
      fs.unlinkSync(imagePath);
  
      res.status(201).json({ message: "Recipe added successfully from image." });
    } catch (error) {
      res.status(500).json({ message: "Error processing image.", error });
    }
  });
  
router.get("/", (req, res) => {
    try {
      const recipesText = fs.readFileSync(RECIPES_FILE, "utf8").trim();
  
      if (!recipesText) {
        return res.status(200).json({ recipes: [] });
      }
  
      const recipesArray = recipesText
        .split("-------------------------------")
        .filter((recipeText) => recipeText.trim())
        .map((recipeText) => {
          const lines = recipeText.trim().split("\n").map((line) => line.trim());
  
          const nameLine = lines.find((line) => line.startsWith("Recipe Name:"));
          const ingredientsLine = lines.find((line) => line.startsWith("Ingredients:"));
          const stepsLine = lines.find((line) => line.startsWith("Steps:"));
          const tasteLine = lines.find((line) => line.startsWith("Taste:"));
          const reviewsLine = lines.find((line) => line.startsWith("Reviews:"));
          const cuisineLine = lines.find((line) => line.startsWith("Cuisine Type:"));
          const timeLine = lines.find((line) => line.startsWith("Preparation Time:"));
  
          const name = nameLine ? nameLine.replace("Recipe Name:", "").trim() : "Unnamed Recipe";
          const ingredients = ingredientsLine ? ingredientsLine.replace("Ingredients:", "").split(",").map(ing => ing.trim()) : [];
          const steps = stepsLine ? stepsLine.replace("Steps:", "").split("->").map(step => step.trim()) : [];
          const taste = tasteLine ? tasteLine.replace("Taste:", "").trim() : "";
          const reviews = reviewsLine ? reviewsLine.replace("Reviews:", "").split(",").map(review => review.trim()) : [];
          const cuisineType = cuisineLine ? cuisineLine.replace("Cuisine Type:", "").trim() : "";
          const preparationTime = timeLine ? timeLine.replace("Preparation Time:", "").trim() : "";
  
          return { name, ingredients, steps, taste, reviews, cuisineType, preparationTime };
        });
  
      res.status(200).json({ recipes: recipesArray });
    } catch (error) {
      res.status(500).json({ message: "Error reading recipes file.", error });
    }
  });  

module.exports = router;
