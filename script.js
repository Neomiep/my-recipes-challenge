var RecipeApp = function () {

    var recipes = [
        // { 
        //     id: 1,
        //     name: 'Best Chicken Soup!', 
        //     image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
        //     ingredients: [
        //         { name: 'whole chicken' },
        //         { name: 'medium carrots'},
        //         { name: 'onions' },
        //     ] 
        // }
    ];

    var $recipes = $('.recipes');

    var recipeId = 2;

    var ingredientId = 1;


    var createRecipe = function(name, image){
        var recipe = {
            name: name,
            image: image, 
            ingredients: [],
            id: recipeId
        };

        recipeId ++; 

        recipes.push(recipe);
    };

    const _findRecipeIdIndex = function(recipeId){
        for(let i = 0; i < recipes.length; i ++){
            if(recipeId==recipes[i].id){
                return i
            }
        }
    }

    var createIngredients = function(recipeId, ingredientText){
        ingredient = {
            name:ingredientText,
            id:ingredientId
        }
        let i =  _findRecipeIdIndex(recipeId)
        recipes[i].ingredients.push(ingredient)
        ingredientId++
        console.log(recipes)
    };

    // var _createIngredientsHTML = function(recipe){
    //     var recipesHTML = "";
    //         for(let a = 0; a < recipe.ingredients.length; a ++){
    //         recipesHTML += "<li data-id:'"+ recipe.ingredients[a].id +"'>" + recipe.ingredients[a].name + "</li>"
    // }
    //     return recipesHTML;
    // };

    const removeRecipe = function(recipeId){
        let i =  _findRecipeIdIndex(recipeId)
        recipes.splice(i,1)

    }

    const renderRecipes2 = function(){
        $recipes.empty();
        const source = $("#recipe-template").html()
        const template = Handlebars.compile(source)
        let newHTML = template({recipe:recipes})
        $recipes.append(newHTML)
    }

    // var renderRecipes = function () {
    //     $recipes.empty();

    //     for(var i = 0; i < recipes.length; i ++){
    //         var recipe = recipes[i];

    //         var ingredients = _createIngredientsHTML(recipe); 

    //         $recipes.append(
    //             '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' + 
    //                 '<h4 class="text-capitalize font-italic text-center">' + recipe.name + '</h4>'+
    //                 '<button class="btn btn-danger remove-recipe" type="button">Remove Button</button>' +
    //                 '<img class="recipe-img" src="' + recipe.image + '"/>' +
    //                 '<hr>' +
    //                 '<h5 class="font-italic font-bold text-center">Ingredients</h5>' +
    //                 '<div class="input-group mb-3 parent">' +
    //                     '<div class="input-group-prepend">' +
    //                         '<button class="add-ingredients input-group-text" id="basic-addon3">Add Ingredients</button>' +
    //                     '</div>' + 
    //                     '<input type="text" class="form-control inputIng" id="basic-url" aria-describedby="basic-addon3">' +
                        
    //                 '</div>' +
    //                 '<ul class="ingredients">' + ingredients + '</ul>'+
    //             '</div>'
    //         );
    //     }
    //     console.log(recipes)
    // };

    return {
        createRecipe: createRecipe,
        // renderRecipes: renderRecipes,
        renderRecipes2:renderRecipes2,
        createIngredients: createIngredients,
        removeRecipe: removeRecipe,
        recipes:recipes
    }
};

var app = RecipeApp();


$('.add-recipe').on('click', function(){
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();
    app.createRecipe(name, image);
    app.renderRecipes2();
});
$('.recipes').on('click','.add-ingredients',function(){
    let ingredientText = $(this).closest('.mb-3').find('.inputIng').val();
    let recipeId = $(this).closest('.recipe').data().id
    app.createIngredients(recipeId, ingredientText);
    app.renderRecipes2();
})
$('.recipes').on('click','.remove-recipe',function(){
    let recipeId = $(this).closest('.recipe').data().id
    app.removeRecipe(recipeId)
    app.renderRecipes2();

})
