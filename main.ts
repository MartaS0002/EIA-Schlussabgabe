namespace doenerTrainer {
  window.addEventListener("load", handleLoad);
  let imgData: any;

  export let crc2: CanvasRenderingContext2D;
  let moveablesWorker: Moveable[] = [];
  let moveablesCustomer: Moveable[] = [];

  let customer: customers;

  let numberWorkers: number = 0;
  let clickStart: number = 0;

  function handleLoad(_event: Event): void {
    // all handleLoad
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.querySelector("canvas")
    );
    if (!canvas) return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    let forms: NodeListOf<HTMLFormElement> = document.querySelectorAll("form");
    forms[0].addEventListener("change", handleChange);

    let button: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll("button");

    button[0].addEventListener("click", start); // button click -> start simulation

    button[1].addEventListener("click", refreshPage); // button click -> refreshPage
    drawBackground();
    drawIngredients();

    let startButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("start")
    );

    if (numberWorkers === 0) {
      startButton.disabled = true;
    }

    imgData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

    // canvas.addEventListener("click", canvasClicked);

    window.setInterval(update, 20);
  }

  function drawBackground(): void {
    let backgroundClass: canvasBackground = new canvasBackground();
    backgroundClass.drawBackground();
  }

  function drawIngredients(): void {
    let imageCheese: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientCheese")
    );
    crc2.drawImage(imageCheese, 70, 435, 50, 50);
    imageCheese.addEventListener("click", clickOnCheese);

    let imageChili: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientChili")
    );
    crc2.drawImage(imageChili, 150, 435, 50, 50);

    let imageMushroom: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientMushroom")
    );
    crc2.drawImage(imageMushroom, 230, 435, 50, 50);

    let imageOnion: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientOnion")
    );
    crc2.drawImage(imageOnion, 310, 435, 50, 50);

    let imageTomato: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("ingredientTomato")
    );
    crc2.drawImage(imageTomato, 390, 435, 50, 50);
  }

  function handleChange(_event: Event): void {
    let startButton: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("start")
    );

    let target: HTMLInputElement = <HTMLInputElement>_event.target;
    if (target.name === "numberWorkers") {
      numberWorkers = parseInt(target.value);
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
    }
    callCustomers();
  }

  function callWorker(): void {
    let randomX: number = Math.floor(Math.random() * 600) + 50;
    let randomY: number = Math.floor(Math.random() * 230) + 170;
    let workerClass: workers = new workers(new Vector(randomX, randomY));
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
  }

  // function canvasClicked(_event: MouseEvent): void {
  //   let closestWorker: workers = moveablesWorker[0];
  //   let x: number = _event.offsetX;
  //   let y: number = _event.offsetY;
  //   let distanceVektorClosestWorker: number = 10000;

  //   console.log(x + "x " + y + " y");
  //   for (let item of moveablesWorker) {
  //     let distance: Vector = new Vector(0, 0);
  //     distance.x = x - item.position.x;
  //     distance.y = y - item.position.y;

  //     let distanceVektor: number = Math.sqrt(
  //       Math.pow(distance.x, 2) + Math.pow(distance.y, 2)
  //     );

  //     if (distanceVektor < distanceVektorClosestWorker) {
  //       closestWorker = item;
  //       distanceVektorClosestWorker = distanceVektor;
  //     }
  //   }
  //   closestWorker.velocity = new Vector(0, 0);
  //   console.log(
  //     "x! " + closestWorker.position.x + "y! " + closestWorker.position.y
  //   );
  // }

  function callCustomers(): void {
    let customerClass: customers = new customers(new Vector(0, 515));

    customerClass.draw();
    // console.log(customerClass.preferences);
    moveablesCustomer.push(customerClass);
    customer = customerClass;
  }

  export function callOrder(): void {
    let preferenceTrue: string[] = [];
    let preferenceFalse: string[] = [];

    if (customer.preferences.cheese === true) {
      preferenceTrue.push("Cheese");
    } else {
      preferenceFalse.push("Cheese");
    }

    if (customer.preferences.chili === true) {
      preferenceTrue.push("Chili");
    } else {
      preferenceFalse.push("Chili");
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
    let orderDiv: HTMLDivElement = <HTMLDivElement>(
      document.getElementById("order")
    );
    let ichWill: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("ichWill")
    );
    let ichWillNicht: HTMLParagraphElement = <HTMLParagraphElement>(
      document.getElementById("ichWillNicht")
    );

    ichWill.innerHTML = "Ich will: " + preferenceTrue;
    ichWillNicht.innerHTML = "Ich will nicht: " + preferenceFalse;

    orderDiv.appendChild(ichWill);
    orderDiv.appendChild(ichWillNicht);

    let imageBread: HTMLImageElement = <HTMLImageElement>(
      document.createElement("img")
    );
    imageBread.setAttribute("src", bread[randomBread]);
    imageBread.setAttribute("id", "Bread");
    orderDiv.appendChild(imageBread);
  }
  function clickOnCheese(): void {
    console.log(
      "cheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeese"
    );
    let imageBread: HTMLImageElement = <HTMLImageElement>(
      document.getElementById("Bread")
    );
    let img: HTMLImageElement = <HTMLImageElement>document.createElement("img");
    img.setAttribute("src", "pic/ingredient_cheese.png");
    imageBread.appendChild(img);
  }
}
