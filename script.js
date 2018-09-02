var RecipeApp = function () {

    var recipes = [];

    var $recipes = $('.recipes');

    var recipeId = 2;
    var ingredientId = 1;

    var createRecipe = function (name, image) {
        var recipe = {
            name: name,
            image: image,
            ingredients: [],
            id: recipeId
        };
        recipeId++;
        recipes.push(recipe);
    };

    var createIngredients = function (recipeId, ingredientText) {
        ingredient = {
            name: ingredientText,
            id: ingredientId
        }
        let i = _findRecipeIdIndex(recipeId)
        recipes[i].ingredients.push(ingredient)
        ingredientId++
    };

    const _findRecipeIdIndex = function (recipeId) {
        for (let i = 0; i < recipes.length; i++) {
            if (recipeId == recipes[i].id) {
                return i
            }}
    }

    const _findIngredientIndex = function (recipeId,ingredientId) {
        let i = _findRecipeIdIndex(recipeId)
        for (let a = 0; a < recipes[i].ingredients.length; a++) {
            if (ingredientId == recipes[i].ingredients[a].id) {
                return a
            }}
    }


    const removeRecipe = function (recipeId) {
        let i = _findRecipeIdIndex(recipeId)
        recipes.splice(i, 1)
    }

    const removeIngredient = function (recipeId,ingredientId){
        let i = _findRecipeIdIndex(recipeId)
        let a =  _findIngredientIndex(recipeId,ingredientId)
        recipes[i].ingredients.splice(a,1)
    }

    const renderRecipes2 = function () {
        $recipes.empty();
        const source = $("#recipe-template").html()
        const template = Handlebars.compile(source)
        let newHTML = template({ recipe: recipes })
        $recipes.append(newHTML)
    }

    return {
        createRecipe: createRecipe,
        renderRecipes2: renderRecipes2,
        createIngredients: createIngredients,
        removeRecipe: removeRecipe,
        removeIngredient:removeIngredient
    }
};

var app = RecipeApp();


$('.add-recipe').on('click', function () {
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();
    app.createRecipe(name, image);
    app.renderRecipes2();
});

$('.recipes').on('click', '.add-ingredients', function () {
    let ingredientText = $(this).closest('.mb-3').find('.inputIngredient').val();
    let recipeId = $(this).closest('.recipe').data().id
    app.createIngredients(recipeId, ingredientText);
    app.renderRecipes2();
})

$('.recipes').on('click', '.remove-recipe', function () {
    let recipeId = $(this).closest('.recipe').data().id
    app.removeRecipe(recipeId)
    app.renderRecipes2();
})

$('.recipes').on('click', '.remove-ingredient', function () {
    let recipeId = $(this).closest('.recipe').data().id
    let ingredientId = $(this).closest('.ingredient').data().id
    app.removeIngredient(recipeId,ingredientId)
    app.renderRecipes2();
})