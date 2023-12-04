var displayedMealIds = new Set();

function fetchMealsByIds(mealIds) {
    var searchResults = document.getElementById('searchResults');

if (!searchResults) 
{

    console.error("Element with ID 'searchResults' not found.");
        return;
    }
 displayedMealIds.clear();
 searchResults.innerHTML = '';
  mealIds.forEach(mealId => 
 {  if (!displayedMealIds.has(mealId)) 
    {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
 .then(response => response.json())
 .then(data => {
                  
 if (data.meals && data.meals.length > 0)
  {
var meal = data.meals[0];  
    displayMeal(meal);
      displayedMealIds.add(mealId);
} 

else { 
    console.error(`Meal with ID ${mealId} not found.`);
 }

 })

.catch(error => console.error('Error fetching data:', error));
 }

    });
    
}

function displayMeal(meal) {
    var searchResults = document.getElementById('searchResults');
    var mealDiv = document.createElement('div');
    mealDiv.classList.add('meal');

    mealDiv.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
    `;

    searchResults.appendChild(mealDiv);
}

function searchMeals() {
    fetchMealsByIds(['52772', '52843', '52945', '52825', '52940']);
}
