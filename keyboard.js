let input = document.createElement("textarea");
document.body.append(input);
let language = 0;
let shift = false,
  control = false,
  alt = false;
class key {
  constructor(className, key, width) {
    this.className = className;
    this.width = width;
    this.key = key;
  }
}
let keys = [
  new key("Key", "`~ёЁ", 1),
  new key("Key", "1!1!", 1),
  new key("Key", '2@2"', 1),
  new key("Key", "3#3№", 1),
  new key("Key", "4$4;", 1),
  new key("Key", "5%5%", 1),
  new key("Key", "6^6:", 1),
  new key("Key", "7&7?", 1),
  new key("Key", "8*8*", 1),
  new key("Key", "9(9(", 1),
  new key("Key", "0)0)", 1),
  new key("Key", "-_-_", 1),
  new key("Key", "=+=+", 1),
  new key("Backspace", "Backspace", 2),
  new key("Tab", "Tab", 2),
  new key("Key", "qQйЙ", 1),
  new key("Key", "wWцЦ", 1),
  new key("Key", "eEуУ", 1),
  new key("Key", "rRкК", 1),
  new key("Key", "tTеЕ", 1),
  new key("Key", "yYнН", 1),
  new key("Key", "uUгГ", 1),
  new key("Key", "iIшШ", 1),
  new key("Key", "oOщЩ", 1),
  new key("Key", "pPзЗ", 1),
  new key("Key", "[{хХ", 1),
  new key("Key", "]}ъЪ", 1),
  new key("Key", "\\|\\/", 1),
  new key("CapsLock", "CapsLock", 2),
  new key("Key", "aAфФ", 1),
  new key("Key", "sSыЫ", 1),
  new key("Key", "dDвВ", 1),
  new key("Key", "fFаА", 1),
  new key("Key", "gGпП", 1),
  new key("Key", "hHрР", 1),
  new key("Key", "jJоО", 1),
  new key("Key", "kKлЛ", 1),
  new key("Key", "lLдД", 1),
  new key("Key", ";:жЖ", 1),
  new key("Key", "'\"эЭ", 1),
  new key("Enter", "Enter", 2),
  new key("ShiftLeft", "Shift", 2),
  new key("Key", "zZяЯ", 1),
  new key("Key", "xXчЧ", 1),
  new key("Key", "cCсС", 1),
  new key("Key", "vVмМ", 1),
  new key("Key", "bBиИ", 1),
  new key("Key", "nNтТ", 1),
  new key("Key", "mMьЬ", 1),
  new key("Key", ",<бБ", 1),
  new key("Key", ".>юЮ", 1),
  new key("Key", "/?.,", 1),
  new key("Delete", "Del", 1),
  new key("ShiftRight", "Shift", 2),
  new key("ControlLeft", "Ctrl", 1),
  new key("MetaLeft", "Win", 1),
  new key("AltLeft", "Alt", 1),
  new key("Space", "Space", 9),
  new key("AltRight", "Alt", 1),
  new key("MetaRight", "Win", 1),
  new key("ControlRight", "Ctrl", 1)
];
createBoard();
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

let buttons = document.getElementsByTagName("button");

function createBoard() {
  language = +localStorage.getItem("language");
  let keysWrapper = document.createElement("div");
  keysWrapper.className = "keysWrapper";
  document.body.append(keysWrapper);
  keysWrapper.style.margin = "20px auto";
  keysWrapper.style.width = 15 * 46 + "px";
  let keyboard = new DocumentFragment();
  for (let i = 0; i < keys.length; i++) {
    let button = document.createElement("button");
    button.className = keys[i].className;
    if (keys[i].key === "Space") {
      button.append(" ");
    } else if (button.className !== "Key") {
      button.append(keys[i].key);
    } else {
      button.append(keys[i].key[language === 0 ? 0 : 2]);
    }
    button.style.gridColumn = "span " + keys[i].width;
    keyboard.append(button);
    button.addEventListener("click", createEvent);
  }
  keysWrapper.append(keyboard);
}

function createEvent() {
  let keyDown = new KeyboardEvent("keydown", {
    key: event.target.textContent,
    code: event.target.className
  });
  document.dispatchEvent(keyDown);
  let keyUp = new KeyboardEvent("keyup", {
    key: event.target.textContent,
    code: event.target.className
  });
  document.dispatchEvent(keyUp);
}

function onKeyDown() {
  switch (event.code) {
    case "Space":
      input.value += " ";
      break;
    case "Tab":
      input.value += "\t";
      break;
    case "Enter":
      input.value += "\n";
      break;
    case "Backspace":
      input.value = input.value.slice(0, input.value.length - 1);
      break;
    case "Delete":
      input.value = "";
      break;
    case "ControlRight":
    case "ControlLeft":
      control = !control;
      if (!(alt ^ control)) {
        language = language === 0 ? 2 : 0;
        changeKeyboard();
      }
      break;
    case "CapsLock":
    case "ShiftRight":
    case "ShiftLeft":
      shift = !shift;
      changeKeyboard();
      break;
    case "AltRight":
    case "AltLeft":
      alt = !alt;
      if (!(alt ^ control)) {
        language = language === 0 ? 2 : 0;
        changeKeyboard();
      }
      break;
    case "MetaLeft":
    case "MetaRight":
      break;
    default:
      input.value += event.key;
  }
  localStorage.setItem("language", language);
  let choice = findButton(event);
  if (choice) {
    choice.style.backgroundColor = "#a36363";
    choice.style.borderRadius = "50px";
    setTimeout(() => (choice.style.borderRadius = "0px"), 200);
  }
}

function onKeyUp() {
  switch (event.code) {
    case "CapsLock":
    case "ShiftRight":
    case "ShiftLeft":
      if (event.keyCode) {
        shift = !shift;
        changeKeyboard();
      }
      break;
  }
  localStorage.setItem("language", language);
  let choice = findButton(event);
  if (choice) {
    choice.style.backgroundColor = "#f59d9d";
    if (
      shift &&
      (choice.className.includes("Shift") ||
        choice.className.includes("CapsLock"))
    ) {
      choice.style.backgroundColor = "#a36363";
    }
  }
}

function findButton(event) {
  let choice = Array.from(buttons);
  if (event.code.includes("Key") || event.code.includes("Digit")) {
    choice = choice.find(item => item.textContent === event.key);
  } else {
    choice = choice.find(item => item.className === event.code);
  }
  return choice;
}

function changeKeyboard() {
  for (let i = 0; i < buttons.length; i++) {
    if (keys[i].className === "Key") {
      buttons[i].textContent = keys[i].key[language + shift];
    }
  }
}
