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
        canvas.addEventListener("click", canvasClicked);
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
    function canvasClicked(_event) {
        let closestWorker = moveables[0];
        let x = _event.offsetX;
        let y = _event.offsetY;
        let distanceVektorClosestWorker = 10000;
        console.log(x + "x " + y + " y");
        for (let item of moveables) {
            let distance = new doenerTrainer.Vector(0, 0);
            distance.x = x - item.position.x;
            distance.y = y - item.position.y;
            let distanceVektor = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
            if (distanceVektor < distanceVektorClosestWorker) {
                closestWorker = item;
                distanceVektorClosestWorker = distanceVektor;
            }
        }
        closestWorker.velocity = new doenerTrainer.Vector(0, 0);
        console.log("x! " + closestWorker.position.x + "y! " + closestWorker.position.y);
    }
})(doenerTrainer || (doenerTrainer = {}));
//# sourceMappingURL=main.js.map