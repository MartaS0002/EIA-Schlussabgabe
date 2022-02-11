"use strict";
// CustomersMood wird schlechter ---> fast fertig noch für andere cases machen
// jars nachfüllen braucht Zeit (setTimeout???)
// jars nachfüllen -> Mitarbeiter geht hin und "fühlt sie nach"
// ingredients (Theke) nachfüllen braucht Zeit (setTimeout???)
// displayMood Mitarbeiter
var doenerTrainer;
(function (doenerTrainer) {
    window.addEventListener("load", handleLoad);
    let imgData;
    let moveablesWorker = [];
    let moveablesCustomer = [];
    let capacity = {
        meat: 1,
        lettuce: 1,
        mushrooms: 1,
        onions: 1,
        tomatoes: 1,
    };
    let capacityJars = {
        meat: 1,
        lettuce: 1,
        mushrooms: 1,
        onions: 1,
        tomatoes: 1,
    };
    let customer;
    let orderAnalyser = {
        meat: false,
        lettuce: false,
        mushrooms: false,
        onion: false,
        tomato: false,
    };
    let numberWorkers = 0;
    let clickStart = 0;
    let verkaufteGerichte = 0;
    // let rohmateriallager: number = 0;
    function handleLoad(_event) {
        // all handleLoad
        let canvas = (document.querySelector("canvas"));
        if (!canvas)
            return;
        doenerTrainer.crc2 = canvas.getContext("2d");
        drawBackground();
        let forms = document.querySelectorAll("form");
        forms[0].addEventListener("change", handleChange);
        let button = document.querySelectorAll("button");
        button[0].addEventListener("click", start); // button click -> start simulation
        button[1].addEventListener("click", refreshPage); // button click -> refreshPage
        let finishButton = (document.getElementById("finishButton"));
        finishButton.disabled = true;
        finishButton.addEventListener("click", analyseOrder);
        let startButton = (document.getElementById("start"));
        if (numberWorkers === 0) {
            startButton.disabled = true;
        }
        let deleteButton = (document.getElementById("deleteIngredientButton"));
        deleteButton.addEventListener("click", deleteItemfromOrder);
        imgData = doenerTrainer.crc2.getImageData(0, 0, doenerTrainer.crc2.canvas.width, doenerTrainer.crc2.canvas.height);
        window.setInterval(update, 20);
    }
    function drawBackground() {
        let backgroundClass = new doenerTrainer.canvasBackground();
        backgroundClass.drawBackground();
        backgroundClass.displayJars();
    }
    function clickOnMeat() {
        if (capacity.meat === 0) {
            let meat = (document.getElementById("ingredientMeat"));
            meat.addEventListener("click", clickOnMeat);
            meat.removeEventListener("click", clickOnMeat);
        }
        else {
            capacity.meat = capacity.meat - 1;
            displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageMeat");
            image.setAttribute("src", "pics/ingredient_meat.png");
            ingredientsDiv.appendChild(image);
            orderAnalyser.meat = true;
            console.log(orderAnalyser);
        }
    }
    function clickOnLettuce() {
        if (capacity.lettuce === 0) {
            let lettuce = (document.getElementById("ingredientLettuce"));
            lettuce.addEventListener("click", clickOnLettuce);
            lettuce.removeEventListener("click", clickOnLettuce);
        }
        else {
            capacity.lettuce = capacity.lettuce - 1;
            displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageLettuce");
            image.setAttribute("src", "pics/ingredient_lettuce.png");
            ingredientsDiv.appendChild(image);
            orderAnalyser.lettuce = true;
            console.log(orderAnalyser);
        }
    }
    function clickOnMushrooms() {
        if (capacity.mushrooms === 0) {
            let mushrooms = (document.getElementById("ingredientMushroom"));
            mushrooms.addEventListener("click", clickOnMushrooms);
            mushrooms.removeEventListener("click", clickOnMushrooms);
        }
        else {
            capacity.mushrooms = capacity.mushrooms - 1;
            displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageMushrooms");
            image.setAttribute("src", "pics/ingredient_mushrooms.png");
            ingredientsDiv.appendChild(image);
            orderAnalyser.mushrooms = true;
            console.log(orderAnalyser);
        }
    }
    function clickOnOnion() {
        if (capacity.onions === 0) {
            let onions = (document.getElementById("ingredientOnion"));
            onions.addEventListener("click", clickOnOnion);
            onions.removeEventListener("click", clickOnOnion);
        }
        else {
            capacity.onions = capacity.onions - 1;
            displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageOnion");
            image.setAttribute("src", "pics/ingredient_onion.png");
            ingredientsDiv.appendChild(image);
            orderAnalyser.onion = true;
            console.log(orderAnalyser);
        }
    }
    function clickOnTomato() {
        if (capacity.tomatoes === 0) {
            let tomatoes = (document.getElementById("ingredientTomato"));
            tomatoes.addEventListener("click", clickOnTomato);
            tomatoes.removeEventListener("click", clickOnTomato);
        }
        else {
            capacity.tomatoes = capacity.tomatoes - 1;
            displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageTomato");
            image.setAttribute("src", "pics/ingredient_tomato.png");
            ingredientsDiv.appendChild(image);
            orderAnalyser.tomato = true;
            console.log(orderAnalyser);
        }
    }
    function handleChange(_event) {
        let startButton = (document.getElementById("start"));
        let target = _event.target;
        if (target.name === "numberWorkers") {
            numberWorkers = parseInt(target.value);
        }
        else if (target.name === "behaeltnisse") {
            capacity.meat = parseInt(target.value);
            capacity.lettuce = parseInt(target.value);
            capacity.mushrooms = parseInt(target.value);
            capacity.onions = parseInt(target.value);
            capacity.tomatoes = parseInt(target.value);
        }
        else if (target.name === "rohmateriallager") {
            capacityJars.meat = parseInt(target.value);
            capacityJars.lettuce = parseInt(target.value);
            capacityJars.mushrooms = parseInt(target.value);
            capacityJars.onions = parseInt(target.value);
            capacityJars.tomatoes = parseInt(target.value);
            console.log(capacityJars);
        }
        if (numberWorkers > 0) {
            startButton.disabled = false;
        }
    }
    function refreshPage() {
        window.location.reload();
    }
    function start() {
        if (numberWorkers > 10) {
            numberWorkers = 10;
        }
        if (clickStart === 0) {
            for (let i = 0; i < numberWorkers; i++) {
                callWorker();
                clickStart++;
                let startButton = (document.getElementById("start"));
                startButton.disabled = true;
            }
        }
        callCustomers();
        displayCapacity();
        console.log(customer.preferences);
        let canvas = (document.querySelector("canvas"));
        canvas.addEventListener("click", canvasClicked);
        disableForm();
    }
    function callWorker() {
        let randomX = Math.floor(Math.random() * 600) + 50;
        let randomY = Math.floor(Math.random() * 230) + 170;
        let workerClass = new doenerTrainer.Workers(new doenerTrainer.Vector(randomX, randomY), new doenerTrainer.Vector(0, 0));
        workerClass.draw();
        moveablesWorker.push(workerClass);
    }
    function update() {
        doenerTrainer.crc2.putImageData(imgData, 0, 0);
        for (let moveable of moveablesWorker) {
            moveable.move(1 / 50);
            moveable.draw();
        }
        for (let moveable of moveablesCustomer) {
            moveable.moveCustomer(1 / 50);
            moveable.draw();
        }
    }
    function canvasClicked(_event) {
        let x = _event.offsetX;
        let y = _event.offsetY;
        //Meat angeklickt
        if (y > 30 && y < 120 && x > 150 && x < 180) {
            if (capacityJars.meat === 0) {
                ////////////////////////////////////////////////////////// nachfüllen
                let jarNachfuellen = (document.getElementById("jarNachfuellen"));
                jarNachfuellen.innerHTML = "Meat nachfüllen";
            }
            else {
                capacity.meat = capacity.meat + 1;
                capacityJars.meat = capacityJars.meat - 1;
                displayCapacity();
                if (capacity.meat === 1) {
                    let meat = (document.getElementById("ingredientMeat"));
                    meat.addEventListener("click", clickOnMeat);
                }
            }
        }
        // Lettuce angeklickt
        if (y > 30 && y < 120 && x > 250 && x < 310) {
            if (capacityJars.lettuce === 0) {
            }
            else {
                capacity.lettuce = capacity.lettuce + 1;
                capacityJars.lettuce = capacityJars.lettuce - 1;
                displayCapacity();
                if (capacity.lettuce === 1) {
                    let lettuce = (document.getElementById("ingredientLettuce"));
                    lettuce.addEventListener("click", clickOnLettuce);
                }
            }
        }
        //Rooms angeklickt
        if (y > 30 && y < 120 && x > 350 && x < 410) {
            if (capacityJars.mushrooms === 0) {
            }
            else {
                capacity.mushrooms = capacity.mushrooms + 1;
                capacityJars.mushrooms = capacityJars.mushrooms - 1;
                displayCapacity();
                if (capacity.mushrooms === 1) {
                    let mushrooms = (document.getElementById("ingredientMushroom"));
                    mushrooms.addEventListener("click", clickOnMushrooms);
                }
            }
        }
        // Onion angeklickt
        if (y > 30 && y < 120 && x > 450 && x < 510) {
            if (capacityJars.onions === 0) {
            }
            else {
                capacity.onions = capacity.onions + 1;
                capacityJars.onions = capacityJars.onions - 1;
                displayCapacity();
                if (capacity.onions === 1) {
                    let onions = (document.getElementById("ingredientOnion"));
                    onions.addEventListener("click", clickOnOnion);
                }
            }
        }
        // Tomato angeklickt
        if (y > 30 && y < 120 && x > 550 && x < 610) {
            if (capacityJars.tomatoes === 0) {
            }
            else {
                capacity.tomatoes = capacity.tomatoes + 1;
                capacityJars.tomatoes = capacityJars.tomatoes - 1;
                displayCapacity();
                if (capacity.tomatoes === 1) {
                    let tomatoes = (document.getElementById("ingredientTomato"));
                    tomatoes.addEventListener("click", clickOnTomato);
                }
            }
        }
    }
    function displayCapacity() {
        let meatAmount = (document.getElementById("meatAmount"));
        meatAmount.innerHTML = "Meat: " + JSON.stringify(capacity.meat);
        let lettuceAmout = (document.getElementById("lettuceAmount"));
        lettuceAmout.innerHTML = "Lettuce: " + JSON.stringify(capacity.lettuce);
        let mushroomsAmout = (document.getElementById("mushroomsAmount"));
        mushroomsAmout.innerHTML =
            "Mushrooms: " + JSON.stringify(capacity.mushrooms);
        let onionsAmout = (document.getElementById("onionAmount"));
        onionsAmout.innerHTML = "Onions: " + JSON.stringify(capacity.onions);
        let tomatoesAmout = (document.getElementById("tomatoesAmount"));
        tomatoesAmout.innerHTML = "Tomatoes: " + JSON.stringify(capacity.tomatoes);
        //Jars
        let meatAmountJars = (document.getElementById("meatAmountJars"));
        meatAmountJars.innerHTML = "Meat: " + JSON.stringify(capacityJars.meat);
        let lettuceAmoutJars = (document.getElementById("lettuceAmountJars"));
        lettuceAmoutJars.innerHTML =
            "Lettuce: " + JSON.stringify(capacityJars.lettuce);
        let mushroomsAmoutJars = (document.getElementById("mushroomsAmountJars"));
        mushroomsAmoutJars.innerHTML =
            "Mushrooms: " + JSON.stringify(capacityJars.mushrooms);
        let onionsAmoutJars = (document.getElementById("onionAmountJars"));
        onionsAmoutJars.innerHTML =
            "Onions: " + JSON.stringify(capacityJars.onions);
        let tomatoesAmoutJars = (document.getElementById("tomatoesAmountJars"));
        tomatoesAmoutJars.innerHTML =
            "Tomatoes: " + JSON.stringify(capacityJars.tomatoes);
    }
    function callOrder() {
        let meat = (document.getElementById("ingredientMeat"));
        meat.addEventListener("click", clickOnMeat);
        let lettuce = (document.getElementById("ingredientLettuce"));
        lettuce.addEventListener("click", clickOnLettuce);
        let mushrooms = (document.getElementById("ingredientMushroom"));
        mushrooms.addEventListener("click", clickOnMushrooms);
        let onion = (document.getElementById("ingredientOnion"));
        onion.addEventListener("click", clickOnOnion);
        let tomato = (document.getElementById("ingredientTomato"));
        tomato.addEventListener("click", clickOnTomato);
        let preferenceTrue = [];
        let preferenceFalse = [];
        if (customer.preferences.meat === true) {
            preferenceTrue.push("Meat");
        }
        else {
            preferenceFalse.push("Meat");
        }
        if (customer.preferences.lettuce === true) {
            preferenceTrue.push("Lettuce");
        }
        else {
            preferenceFalse.push("Lettuce");
        }
        if (customer.preferences.mushrooms === true) {
            preferenceTrue.push("Mushrooms");
        }
        else {
            preferenceFalse.push("Mushrooms");
        }
        if (customer.preferences.onion === true) {
            preferenceTrue.push("Onion");
        }
        else {
            preferenceFalse.push("Onion");
        }
        if (customer.preferences.tomato === true) {
            preferenceTrue.push("Tomato");
        }
        else {
            preferenceFalse.push("Tomato");
        }
        let bread = [
            "pics/bread_doener.png",
            "pics/bread_pita.png",
            "pics/bread_lahmacun.png",
        ];
        let randomBread = Math.floor(Math.random() * bread.length);
        console.log(randomBread);
        let breadDiv = (document.getElementById("breadDiv"));
        let ichWill = (document.getElementById("ichWill"));
        let ichWillNicht = (document.getElementById("ichWillNicht"));
        ichWill.innerHTML = "Ich will: " + "</br>" + preferenceTrue;
        ichWillNicht.innerHTML = "Ich will nicht: " + "</br>" + preferenceFalse;
        let imageBread = (document.createElement("img"));
        imageBread.setAttribute("src", bread[randomBread]);
        imageBread.setAttribute("id", "Bread");
        breadDiv.appendChild(imageBread);
        let finishButton = (document.getElementById("finishButton"));
        finishButton.disabled = false;
    }
    doenerTrainer.callOrder = callOrder;
    function analyseOrder() {
        console.log(customer.preferences);
        console.log(orderAnalyser);
        if (customer.preferences.lettuce === orderAnalyser.lettuce &&
            customer.preferences.meat === orderAnalyser.meat &&
            customer.preferences.mushrooms === orderAnalyser.mushrooms &&
            customer.preferences.onion === orderAnalyser.onion &&
            customer.preferences.tomato === orderAnalyser.tomato) {
            console.log("happy");
        }
        else {
            let moods = ["neutral", "mad"];
            let randomMood = Math.floor(Math.random() * moods.length);
            customer.mood = moods[randomMood];
            console.log("nicht happy");
        }
        let breadDiv = (document.getElementById("breadDiv"));
        let imageBread = (document.getElementById("Bread"));
        breadDiv.removeChild(imageBread);
        let breadAndIngredients = (document.getElementById("breadAndIngredients"));
        let ingredientsDiv = (document.getElementById("ingredientsDiv"));
        breadAndIngredients.removeChild(ingredientsDiv);
        breadAndIngredients.removeChild(breadDiv);
        let addIngredientsDiv = (document.createElement("div"));
        addIngredientsDiv.setAttribute("id", "ingredientsDiv");
        breadAndIngredients.appendChild(addIngredientsDiv);
        breadAndIngredients.appendChild(breadDiv);
        orderAnalyser = {
            meat: false,
            lettuce: false,
            mushrooms: false,
            onion: false,
            tomato: false,
        };
        moveablesCustomer = [];
        customer.velocity = new doenerTrainer.Vector(6, 0);
        customer.zielposition.x = 10000;
        moveablesCustomer.push(customer);
        verkaufteGerichte++;
        let verkaufteGerichteText = (document.getElementById("verkaufteGerichte"));
        verkaufteGerichteText.innerHTML =
            "verkaufte Gerichte: " + verkaufteGerichte;
        callNewCustomer();
    }
    doenerTrainer.analyseOrder = analyseOrder;
    function callNewCustomer() {
        console.log("new customer");
        setTimeout(callCustomers, 3000);
    }
    function callCustomers() {
        let customerClass = new doenerTrainer.Customers(new doenerTrainer.Vector(600, 0), new doenerTrainer.Vector(0, 515));
        customerClass.draw();
        // console.log(customerClass.preferences);
        moveablesCustomer.push(customerClass);
        customer = customerClass;
    }
    function deleteItemfromOrder() {
        let ingredientsDiv = (document.getElementById("ingredientsDiv"));
        let orderImage = (document.getElementById("orderImage"));
        if (orderImage.getAttribute("class") === "orderImageMeat") {
            orderAnalyser.meat = false;
        }
        else if (orderImage.getAttribute("class") === "orderImageLettuce") {
            orderAnalyser.lettuce = false;
        }
        else if (orderImage.getAttribute("class") === "orderImageMushrooms") {
            orderAnalyser.mushrooms = false;
        }
        else if (orderImage.getAttribute("class") === "orderImageOnion") {
            orderAnalyser.onion = false;
        }
        else if (orderImage.getAttribute("class") === "orderImageTomato") {
            orderAnalyser.tomato = false;
        }
        ingredientsDiv.removeChild(orderImage);
    }
    function disableForm() {
        let forms = document.querySelectorAll("form");
        for (let item of forms[0]) {
            item.setAttribute("disabled", "");
        }
    }
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=main.js.map