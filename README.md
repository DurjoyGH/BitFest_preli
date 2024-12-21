Challenge 2: Mofa's Kitchen Buddy

1.Get All Recipes: 

  Route: /api/recipes/recommend
  Method: POST
  Sample Payload:
 ```
 [
      
     {
      "_id": "60d5f9b5f8d2b814c8a5e9b1",
      "name": "Chocolate Cake",
      "ingredients": "2 cups flour, 1 cup sugar, 1/2 cup cocoa powder, 1 cup milk",
      "steps": "Preheat oven to 350F -> Mix dry ingredients -> Add milk and mix well -> Bake for 30 minutes",
      "taste": "Sweet",
      "reviews": ["Delicious!", "Best cake ever!"],
      "cuisineType": "Dessert",
      "preparationTime": "45 minutes"
     },
    
    {
      "_id": "60d5f9b5f8d2b814c8a5e9b2",
      "name": "Pasta Alfredo",
      "ingredients": "200g pasta, 100g butter, 1 cup cream, 1/2 cup parmesan cheese, Salt and pepper to taste",
      "steps": "Boil pasta until al dente -> Melt butter in a pan -> Add cream and simmer -> Stir in parmesan cheese -> Mix pasta with sauce -> Season with salt and pepper",
      "taste": "Rich",
      "reviews": ["Creamy and delicious!", "My favorite pasta recipe!"],
      "cuisineType": "Italian",
      "preparationTime": "25 minutes"
    },
  
    {
      "_id": "60d5f9b5f8d2b814c8a5e9b3",
      "name": "Chicken Curry",
      "ingredients": "500g chicken, 2 onions, 3 tomatoes, 1 tablespoon curry powder, 1 teaspoon cumin, 1 tablespoon ginger-garlic paste, Salt to taste",
      "steps": "Sauté onions until golden -> Add ginger-garlic paste and cook -> Add chopped tomatoes and cook until soft -> Add chicken pieces and cook -> Add spices and simmer -> Serve hot with rice",
      "taste": "Spicy",
      "reviews": ["Aromatic and flavorful!", "Perfect with steamed rice!"],
      "cuisineType": "Indian",
      "preparationTime": "40 minutes"
    },
  
    {
      "_id": "60d5f9b5f8d2b814c8a5e9b4",
      "name": "Vegetarian Pizza",
      "ingredients": "1 pizza dough, 1 cup tomato sauce, 1/2 cup mozzarella cheese, 1/2 cup bell peppers, 1/2 cup olives, 1/2 cup mushrooms, 1 teaspoon oregano",
      "steps": "Preheat oven to 400F -> Roll out the pizza dough -> Spread tomato sauce over the dough -> Top with cheese and vegetables -> Sprinkle with oregano -> Bake for 15-20 minutes",
      "taste": "Savory",
      "reviews": ["Perfectly crispy and cheesy!", "Great for a vegetarian dinner!"],
      "cuisineType": "Italian",
      "preparationTime": "30 minutes"
    },
  
    {
      "_id": "60d5f9b5f8d2b814c8a5e9b5",
      "name": "Apple Pie",
      "ingredients": "2 cups flour, 1 cup butter, 1/4 cup sugar, 1 teaspoon cinnamon, 5 apples, 1 tablespoon lemon juice, 1/4 cup brown sugar",
      "steps": "Prepare pie crust -> Peel and slice apples -> Mix apples with sugar, cinnamon, and lemon juice -> Fill crust with apple mixture -> Cover with another layer of crust -> Bake at 375F for 45 minutes",
      "taste": "Sweet",
      "reviews": ["Classic dessert!", "Perfect for fall!"],
      "cuisineType": "American",
      "preparationTime": "1 hour"
    }
  ]
```

2.Add a New Recipe (Text):

  Route: /api/recipes/text
  Method: POST
  
    Sample Payload:
    {
        "recipeText": "Recipe Name: Lemon Tart\nIngredients: 1 1/2 cups flour, 1/2 cup butter, 3 tablespoons sugar, 2 eggs, 1/4 cup lemon juice, 1 teaspoon vanilla extract\nSteps: Prepare crust -> Mix eggs, sugar, and lemon juice -> Pour mixture into crust -> Bake at 350F for 25 minutes\nTaste": "Tangy\nReviews": ["Refreshing and zesty!", "Perfect balance of sweet and sour!"],\nCuisine Type": "Dessert\nPreparation Time": "40 minutes"
    }

    Sample Response:
    {
        "message": "Recipe added successfully",
        "recipe": {
            "_id": "60d5f9b5f8d2b814c8a5e9b6",
            "name": "Lemon Tart",
            "ingredients": "1 1/2 cups flour, 1/2 cup butter, 3 tablespoons sugar, 2 eggs, 1/4 cup lemon juice, 1 teaspoon vanilla extract",
            "steps": "Prepare crust -> Mix eggs, sugar, and lemon juice -> Pour mixture into crust -> Bake at 350F for 25 minutes",
            "taste": "Tangy",
            "reviews": ["Refreshing and zesty!", "Perfect balance of sweet and sour!"],
            "cuisineType": "Dessert",
            "preparationTime": "40 minutes",
            "updatedAt": "2024-04-27T13:00:00.000Z"
        }
    }


3. Add a New Recipe (Image):
        Route: /api/recipes/image
        Method: POST
        Sample Payload:
            Form Data:
                image: (Image file containing the recipe)
    
        Sample Response:
        {
            "message": "Recipe added from image",
            "recipe": {
                "_id": "60d5f9b5f8d2b814c8a5e9b7",
                "name": "Strawberry Smoothie",
                "ingredients": "1 cup strawberries, 1 banana, 1/2 cup yogurt, 1/2 cup milk, 1 tablespoon honey",
                "steps": "Blend strawberries, banana, yogurt, and milk -> Add honey and blend until smooth -> Serve chilled",
                "taste": "Sweet",
                "reviews": ["Refreshing and healthy!", "Perfect for a summer day!"],
                "cuisineType": "Beverage",
                "preparationTime": "10 minutes",
                "updatedAt": "2024-04-27T13:15:00.000Z"
            }
        }


4. Error Responses:
   # Missing Required Fields (POST /api/recipes/text):
     ```
          Sample Response:
          {
              "message": "Missing required fields: recipeText."
          }
     ```
  
   #Invalid Image File (POST /api/recipes/image):
      ```
      Sample Response:
          {
              "message": "Invalid image file format. Please upload a valid image file."
          }
      ```
      
   #Invalid Recipe ID (Any PUT Endpoints):
   ```
          Sample Response:
          {
               "message": "Invalid recipe ID"
          }
   ```

    
