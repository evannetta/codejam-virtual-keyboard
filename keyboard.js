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
  new key("key", "`~ёЁ", 1),
  new key("key", "1!1!", 1),
  new key("key", '2@2"', 1),
  new key("key", "3#3№", 1),
  new key("key", "4$4;", 1),
  new key("key", "5%5%", 1),
  new key("key", "6^6:", 1),
  new key("key", "7&7?", 1),
  new key("key", "8*8*", 1),
  new key("key", "9(9(", 1),
  new key("key", "0)0)", 1),
  new key("key", "-_-_", 1),
  new key("key", "=+=+", 1),
  new key("Backspace", "Backspace", 2),
  new key("Tab", "Tab", 2),
  new key("key", "qQйЙ", 1),
  new key("key", "wWцЦ", 1),
  new key("key", "eEуУ", 1),
  new key("key", "rRкК", 1),
  new key("key", "tTеЕ", 1),
  new key("key", "yYнН", 1),
  new key("key", "uUгГ", 1),
  new key("key", "iIшШ", 1),
  new key("key", "oOщЩ", 1),
  new key("key", "pPзЗ", 1),
  new key("key", "[{хХ", 1),
  new key("key", "]}ъЪ", 1),
  new key("key", "\\|\\/", 1),
  new key("CapsLock", "CapsLock", 2),
  new key("key", "aAфФ", 1),
  new key("key", "sSыЫ", 1),
  new key("key", "dDвВ", 1),
  new key("key", "fFаА", 1),
  new key("key", "gGпП", 1),
  new key("key", "hHрР", 1),
  new key("key", "jJоО", 1),
  new key("key", "kKлЛ", 1),
  new key("key", "lLдД", 1),
  new key("key", ";:жЖ", 1),
  new key("key", "'\"эЭ", 1),
  new key("Enter", "Enter", 2),
  new key("Shift", "Shift", 2),
  new key("key", "zZяЯ", 1),
  new key("key", "xXчЧ", 1),
  new key("key", "cCсС", 1),
  new key("key", "vVмМ", 1),
  new key("key", "bBиИ", 1),
  new key("key", "nNтТ", 1),
  new key("key", "mMьЬ", 1),
  new key("key", ",<бБ", 1),
  new key("key", ".>юЮ", 1),
  new key("key", "/?.,", 1),
  new key("Delete", "Del", 1),
  new key("Shift", "Shift", 2),
  new key("Control", "Ctrl", 1),
  new key("Meta", "Win", 1),
  new key("Alt", "Alt", 1),
  new key("Space", "Space", 9),
  new key("Alt", "Alt", 1),
  new key("Meta", "Win", 1),
  new key("Control", "Ctrl", 1)
];
createBoard();
document.addEventListener("keydown", onKeyDown);
let buttons = Array.from(document.getElementsByTagName("button"));
function createBoard() {
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
    } else if (button.className !== "key") {
      button.append(keys[i].key);
    } else {
      button.append(keys[i].key[0]);
    }
    button.style.gridColumn = "span " + keys[i].width;
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
    case "Control":
      control = !control;
      if (!(alt ^ control)) {
        language = language === 0 ? 2 : 0;
        changeKeyboard();
      }
      break;
    case "CapsLock":
    case "Shift":
      shift = !shift;
      changeKeyboard();
      break;
    case "Alt":
      alt = !alt;
      if (!(alt ^ control)) {
        language = language === 0 ? 2 : 0;
        changeKeyboard();
      }
      break;
    case "Meta":
      break;
    default:
      input.value += event.key;
  }
}

function changeKeyboard() {
  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    if (keys[i].className === "key") {
      buttons[i].textContent = keys[i].key[language + shift];
    }
  }
}
