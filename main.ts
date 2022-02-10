namespace doenerTrainer {
  window.addEventListener("load", handleLoad);
  let imgData: any;

  export let crc2: CanvasRenderingContext2D;
  let moveables: Moveable[] = [];
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
    // -----

    let startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");

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

   function handleChange(_event: Event): void {
    let startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");

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
      }
    } else {
      alert("Du hast schon auf Start gedrückt");
    }
    clickStart++;
    callCustomers();
  }

  function callWorker(): void {
    let randomX: number = Math.floor(Math.random() * 600) + 50;
    let randomY: number = Math.floor(Math.random() * 250) + 170;
    let workerClass: workers = new workers(new Vector(randomX, randomY));
    workerClass.draw();
    moveables.push(workerClass);
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
  //   let closestWorker: workers = moveables[0];
  //   let x: number = _event.offsetX;
  //   let y: number = _event.offsetY;
  //   let distanceVektorClosestWorker: number = 10000;

  //   console.log(x + "x " + y + " y");
  //   for (let item of moveables) {
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
    moveablesCustomer.push(customerClass);
    customer = customerClass;
  }
 
    let bread: string[] = ["pics/bread_doener.png", "pics/bread_pita.png", "pics/bread_lahmacun.png"];
    let randomBread: number = Math.floor(Math.random() * bread.length);
    console.log(randomBread);
    let orderDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("order");
    
    let imageBread: HTMLImageElement = <HTMLImageElement>document.createElement("img");
    imageBread.setAttribute("src", bread[randomBread]);
    imageBread.setAttribute("id", "Bread");
    orderDiv.appendChild(imageBread);
  }

// bread_doener bread_lahmacun bread_pita

// customer_happy customer_mad customer_neutral

// ingredient_cheese  ingredient_chili ingredient_mushrooms ingredient_onion ingredient_tomato
