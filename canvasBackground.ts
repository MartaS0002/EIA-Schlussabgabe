namespace doenerTrainer {
  export class canvasBackground {
    public drawBackground(): void {

      // line above horizontal
      crc2.beginPath();
      crc2.moveTo(0, 150);
      crc2.lineTo(crc2.canvas.width, 150);
      crc2.strokeStyle = "white";
      crc2.stroke();
      crc2.closePath();

      // line below horizontal
      crc2.beginPath();
      crc2.moveTo(0, crc2.canvas.height - 150);
      crc2.lineTo(crc2.canvas.width, crc2.canvas.height - 150);
      crc2.strokeStyle = "white";
      crc2.stroke();
      crc2.closePath();
    }

    public displayJars(): void {
      
      let imageJarMeat: any = document.getElementById("jarMeat");
      crc2.drawImage(imageJarMeat, 150, 30, 60, 90);

      let imageJarLettuce: any = document.getElementById("jarLettuce");
      crc2.drawImage(imageJarLettuce, 250, 30, 60, 90);

      let imageJarMushrooms: any = document.getElementById("jarMushrooms");
      crc2.drawImage(imageJarMushrooms, 350, 30, 60, 90);

      let imageJarOnions: any = document.getElementById("jarOnions");
      crc2.drawImage(imageJarOnions, 450, 30, 60, 90);

      let imageJarTomatos: any = document.getElementById("jarTomatos");
      crc2.drawImage(imageJarTomatos, 550, 30, 60, 90);
    }
  }
}
