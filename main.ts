namespace doenerTrainer {
  window.addEventListener("load", handleLoad);

  export let crc2: CanvasRenderingContext2D;

  function handleLoad(_event: Event): void {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.querySelector("canvas")
    );
    if (!canvas) return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

    drawBackground();
  }

  function drawBackground(): void {
    let backgroundClass: canvasBackground = new canvasBackground();
    backgroundClass.drawBackground();
  }
}
