// lahmacun brot unter löschen in Affinity

namespace doenerTrainer {
  window.addEventListener("load", handleLoad);
  let imgData: ImageData;

  export let crc2: CanvasRenderingContext2D;
  let moveablesWorker: Moveable[] = [];
  let moveablesCustomer: Moveable[] = [];
  let moveablesManager: Moveable[] = [];
  export let capacity: Capacity = {
    meat: 1,
    lettuce: 1,
    mushrooms: 1,
    onions: 1,
    tomatoes: 1
  };

  let capacityJars: Capacity = {
    meat: 1,
    lettuce: 1,
    mushrooms: 1,
    onions: 1,
    tomatoes: 1
  };

  let customer: Customers;
  export let orderAnalyser: Preferences = {
    meat: false,
    lettuce: false,
    mushrooms: false,
    onion: false,
    tomato: false
  };

  let numberWorkers: number = 0;
  let clickStart: number = 0;
  let verkaufteGerichte: number = 0;
  let leerlauf: number = 1;
  let rohmateriallager: number = 1;
  let kundenDurchschnitt: number = 1;
  let timeout: any;
  let managerVelocityX: number = 2;
  let managerVelocityY: number = 2;

  function handleLoad(_event: Event): void {
    // all handleLoad
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.querySelector("canvas")
    );
    if (!canvas) return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    drawBackground();

    let forms: NodeListOf<HTMLFormElement> = document.querySelectorAll("form");
    forms[0].addEventListener("change", handleChange);

    let button: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll("button");

    button[0].addEventListener("click", start); // button click -> start simulation

    button[1].addEventListener("click", refreshPage); // button click -> refreshPage

