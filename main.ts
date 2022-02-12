// CustomersMood wird schlechter ---> fast fertig noch für andere cases machen

// jars nachfüllen braucht Zeit (setTimeout???)
// jars nachfüllen -> Mitarbeiter geht hin und "fühlt sie nach"

// ingredients (Theke) nachfüllen braucht Zeit (setTimeout???)

// displayMood Mitarbeiter

namespace doenerTrainer {
  window.addEventListener("load", handleLoad);
  let imgData: ImageData;

  export let crc2: CanvasRenderingContext2D;
  let moveablesWorker: Moveable[] = [];
  let moveablesCustomer: Moveable[] = [];
  let moveablesManager: Moveable[] = [];
  let capacity: Capacity = {
    meat: 1,
    lettuce: 1,
    mushrooms: 1,
    onions: 1,
    tomatoes: 1,
  };

  let capacityJars: Capacity = {
    meat: 1,
    lettuce: 1,
    mushrooms: 1,
    onions: 1,
    tomatoes: 1,
  };

  let customer: Customers;
  let orderAnalyser: Preferences = {
    meat: false,
    lettuce: false,
    mushrooms: false,
    onion: false,
    tomato: false,
  };

  let numberWorkers: number = 0;
  let clickStart: number = 0;
  let verkaufteGerichte: number = 0;
  let leerlauf: number = 1;
  let rohmateriallager: number = 1;

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
    let backgroundClass: canvasBackground = new canvasBackground();
    backgroundClass.drawBackground();
    backgroundClass.displayJars();
  }

  function clickOnMeat(): void {
    if (capacity.meat === 0) {
      let meat: HTMLImageElement = <HTMLImageElement>(
        document.getElementById("ingredientMeat")
      );
      meat.addEventListener("click", clickOnMeat);
      meat.removeEventListener("click", clickOnMeat);
    } else {
      capacity.meat = capacity.meat - 1;
      displayCapacity();
      let ingredientsDiv: HTMLDivElement = <HTMLDivElement>(
        document.getElementById("ingredientsDiv")
      );
      let image: HTMLImageElement = <HTMLImageElement>(
        document.createElement("img")
      );

      image.setAttribute("id", "orderImage");
      image.setAttribute("class", "orderImageMeat");
      image.setAttribute("src", "pics/ingredient_meat.png");
      ingredientsDiv.appendChild(image);
      orderAnalyser.meat = true;
      console.log(orderAnalyser);
    }
  }

  function clickOnLettuce(): void {
    if (capacity.lettuce === 0) {
      let lettuce: HTMLImageElement = <HTMLImageElement>(
        document.getElementById("ingredientLettuce")
      );
      lettuce.addEventListener("click", clickOnLettuce);
      lettuce.removeEventListener("click", clickOnLettuce);
    } else {
      capacity.lettuce = capacity.lettuce - 1;
      displayCapacity();
      let ingredientsDiv: HTMLDivElement = <HTMLDivElement>(
        document.getElementById("ingredientsDiv")
      );
      let image: HTMLImageElement = <HTMLImageElement>(
        document.createElement("img")
      );
      image.setAttribute("id", "orderImage");
      image.setAttribute("class", "orderImageLettuce");
      image.setAttribute("src", "pics/ingredient_lettuce.png");
      ingredientsDiv.appendChild(image);
      orderAnalyser.lettuce = true;
      console.log(orderAnalyser);
    }
  }

  function clickOnMushrooms(): void {
    if (capacity.mushrooms === 0) {
      let mushrooms: HTMLImageElement = <HTMLImageElement>(
        document.getElementById("ingredientMushroom")
      );
      mushrooms.addEventListener("click", clickOnMushrooms);
      mushrooms.removeEventListener("click", clickOnMushrooms);
    } else {
      capacity.mushrooms = capacity.mushrooms - 1;
      displayCapacity();
      let ingredientsDiv: HTMLDivElement = <HTMLDivElement>(
        document.getElementById("ingredientsDiv")
      );
      let image: HTMLImageElement = <HTMLImageElement>(
        document.createElement("img")
      );
      image.setAttribute("id", "orderImage");
      image.setAttribute("class", "orderImageMushrooms");
      image.setAttribute("src", "pics/ingredient_mushrooms.png");
      ingredientsDiv.appendChild(image);
      orderAnalyser.mushrooms = true;
      console.log(orderAnalyser);
    }
  }

  function clickOnOnion(): void {
    if (capacity.onions === 0) {
      let onions: HTMLImageElement = <HTMLImageElement>(
        document.getElementById("ingredientOnion")
      );
      onions.addEventListener("click", clickOnOnion);
      onions.removeEventListener("click", clickOnOnion);
    } else {
      capacity.onions = capacity.onions - 1;
      displayCapacity();
      let ingredientsDiv: HTMLDivElement = <HTMLDivElement>(
        document.getElementById("ingredientsDiv")
      );
      let image: HTMLImageElement = <HTMLImageElement>(
        document.createElement("img")
      );
      image.setAttribute("id", "orderImage");
      image.setAttribute("class", "orderImageOnion");
      image.setAttribute("src", "pics/ingredient_onion.png");
      ingredientsDiv.appendChild(image);
      orderAnalyser.onion = true;
      console.log(orderAnalyser);
    }
  }

  function clickOnTomato(): void {
    if (capacity.tomatoes === 0) {
      let tomatoes: HTMLImageElement = <HTMLImageElement>(
        document.getElementById("ingredientTomato")
      );
      tomatoes.addEventListener("click", clickOnTomato);
      tomatoes.removeEventListener("click", clickOnTomato);
    } else {
      capacity.tomatoes = capacity.tomatoes - 1;
      displayCapacity();
      let ingredientsDiv: HTMLDivElement = <HTMLDivElement>(
        document.getElementById("ingredientsDiv")
      );
      let image: HTMLImageElement = <HTMLImageElement>(
        document.createElement("img")
      );
      image.setAttribute("id", "orderImage");
      image.setAttribute("class", "orderImageTomato");
      image.setAttribute("src", "pics/ingredient_tomato.png");
      ingredientsDiv.appendChild(image);
      orderAnalyser.tomato = true;
      console.log(orderAnalyser);
    }
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
      console.log(capacityJars);
    } else if (target.name === "leerlauf") {
      leerlauf = parseInt(target.value);
    }

    if (numberWorkers > 0) {
      startButton.disabled = false;
    }
  }

  function refreshPage(): void {
    window.location.reload();
  }

  function start(): void {
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
        new Vector(20, 100)
      );
      workerClass.velocity = new Vector(2, 2);
      workerClass.draw();
      moveablesManager.push(workerClass);
    }
    callCustomers();
    displayCapacity();
    console.log(customer.preferences);
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.querySelector("canvas")
    );
    canvas.addEventListener("click", canvasClicked);
    leerlaufWorkers();
    disableForm();
  }

  function callWorker(): void {
    let randomX: number = Math.floor(Math.random() * 600) + 50;
    let randomY: number = Math.floor(Math.random() * 230) + 170;
    let workerClass: Workers = new Workers(
      new Vector(randomX, randomY),
      new Vector(0, 0)
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
    //Meat angeklickt
    if (y > 30 && y < 120 && x > 150 && x < 180) {
      if (capacityJars.meat === 0) {
        ////////////////////////////////////////////////////////// nachfüllen
        let jarNachfuellen: HTMLButtonElement = <HTMLButtonElement>(
          document.getElementById("jarNachfuellen")
        );
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

  function displayCapacity(): void {
    let meatAmount: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("meatAmount")
    );
    meatAmount.innerHTML = "Meat: " + JSON.stringify(capacity.meat);

    let lettuceAmout: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("lettuceAmount")
    );
    lettuceAmout.innerHTML = "Lettuce: " + JSON.stringify(capacity.lettuce);
    
    let mushroomsAmout: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("mushroomsAmount")
    );
    mushroomsAmout.innerHTML =
      "Mushrooms: " + JSON.stringify(capacity.mushrooms);

    let onionsAmout: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("onionAmount")
    );
    onionsAmout.innerHTML = "Onions: " + JSON.stringify(capacity.onions);

    let tomatoesAmout: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("tomatoesAmount")
    );
    tomatoesAmout.innerHTML = "Tomatoes: " + JSON.stringify(capacity.tomatoes);

    //Jars
    let meatAmountJars: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("meatAmountJars")
    );
    meatAmountJars.innerHTML = "Meat: " + JSON.stringify(capacityJars.meat);

    let lettuceAmoutJars: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("lettuceAmountJars")
    );
    lettuceAmoutJars.innerHTML =
      "Lettuce: " + JSON.stringify(capacityJars.lettuce);

    let mushroomsAmoutJars: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("mushroomsAmountJars")
    );
    mushroomsAmoutJars.innerHTML =
      "Mushrooms: " + JSON.stringify(capacityJars.mushrooms);

    let onionsAmoutJars: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("onionAmountJars")
    );
    onionsAmoutJars.innerHTML =
      "Onions: " + JSON.stringify(capacityJars.onions);

    let tomatoesAmoutJars: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("tomatoesAmountJars")
    );
    tomatoesAmoutJars.innerHTML =
      "Tomatoes: " + JSON.stringify(capacityJars.tomatoes);
  }

  export function callOrder(): void {
    let meat: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientMeat")
    );
    meat.addEventListener("click", clickOnMeat);

    let lettuce: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientLettuce")
    );
    lettuce.addEventListener("click", clickOnLettuce);

    let mushrooms: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientMushroom")
    );
    mushrooms.addEventListener("click", clickOnMushrooms);

    let onion: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientOnion")
    );
    onion.addEventListener("click", clickOnOnion);

    let tomato: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientTomato")
    );
    tomato.addEventListener("click", clickOnTomato);

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
      "pics/bread_lahmacun.png",
    ];

    let randomBread: number = Math.floor(Math.random() * bread.length);
    console.log(randomBread);
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
    console.log(customer.preferences);
    console.log(orderAnalyser);
    if (
      customer.preferences.lettuce === orderAnalyser.lettuce &&
      customer.preferences.meat === orderAnalyser.meat &&
      customer.preferences.mushrooms === orderAnalyser.mushrooms &&
      customer.preferences.onion === orderAnalyser.onion &&
      customer.preferences.tomato === orderAnalyser.tomato
    ) {
      console.log("happy");
    } else {
      let moods: string[] = ["neutral", "mad"];
      let randomMood: number = Math.floor(Math.random() * moods.length);
      customer.mood = moods[randomMood];
      console.log("nicht happy");
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
      tomato: false,
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
    console.log("new customer");
    setTimeout(callCustomers, 3000);
  }

  function callCustomers(): void {
    let customerClass: Customers = new Customers(
      new Vector(600, 0),
      new Vector(0, 515)
    );
    customerClass.draw();
    // console.log(customerClass.preferences);
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
        setTimeout(reduceVelocity, 10000);
        break;
      }
      case 2: {
        setTimeout(reduceVelocity, 20000);
        break;
      }
      case 3: {
        setTimeout(reduceVelocity, 30000);

        break;
      }
      case 4: {
        setTimeout(reduceVelocity, 40000);

        break;
      }
      case 5: {
        setTimeout(reduceVelocity, 50000);
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
  }

  function workernachfuellen(): void {
    console.log(capacityJars.meat);
    if (capacityJars.meat === 0) {
      console.log(moveablesManager);
      moveablesManager[0].velocity = new Vector(2, 2);
      moveablesManager[0].zielposition = new Vector(200, 100);
      capacityJars.meat = rohmateriallager;
      displayCapacity();
    }
  }

  function disableForm(): void {
    let forms: NodeListOf<HTMLFormElement> = document.querySelectorAll("form");
    for (let item of forms[0]) {
      item.setAttribute("disabled", "");
    }
  }
}
