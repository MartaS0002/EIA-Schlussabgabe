"use strict";
var doenerTrainer;
(function (doenerTrainer) {
    window.addEventListener("load", handleLoad);
    let imgData;
    let moveables = [];
    let numberWorkers = 0;
    let clickStart = 0;
    function handleLoad(_event) {
        // all handleLoad
        let canvas = (document.querySelector("canvas"));
        if (!canvas)
            return;
        doenerTrainer.crc2 = canvas.getContext("2d");
        let forms = document.querySelectorAll("form");
        forms[0].addEventListener("change", handleChange);
        let button = document.querySelectorAll("button");
        button[0].addEventListener("click", start); // button click -> start simulation
        button[1].addEventListener("click", refreshPage); // button click -> refreshPage
        drawBackground();
        imgData = doenerTrainer.crc2.getImageData(0, 0, doenerTrainer.crc2.canvas.width, doenerTrainer.crc2.canvas.height);
        // canvas.addEventListener("click", canvasClicked); -> clicking on workers???
        window.setInterval(update, 20);
    }
    function drawBackground() {
        let backgroundClass = new doenerTrainer.canvasBackground();
        backgroundClass.drawBackground();
    }
    function handleChange(_event) {
        let target = _event.target;
        if (target.name === "numberWorkers") {
            numberWorkers = parseInt(target.value);
        }
    }
    function refreshPage() {
        window.location.reload();
    }
    function start() {
        if (numberWorkers === 0) {
            alert("Du hast noch keine Mitarbeit");
        }
        if (numberWorkers > 10) {
            numberWorkers = 10;
        }
        if (clickStart === 0) {
            for (let i = 0; i < numberWorkers; i++) {
                callWorker();
            }
        }
        else {
            alert("Du hast schon auf Start gedrückt");
        }
        clickStart++;
    }
    function callWorker() {
        let randomX = Math.floor(Math.random() * 600) + 50;
        let randomY = Math.floor(Math.random() * 250) + 170;
        let workerClass = new doenerTrainer.workers(new doenerTrainer.Vector(randomX, randomY));
        workerClass.draw();
        moveables.push(workerClass);
    }
    function update() {
        doenerTrainer.crc2.putImageData(imgData, 0, 0);
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
    }
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=main.js.map