    let finishButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("finishButton")
    );

    finishButton.disabled = true;

    finishButton.addEventListener("click", analyseOrder);

    let startButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("start")
    );

    if (numberWorkers === 0) {
      startButton.disabled = true;
    }

    let deleteButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("deleteIngredientButton")
    );
    deleteButton.addEventListener("click", deleteItemfromOrder);

    imgData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

    window.setInterval(update, 20);
  }

  function drawBackground(): void {
    let backgroundClass: CanvasBackground = new CanvasBackground();
    backgroundClass.drawBackground();
    backgroundClass.displayJars();
  }

  function handleChange(_event: Event): void {
    let startButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("start")
    );

    let target: HTMLInputElement = <HTMLInputElement>_event.target;
    if (target.name === "numberWorkers") {
      numberWorkers = parseInt(target.value);
    } else if (target.name === "behaeltnisse") {
      capacity.meat = parseInt(target.value);
      capacity.lettuce = parseInt(target.value);
      capacity.mushrooms = parseInt(target.value);
      capacity.onions = parseInt(target.value);
      capacity.tomatoes = parseInt(target.value);
    } else if (target.name === "rohmateriallager") {
      rohmateriallager = parseInt(target.value);
      capacityJars.meat = parseInt(target.value);
      capacityJars.lettuce = parseInt(target.value);
      capacityJars.mushrooms = parseInt(target.value);
      capacityJars.onions = parseInt(target.value);
      capacityJars.tomatoes = parseInt(target.value);
    } else if (target.name === "leerlauf") {
      leerlauf = parseInt(target.value);
    } else if (target.name === "kundenDurchschnitt") {
      kundenDurchschnitt = parseInt(target.value);
    }
    if (numberWorkers > 0) {
      startButton.disabled = false;
    }
  }

  function refreshPage(): void {
    window.location.reload();
  }

  function start(): void {
    setTimeout(function () {
      alert("halber tag vorbei");
    },         15000);
    setTimeout(function () {
      alert("tag vorbei");
      window.location.reload();
    },         250000);

    if (numberWorkers > 10) {
      numberWorkers = 10;
    }
    if (clickStart === 0) {
      for (let i: number = 0; i < numberWorkers; i++) {
        callWorker();
        clickStart++;
        let startButton: HTMLButtonElement = <HTMLButtonElement>(
          document.getElementById("start")
        );
        startButton.disabled = true;
      }

      let workerClass: Workers = new Workers(
        new Vector(20, 100),
        new Vector(20, 100),
        false
      );
      workerClass.velocity = new Vector(2, 2);
      workerClass.draw();
      moveablesManager.push(workerClass);
    }
    callCustomers();
    displayCapacity();

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.querySelector("canvas")
    );
    canvas.addEventListener("click", canvasClicked);
    leerlaufWorkers();
    disableForm();
  }

  function disableForm(): void {
    let forms: NodeListOf<HTMLFormElement> = document.querySelectorAll("form");
    for (let item of forms[0]) {
      item.setAttribute("disabled", "");
    }
  }

  function callWorker(): void {
    let randomX: number = Math.floor(Math.random() * 600) + 50;
    let randomY: number = Math.floor(Math.random() * 230) + 170;
    let workerClass: Workers = new Workers(
      new Vector(randomX, randomY),
      new Vector(0, 0),
      false
    );
    workerClass.draw();
    moveablesWorker.push(workerClass);
  }

  function update(): void {
    crc2.putImageData(imgData, 0, 0);
    for (let moveable of moveablesWorker) {
      moveable.move(1 / 50);
      moveable.draw();
    }
    for (let moveable of moveablesCustomer) {
      moveable.moveCustomer(1 / 50);
      moveable.draw();
    }
    for (let moveable of moveablesManager) {
      moveable.moveManager(1 / 50);
      moveable.draw();
    }
  }

  function canvasClicked(_event: MouseEvent): void {
    let x: number = _event.offsetX;
    let y: number = _event.offsetY;
    let jarNachfuellen: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("jarNachfuellen")
    );
    //Meat angeklickt
    if (y > 30 && y < 120 && x > 150 && x < 180) {
      if (capacityJars.meat === 0) {
        jarNachfuellen.innerHTML = "Meat nachfüllen";
        jarNachfuellen.addEventListener("click", workernachfuellen);
      } else {
        capacity.meat = capacity.meat + 1;
        capacityJars.meat = capacityJars.meat - 1;
        displayCapacity();
        if (capacity.meat === 1) {
          let meat: HTMLImageElement = <HTMLImageElement>(
            document.getElementById("ingredientMeat")
          );
          meat.addEventListener("click", clickOnMeat);
        }
      }
    }
    // Lettuce angeklickt
    if (y > 30 && y < 120 && x > 250 && x < 310) {
      if (capacityJars.lettuce === 0) {
        jarNachfuellen.innerHTML = "Lettuce nachfüllen";
        jarNachfuellen.addEventListener("click", workernachfuellen);
      } else {
        capacity.lettuce = capacity.lettuce + 1;
        capacityJars.lettuce = capacityJars.lettuce - 1;
        displayCapacity();
        if (capacity.lettuce === 1) {
          let lettuce: HTMLImageElement = <HTMLImageElement>(
            document.getElementById("ingredientLettuce")
          );
          lettuce.addEventListener("click", clickOnLettuce);
        }
      }
    }
    //Rooms angeklickt
    if (y > 30 && y < 120 && x > 350 && x < 410) {
      if (capacityJars.mushrooms === 0) {
        jarNachfuellen.innerHTML = "Mushrooms nachfüllen";
        jarNachfuellen.addEventListener("click", workernachfuellen);
      } else {
        capacity.mushrooms = capacity.mushrooms + 1;
        capacityJars.mushrooms = capacityJars.mushrooms - 1;
        displayCapacity();
        if (capacity.mushrooms === 1) {
          let mushrooms: HTMLImageElement = <HTMLImageElement>(
            document.getElementById("ingredientMushroom")
          );
          mushrooms.addEventListener("click", clickOnMushrooms);
        }
      }
    }
    // Onion angeklickt
    if (y > 30 && y < 120 && x > 450 && x < 510) {
      if (capacityJars.onions === 0) {
        jarNachfuellen.innerHTML = "Onions nachfüllen";
        jarNachfuellen.addEventListener("click", workernachfuellen);
      } else {
        capacity.onions = capacity.onions + 1;
        capacityJars.onions = capacityJars.onions - 1;
        displayCapacity();
        if (capacity.onions === 1) {
          let onions: HTMLImageElement = <HTMLImageElement>(
            document.getElementById("ingredientOnion")
          );
          onions.addEventListener("click", clickOnOnion);
        }
      }
    }
    // Tomato angeklickt
    if (y > 30 && y < 120 && x > 550 && x < 610) {
      if (capacityJars.tomatoes === 0) {
        jarNachfuellen.innerHTML = "Tomatoes nachfüllen";
        jarNachfuellen.addEventListener("click", workernachfuellen);
      } else {
        capacity.tomatoes = capacity.tomatoes + 1;
        capacityJars.tomatoes = capacityJars.tomatoes - 1;
        displayCapacity();
        if (capacity.tomatoes === 1) {
          let tomatoes: HTMLImageElement = <HTMLImageElement>(
            document.getElementById("ingredientTomato")
          );
          tomatoes.addEventListener("click", clickOnTomato);
        }
      }
    }
  }

  export function displayCapacity(): void {
    // Ingredients
    let displayIDIngredients: string[] = [
      "meatAmount",
      "lettuceAmount",
      "mushroomsAmount",
      "onionAmount",
      "tomatoesAmount"
    ];
    let displayIngredientName: string[] = [
      "Meat",
      "Lettuce",
      "Mushrooms",
      "Onions",
      "Tomatoes"
    ];
    let displayCapacityIngredient: number[] = [
      capacity.meat,
      capacity.lettuce,
      capacity.mushrooms,
      capacity.onions,
      capacity.tomatoes
    ];

    for (let i: number = 0; i < displayIDIngredients.length; i++) {
      let ingredientAmount: HTMLParagraphElement = <HTMLParagraphElement>(
        document.getElementById(displayIDIngredients[i])
      );
      ingredientAmount.innerHTML =
        displayIngredientName[i] +
        ":" +
        JSON.stringify(displayCapacityIngredient[i]);
    }

    // Jars
    let displayIDIngredientsJar: string[] = [
      "meatAmountJars",
      "lettuceAmountJars",
      "mushroomsAmountJars",
      "onionAmountJars",
      "tomatoesAmountJars"
    ];
    let displayCapacityIngredientJar: number[] = [
      capacityJars.meat,
      capacityJars.lettuce,
      capacityJars.mushrooms,
      capacityJars.onions,
      capacityJars.tomatoes
    ];

    for (let i: number = 0; i < displayIDIngredientsJar.length; i++) {
      let ingredientAmountJar: HTMLParagraphElement = <HTMLParagraphElement>(
        document.getElementById(displayIDIngredientsJar[i])
      );
      ingredientAmountJar.innerHTML =
        displayIngredientName[i] +
        ":" +
        JSON.stringify(displayCapacityIngredientJar[i]);
    }
  }

  export function callOrder(): void {
    let displayIDIngredients: string[] = [
      "ingredientMeat",
      "ingredientLettuce",
      "ingredientMushroom",
      "ingredientOnion",
      "ingredientTomato"
    ];
    let displayCapacityIngredient = [
      clickOnMeat,
      clickOnLettuce,
      clickOnMushrooms,
      clickOnOnion,
      clickOnTomato
    ];

    for (let i: number = 0; i < displayIDIngredients.length; i++) {
      let ingredient: HTMLImageElement = <HTMLImageElement>(
        document.getElementById(displayIDIngredients[i])
      );
      ingredient.addEventListener("click", displayCapacityIngredient[i]);
    }

    let preferenceTrue: string[] = [];
    let preferenceFalse: string[] = [];

    if (customer.preferences.meat === true) {
      preferenceTrue.push("Meat");
    } else {
      preferenceFalse.push("Meat");
    }

    if (customer.preferences.lettuce === true) {
      preferenceTrue.push("Lettuce");
    } else {
      preferenceFalse.push("Lettuce");
    }

    if (customer.preferences.mushrooms === true) {
      preferenceTrue.push("Mushrooms");
    } else {
      preferenceFalse.push("Mushrooms");
    }

    if (customer.preferences.onion === true) {
      preferenceTrue.push("Onion");
    } else {
      preferenceFalse.push("Onion");
    }

    if (customer.preferences.tomato === true) {
      preferenceTrue.push("Tomato");
    } else {
      preferenceFalse.push("Tomato");
    }

    let bread: string[] = [
      "pics/bread_doener.png",
      "pics/bread_pita.png",
      "pics/bread_lahmacun.png"
    ];

    let randomBread: number = Math.floor(Math.random() * bread.length);

    let breadDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("breadDiv")
    );
    let ichWill: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("ichWill")
    );
    let ichWillNicht: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("ichWillNicht")
    );

    ichWill.innerHTML = "Ich will: " + "</br>" + preferenceTrue;
    ichWillNicht.innerHTML = "Ich will nicht: " + "</br>" + preferenceFalse;

    let imageBread: HTMLImageElement = <HTMLImageElement>(
      document.createElement("img")
    );
    imageBread.setAttribute("src", bread[randomBread]);
    imageBread.setAttribute("id", "Bread");
    breadDiv.appendChild(imageBread);

    let finishButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("finishButton")
    );
    finishButton.disabled = false;
  }

  export function analyseOrder(): void {
    clearTimeout(timeout);
    if (
      customer.preferences.lettuce === orderAnalyser.lettuce &&
      customer.preferences.meat === orderAnalyser.meat &&
      customer.preferences.mushrooms === orderAnalyser.mushrooms &&
      customer.preferences.onion === orderAnalyser.onion &&
      customer.preferences.tomato === orderAnalyser.tomato
    ) {
      customer.mood = "happy";
      moveablesManager[0].mood = "happy";
      for (let item of moveablesWorker) {
        item.mood = "happy";
      }
    } else {
      let moods: string[] = ["neutral", "mad"];
      let randomMood: number = Math.floor(Math.random() * moods.length);
      customer.mood = moods[randomMood];

      if (customer.mood === "mad") {
        moveablesManager[0].mood = "sad";
        for (let item of moveablesWorker) {
          item.mood = "sad";
        }
      }
    }
    let breadDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("breadDiv")
    );
    let imageBread: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("Bread")
    );
    breadDiv.removeChild(imageBread);

    let breadAndIngredients: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("breadAndIngredients")
    );
    let ingredientsDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("ingredientsDiv")
    );
    breadAndIngredients.removeChild(ingredientsDiv);
    breadAndIngredients.removeChild(breadDiv);

    let addIngredientsDiv: HTMLDivElement = <HTMLDivElement>(
      document.createElement("div")
    );
    addIngredientsDiv.setAttribute("id", "ingredientsDiv");
    breadAndIngredients.appendChild(addIngredientsDiv);
    breadAndIngredients.appendChild(breadDiv);
    orderAnalyser = {
      meat: false,
      lettuce: false,
      mushrooms: false,
      onion: false,
      tomato: false
    };
    moveablesCustomer = [];
    customer.velocity = new Vector(6, 0);
    customer.zielposition.x = 10000;
    moveablesCustomer.push(customer);
    verkaufteGerichte++;
    let verkaufteGerichteText: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("verkaufteGerichte")
    );

    verkaufteGerichteText.innerHTML =
      "verkaufte Gerichte: " + verkaufteGerichte;
    callNewCustomer();
  }

  function callNewCustomer(): void {
    let timeout: number = 0;
    switch (kundenDurchschnitt) {
      case 1: {
        timeout = 10000;
        break;
      }
      case 2: {
        timeout = 5000;
        break;
      }
      case 3: {
        timeout = 1000;
        break;
      }
    }

    setTimeout(callCustomers, timeout);
  }

  function callCustomers(): void {
    timeout = setTimeout(function () {
      customer.mood = "mad";
      moveablesManager[0].mood = "sad";
      for (let item of moveablesWorker) {
        item.mood = "sad";
      }
    },                   10000);

    let customerClass: Customers = new Customers(
      new Vector(600, 0),
      new Vector(0, 515)
    );
    customerClass.draw();
    moveablesCustomer.push(customerClass);
    customer = customerClass;
  }

  function deleteItemfromOrder(): void {
    let ingredientsDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("ingredientsDiv")
    );
    let orderImage: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("orderImage")
    );

    if (orderImage.getAttribute("class") === "orderImageMeat") {
      orderAnalyser.meat = false;
    } else if (orderImage.getAttribute("class") === "orderImageLettuce") {
      orderAnalyser.lettuce = false;
    } else if (orderImage.getAttribute("class") === "orderImageMushrooms") {
      orderAnalyser.mushrooms = false;
    } else if (orderImage.getAttribute("class") === "orderImageOnion") {
      orderAnalyser.onion = false;
    } else if (orderImage.getAttribute("class") === "orderImageTomato") {
      orderAnalyser.tomato = false;
    }

    ingredientsDiv.removeChild(orderImage);
  }

  function leerlaufWorkers(): void {
    switch (leerlauf) {
      case 1: {
        setTimeout(reduceVelocity, 5000);
        break;
      }
      case 2: {
        setTimeout(reduceVelocity, 10000);
        break;
      }
      case 3: {
        setTimeout(reduceVelocity, 15000);
        break;
      }
    }
  }

  function reduceVelocity(): void {
    for (let i: number = 0; i < moveablesWorker.length; i++) {
      moveablesWorker[i].velocity = new Vector(
        Math.random() * 0.5,
        Math.random() * 0.5
      );
    }
    managerVelocityX = 1;
    managerVelocityY = 1;
  }

  function workernachfuellen(): void {
    moveablesManager[0].moveBack = false;
    let jarNachfuellen: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("jarNachfuellen")
    );
    if (capacityJars.meat === 0) {
      moveablesManager[0].velocity.x = managerVelocityX;
      moveablesManager[0].velocity.y = managerVelocityY;
      moveablesManager[0].zielposition = new Vector(150, 200);
      setTimeout(() => (capacityJars.meat = rohmateriallager), 4900);
      setTimeout(displayCapacity, 5000);
      setTimeout(moveManagerBack, 5000);
    } else if (capacityJars.lettuce === 0) {
      moveablesManager[0].velocity.x = managerVelocityX;
      moveablesManager[0].velocity.y = managerVelocityY;
      moveablesManager[0].zielposition = new Vector(250, 200);

      setTimeout(displayCapacity, 5000);
      setTimeout(moveManagerBack, 6000);
      setTimeout(() => (capacityJars.lettuce = rohmateriallager), 4900);
    } else if (capacityJars.mushrooms === 0) {
      moveablesManager[0].velocity.x = managerVelocityX;
      moveablesManager[0].velocity.y = managerVelocityY;
      moveablesManager[0].zielposition = new Vector(350, 200);
      setTimeout(moveManagerBack, 5000);
      setTimeout(displayCapacity, 5000);
      setTimeout(() => (capacityJars.mushrooms = rohmateriallager), 4900);
    } else if (capacityJars.onions === 0) {
      moveablesManager[0].velocity.x = managerVelocityX;
      moveablesManager[0].velocity.y = managerVelocityY;
      moveablesManager[0].zielposition = new Vector(450, 200);
      setTimeout(displayCapacity, 8000);
      setTimeout(moveManagerBack, 8000);
      setTimeout(() => (capacityJars.onions = rohmateriallager), 7900);
    } else if (capacityJars.tomatoes === 0) {
      moveablesManager[0].velocity.x = managerVelocityX;
      moveablesManager[0].velocity.y = managerVelocityY;
      moveablesManager[0].zielposition = new Vector(550, 200);
      setTimeout(displayCapacity, 9000);
      setTimeout(moveManagerBack, 9000);
      setTimeout(() => (capacityJars.tomatoes = rohmateriallager), 8000);
    }

    jarNachfuellen.innerHTML = "Nachfüllen";
  }

  function moveManagerBack(): void {
    moveablesManager[0].moveBack = true;
    moveablesManager[0].velocity = new Vector(
      -managerVelocityX,
      -managerVelocityY
    );
    moveablesManager[0].zielposition = new Vector(10, 10);
  }
}
