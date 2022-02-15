"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    function clickOnMeat() {
        if (doenerTrainer.capacity.meat === 0) {
            let meat = (document.getElementById("ingredientMeat"));
            meat.addEventListener("click", clickOnMeat);
            meat.removeEventListener("click", clickOnMeat);
        }
        else {
            doenerTrainer.capacity.meat = doenerTrainer.capacity.meat - 1;
            doenerTrainer.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageMeat");
            image.setAttribute("src", "pics/ingredient_meat.png");
            ingredientsDiv.appendChild(image);
            doenerTrainer.orderAnalyser.meat = true;
        }
    }
    doenerTrainer.clickOnMeat = clickOnMeat;
    function clickOnLettuce() {
        if (doenerTrainer.capacity.lettuce === 0) {
            let lettuce = (document.getElementById("ingredientLettuce"));
            lettuce.addEventListener("click", clickOnLettuce);
            lettuce.removeEventListener("click", clickOnLettuce);
        }
        else {
            doenerTrainer.capacity.lettuce = doenerTrainer.capacity.lettuce - 1;
            doenerTrainer.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageLettuce");
            image.setAttribute("src", "pics/ingredient_lettuce.png");
            ingredientsDiv.appendChild(image);
            doenerTrainer.orderAnalyser.lettuce = true;
        }
    }
    doenerTrainer.clickOnLettuce = clickOnLettuce;
    function clickOnMushrooms() {
        if (doenerTrainer.capacity.mushrooms === 0) {
            let mushrooms = (document.getElementById("ingredientMushroom"));
            mushrooms.addEventListener("click", clickOnMushrooms);
            mushrooms.removeEventListener("click", clickOnMushrooms);
        }
        else {
            doenerTrainer.capacity.mushrooms = doenerTrainer.capacity.mushrooms - 1;
            doenerTrainer.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageMushrooms");
            image.setAttribute("src", "pics/ingredient_mushrooms.png");
            ingredientsDiv.appendChild(image);
            doenerTrainer.orderAnalyser.mushrooms = true;
        }
    }
    doenerTrainer.clickOnMushrooms = clickOnMushrooms;
    function clickOnOnion() {
        if (doenerTrainer.capacity.onions === 0) {
            let onions = (document.getElementById("ingredientOnion"));
            onions.addEventListener("click", clickOnOnion);
            onions.removeEventListener("click", clickOnOnion);
        }
        else {
            doenerTrainer.capacity.onions = doenerTrainer.capacity.onions - 1;
            doenerTrainer.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageOnion");
            image.setAttribute("src", "pics/ingredient_onion.png");
            ingredientsDiv.appendChild(image);
            doenerTrainer.orderAnalyser.onion = true;
        }
    }
    doenerTrainer.clickOnOnion = clickOnOnion;
    function clickOnTomato() {
        if (doenerTrainer.capacity.tomatoes === 0) {
            let tomatoes = (document.getElementById("ingredientTomato"));
            tomatoes.addEventListener("click", clickOnTomato);
            tomatoes.removeEventListener("click", clickOnTomato);
        }
        else {
            doenerTrainer.capacity.tomatoes = doenerTrainer.capacity.tomatoes - 1;
            doenerTrainer.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageTomato");
            image.setAttribute("src", "pics/ingredient_tomato.png");
            ingredientsDiv.appendChild(image);
            doenerTrainer.orderAnalyser.tomato = true;
        }
    }
    doenerTrainer.clickOnTomato = clickOnTomato;
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=ingredients.js.map