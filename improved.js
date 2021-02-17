"use strict";

document.querySelector(".selector").addEventListener("input", init);

//start
function init() {
  showHEX(getHEX());
  showRGB(hexToRGB(getHEX()));
  showHSL(RGBtoHSL(hexToRGB(getHEX())));
  colorBox(getHEX());
}

//get color
function getHEX() {
  console.log("getHEX: ");
  let hex = document.querySelector(".selector").value;
  return hex.slice(1);
}

//convert colors
function hexToRGB(valueHEX) {
  let array = [];
  let newArray = [];

  array = valueHEX.split("");

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

  return { r, g, b };
}
function RGBtoCSS() {
  return document.querySelector(".rgb").textContent;
}

function RGBtoHEX() {
  let r = 220;
  let g = 20;
  let b = 60;

  let digit1 = hexaDecimal(Math.floor(r / 16));

  let digit2 = hexaDecimal((r / 16 - Math.floor(r / 16)) * 16);

  let digit3 = hexaDecimal(Math.floor(g / 16));

  let digit4 = hexaDecimal((g / 16 - Math.floor(g / 16)) * 16);

  let digit5 = hexaDecimal(Math.floor(b / 16));

  let digit6 = hexaDecimal((b / 16 - Math.floor(b / 16)) * 16);

  return "#" + digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
}

function RGBtoHSL(objectRGB) {
  console.log("RGBtoHSL");

  let r = objectRGB.r;
  let g = objectRGB.g;
  let b = objectRGB.b;

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

  h = Math.floor(h);
  s = Math.floor(s);
  l = Math.floor(l);

  console.log("hsl", h, s, l); // just for testing

  return { h, s, l };
}

//show colors
function showHEX(colorHEX) {
  console.log("showHEX");
  document.querySelector(".hex").textContent = colorHEX;
}

function showRGB(colorRGB) {
  console.log("showRGB");

  let r = colorRGB.r;
  let g = colorRGB.g;
  let b = colorRGB.b;

  document.querySelector(".rgb").textContent = "rgb(" + r + ", " + g + ", " + b + ")";
}
function showHSL(objectHSL) {
  console.log("showHSL");

  let h = objectHSL.h;
  let s = objectHSL.s;
  let l = objectHSL.l;

  document.querySelector(".hsl").textContent = "H: " + h + " S: " + s + " L: " + l;
}
function colorBox(colorHEX) {
  console.log("colorBox");
  document.querySelector(".colorbox").style.background = "#" + getHEX();
}

//other functions
function removeHashtag(hashtagCode) {
  let withoutHashtag = hashtagCode.toString().slice(1);
  return withoutHashtag;
}

function hexaDecimal(number) {
  switch (number) {
    case 10:
      number = "a";
      break;
    case 11:
      number = "b";
      break;
    case 12:
      number = "c";
      break;
    case 13:
      number = "d";
      break;
    case 14:
      number = "e";
      break;
    case 15:
      number = "f";
  }
  return number;
}
