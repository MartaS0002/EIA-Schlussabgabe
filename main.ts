namespace doenerTrainer {
  window.addEventListener("load", handleLoad);
  let imgData: any;

  export let crc2: CanvasRenderingContext2D;
  let moveables: Moveable[] = [];
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
    imgData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

    // canvas.addEventListener("click", canvasClicked); -> clicking on workers???

    window.setInterval(update, 20);
  }

  function drawBackground(): void {
    let backgroundClass: canvasBackground = new canvasBackground();
    backgroundClass.drawBackground();
  }
  function handleChange(_event: Event): void {
    let target: HTMLInputElement = <HTMLInputElement>_event.target;
    if (target.name === "numberWorkers") {
      numberWorkers = parseInt(target.value);
    }
  }

  function refreshPage(): void {
    window.location.reload();
  }

  function start(): void {
    if (numberWorkers === 0) {
      alert("Du hast noch keine Mitarbeit");
    }
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
    for (let moveable of moveables) {
      moveable.move(1 / 50);
      moveable.draw();
    }
  }
}
