const { GPIO_PIN } = require("./config");
const { Gpio } = require("onoff");

let button = null;

function initIO(onPress, onRelease) {
  function onChange(err, value) {
    if (err) {
      console.error("Error reading button:", err);
      return;
    }

    if (value === 1) {
      console.log("Button pressed.");
      onPress();
    } else {
      console.log("Button released.");
      onRelease();
    }
  }
  if (button) {
    console.info("IO already initialized.");
    return;
  }

  button = new Gpio(GPIO_PIN, "in", "both", { debounceTimeout: 10 });
  button.watch(onChange);
}

module.exports = {
  initIO,
  accessible: Gpio.accessible,
};
