"use strict";

document.querySelector(".selector").addEventListener("change", findHEX);

let hex;

function findHEX(valueHEX) {
  console.log("findHEX");

  valueHEX = document.querySelector(".selector").value;
  hex = valueHEX.slice(1);
  document.querySelector(".hex").textContent = valueHEX;

  findRGB(hex);
}

function findRGB(valueRGB) {
  console.log("findRGB");

  let array = [];
  let newArray = [];
  array = valueRGB.split("");

  array.forEach(separate);

  function separate(char) {
    switch (char) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        char = parseInt(char);
        break;

      case "a":
        char = 10;
        break;
      case "b":
        char = 11;
        break;
      case "c":
        char = 12;
        break;
      case "d":
        char = 13;
        break;
      case "e":
        char = 14;
        break;
      case "f":
        char = 15;
    }
    newArray.push(char);
    console.log(char);
  }
  console.log(newArray);

  let r = 16 * newArray[0] + newArray[1];
  let g = 16 * newArray[2] + newArray[3];
  let b = 16 * newArray[4] + newArray[5];

  valueRGB = "(" + r + ", " + g + ", " + b + ")";

  document.querySelector(".rgb").textContent = valueRGB;

  findHSL(r, g, b);
}

function findHSL(r, g, b) {
  console.log("findHSL");

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl", h, s, l); // just for testing

  document.querySelector(".hsl").textContent = "H: " + h + " S: " + s + " L: " + l;
}
