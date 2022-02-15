namespace doenerTrainer {
  export interface Capacity {
    meat: number;
    lettuce: number;
    mushrooms: number;
    onions: number;
    tomatoes: number;
  }

  export function clickOnMeat(): void {
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
    }
  }

  export function clickOnLettuce(): void {
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
    }
  }

  export function clickOnMushrooms(): void {
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
    }
  }

  export function clickOnOnion(): void {
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
    }
  }

  export function clickOnTomato(): void {
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
    }
  }
}
