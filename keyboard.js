let input = document.createElement("textarea");
document.body.append(input);
let option = false;
let shift = false,
  control = false,
  caps = false;
let keys = [
  { code: "symbol", key: "`ё" },
  { code: "Digit", key: "1!" },
  { code: "Digit", key: "2@" },
  { code: "Digit", key: "3#" },
  { code: "Digit", key: "4$" },
  { code: "Digit", key: "5%" },
  { code: "Digit", key: "6^" },
  { code: "Digit", key: "7&" },
  { code: "Digit", key: "8*" },
  { code: "Digit", key: "9(" },
  { code: "Digit", key: "0)" },
  { code: "symbol", key: "-_" },
  { code: "symbol", key: "=+" },
  { code: "specialW", key: "BackSpace" },
  { code: "specialW", key: "Tab" },
  { code: "Key", key: "qй" },
  { code: "Key", key: "wц" },
  { code: "Key", key: "eу" },
  { code: "Key", key: "rк" },
  { code: "Key", key: "tе" },
  { code: "Key", key: "yн" },
  { code: "Key", key: "uг" },
  { code: "Key", key: "iш" },
  { code: "Key", key: "oщ" },
  { code: "Key", key: "pз" },
  { code: "Key", key: "[х" },
  { code: "Key", key: "]ъ" },
  { code: "symbol", key: "\\" },
  { code: "specialW", key: "CapsLock" },
  { code: "Key", key: "aф" },
  { code: "Key", key: "sы" },
  { code: "Key", key: "dв" },
  { code: "Key", key: "fа" },
  { code: "Key", key: "gп" },
  { code: "Key", key: "hр" },
  { code: "Key", key: "jо" },
  { code: "Key", key: "kл" },
  { code: "Key", key: "lд" },
  { code: "symbol", key: ";ж" },
  { code: "symbol", key: "'э" },
  { code: "specialW", key: "Enter" },
  { code: "specialW", key: "Shift" },
  { code: "Key", key: "zя" },
  { code: "Key", key: "xч" },
  { code: "Key", key: "cс" },
  { code: "Key", key: "vм" },
  { code: "Key", key: "bи" },
  { code: "Key", key: "nт" },
  { code: "Key", key: "mь" },
  { code: "Key", key: ",б" },
  { code: "Key", key: ".ю" },
  { code: "symbol", key: "/." },
  { code: "special", key: "Del" },
  { code: "specialW", key: "Shift" },
  { code: "special", key: "Ctrl" },
  { code: "special", key: "Win" },
  { code: "special", key: "Alt" },
  { code: "specialWW", key: " " },
  { code: "special", key: "Alt" },
  { code: "special", key: "Win" },
  { code: "special", key: "Ctrl" }
];
createBoard();
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

function createBoard() {
  let keysWrapper = document.createElement("div");
  keysWrapper.className = "keysWrapper";
  document.body.append(keysWrapper);
  keysWrapper.style.margin = "20px auto";
  keysWrapper.style.width = 15 * 46 + "px";
  let keyboard = new DocumentFragment();
  for (let i = 0; i < keys.length; i++) {
    let button = document.createElement("button");
    button.className = keys[i].code;
    if (button.className === "special" || button.className === "specialW") {
      button.append(keys[i].key);
    } else {
      button.append(keys[i].key[option ? 1 : 0]);
    }
    keyboard.append(button);
    button.addEventListener("click", createEvent);
  }
  keysWrapper.append(keyboard);
}

function createEvent() {
  let myEvent = new KeyboardEvent("keydown", {
    key: event.target.textContent,
    code: event.target.className
  });
  document.dispatchEvent(myEvent);
}

let inputStr = "";
function onKeyDown() {
  if (event.code !== "special" && event.code !== "specialW") {
    switch (event.key) {
      case "Shift":
        shift = true;
        caps = !caps;
        break;
      case "Control":
        control = true;
        break;
      case "CapsLock":
        caps = !caps;
        break;
      default:
        inputStr += event.key;
        input.value = inputStr;
    }
  }
  if (shift && control) {
    option = !option;
  }
  changeKeyboard();
}

function onKeyUp() {
  switch (event.key) {
    case "Shift":
      shift = false;
      caps = false;
      break;
    case "Control":
      control = false;
      break;
  }
  changeKeyboard();
}

function changeKeyboard() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    if (keys[i].code === "Key") {
      buttons[i].textContent =
        caps || shift
          ? keys[i].key[option ? 1 : 0].toUpperCase()
          : keys[i].key[option ? 1 : 0];
    }
  }
}
