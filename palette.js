"use strict";

window.addEventListener("load", init);

//start functions
function init() {
  console.log("init");
  document.querySelector(".selector").addEventListener("input", operateHex);
  document.querySelector("#analogous").addEventListener("click", getHarmony);
  document.querySelector("#mono").addEventListener("click", getHarmony);
  document.querySelector("#triad").addEventListener("click", getHarmony);
  document.querySelector("#complement").addEventListener("click", getHarmony);
  document.querySelector("#compound").addEventListener("click", getHarmony);
  document.querySelector("#shades").addEventListener("click", getHarmony);

  document.querySelector(".selector").addEventListener("change", showDivChoose);
}

function operateHex() {
  console.log("operateHex");

  const hex = getColor();
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const css = rgbToCss(rgb);

  changeBackground("main", hex);
  displayCode("main", hex, rgb, hsl);

  return { hex, rgb, hsl, css };
}

//get values from document
function getColor() {
  console.log("getHEX: ");
  let hex = document.querySelector(".selector").value;
  return hex.slice(1);
}

function getHarmony() {
  let id = this.id;
  let hsl = operateHex().hsl;
  let harmony = [hsl, hsl, hsl, hsl];

  switch (id) {
    case "analogous":
      console.log("analogous");
      harmony = harmony.map(calcAnalogous);

      console.log(harmony);
      break;
    case "mono":
      console.log("mono");
      harmony = harmony.map(calcMono);

      console.log(harmony);
      break;
    case "triad":
      console.log("triad");
      harmony = calcTriad(hsl);
      console.log(harmony);
      break;
    case "complement":
      console.log("complement");
      harmony = harmony.map(calcComplement);
      break;
    case "compound":
      console.log("compound");
      harmony = harmony.map(calcCompound);
      break;
    case "shades":
      console.log("shades");
      harmony = harmony.map(calcShades);
  }
  harmony = harmony.map(hslToRgb);
  harmony = harmony.map(rgbToCss);
  console.log(harmony);
  displayBgHarmonies(harmony);
  showDivRepeat();
}

// displaying colors and values
function changeBackground(id, color) {
  console.log("changeBackground");
  document.querySelector(`#${id}`).style.background = `#${color}`;
}

function displayCode(id, hex, rgb, hsl) {
  console.log("displayCode");
  document.querySelector(`#${id} .hex`).textContent = "#" + hex;
  document.querySelector(`#${id} .rgb`).textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  document.querySelector(`#${id} .hsl`).textContent = `hsl(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`;
}

function displayBgHarmonies(objectHarmony) {
  //variables above are in rgbToCss
  console.log("displayBgHarmonies");

  document.querySelector(`#one`).style.background = objectHarmony[0];
  document.querySelector(`#two`).style.background = objectHarmony[1];
  document.querySelector(`#four`).style.background = objectHarmony[2];
  document.querySelector(`#five`).style.background = objectHarmony[3];
}

// calculating colors
function hexToRgb(stringhex) {
  console.log("hexToRgb");

  let array = [];
  let newArray = [];
  array = stringhex.split("");
  newArray = array.map(decimalToHexa);

  let r = 16 * newArray[0] + newArray[1];
  let g = 16 * newArray[2] + newArray[3];
  let b = 16 * newArray[4] + newArray[5];

  console.log(r + " " + g + " " + b);
  return { r, g, b };
}

function rgbToHsl(objectrgb) {
  console.log("RGBtoHSL");

  let r = objectrgb.r;
  let g = objectrgb.g;
  let b = objectrgb.b;

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

function rgbToCss(objectrgb) {
  let r = objectrgb.r;
  let g = objectrgb.g;
  let b = objectrgb.b;

  return `rgb(${r},${g},${b})`;
}

function rgbToHex(objectrgb) {
  console.log("rgbToHex");

  let r = objectrgb.r;
  let g = objectrgb.g;
  let b = objectrgb.b;

  let digit1 = hexaDecimal(Math.floor(r / 16));
  let digit2 = hexaDecimal((r / 16 - Math.floor(r / 16)) * 16);
  let digit3 = hexaDecimal(Math.floor(g / 16));
  let digit4 = hexaDecimal((g / 16 - Math.floor(g / 16)) * 16);
  let digit5 = hexaDecimal(Math.floor(b / 16));
  let digit6 = hexaDecimal((b / 16 - Math.floor(b / 16)) * 16);

  return "#" + digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
}

function hslToRgb(objecthsl) {
  console.log("hslToRgb");

  let h = objecthsl.h;
  let s = objecthsl.s;
  let l = objecthsl.l;

  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

//calculate between hexa and decimal
function hexaToDecimal(number) {
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

function decimalToHexa(char) {
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
  return char;
}

//calculating harmonies
function calcAnalogous(objecthsl) {
  let h = objecthsl.h;
  let s = objecthsl.s;
  let l = objecthsl.l;

  h = h + Math.floor(Math.random() * 55);

  if (h > 360) {
    h = 360;
  } else if (h < 0) {
    h = 0;
  }

  return { h, s, l };
}

function calcMono(objecthsl) {
  let random = Math.floor(Math.random() * 2);
  let h = objecthsl.h;
  let s = objecthsl.s;
  let l = objecthsl.l;

  switch (random) {
    case 0: //edit s
      s = Math.floor(Math.random() * 101);
      break;
    case 1: //edit l
      l = Math.floor(Math.random() * 101);
  }
  return { h, s, l };
}

function calcTriad(objecthsl) {
  console.log("calcTriad");
  let triad1, triad2, triad3, triad4, a, b;
  let triadArray = [];

  let h = objecthsl.h;
  let s = objecthsl.s;
  let l = objecthsl.l;

  if (h > 300) {
    a = h - 300;
  } else {
    a = h + 60;
  }

  if (h > 240) {
    b = h - 240;
  } else {
    b = h + 120;
  }

  triad1 = {
    h: a,
    s: s,
    l: l,
  };

  triad2 = {
    h: b,
    s: s,
    l: l,
  };

  triad3 = {
    h: a,
    s: s,
    l: Math.floor(Math.random() * 100),
  };

  triad4 = {
    h: b,
    s: s,
    l: Math.floor(Math.random() * 100),
  };

  triadArray.push(triad3);
  triadArray.push(triad1);
  triadArray.push(triad2);
  triadArray.push(triad4);

  return triadArray;
}

function calcComplement(objecthsl) {}
function calcCompound(objecthsl) {}
function calcShades(objecthsl) {}

//showing text fields
function showDivChoose() {
  document.querySelector(".choose").classList.remove("hidden");
}
function showDivRepeat() {
  document.querySelector(".repeat").classList.remove("hidden");
}
