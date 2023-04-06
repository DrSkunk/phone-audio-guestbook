const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const path = require("path");

const Recorder = require("./recorder");
const Player = require("./player");
const { initIO, accessible: useGPIO } = require("./io");
const { readNumber } = require("./read-number");

const greeting = new Player([
  path.join(__dirname, "greeting.mp3"),
  path.join(__dirname, "beep.wav"),
]);
const menu = new Player(path.join(__dirname, "menu.mp3"), { repeat: 5 });
const recorder = new Recorder();

async function onPress() {
  console.log("Button pressed.");
  greeting.stop();
  greeting.removeAllListeners();
  recorder.stop();
}

async function onRelease() {
  console.log("Button released.");
  menu.play();
  let number = -1;
  while (number < 1 || number > 3) {
    number = await readNumber();
    console.log("Number entered:", number);
  }
  menu.stop();
  greeting.play();
  greeting.on("end", () => {
    console.log("Greeting ended.");
    recorder.start();
  });
}

if (useGPIO) {
  initIO(onPress, onRelease);
} else {
  async function main() {
    const rl = readline.createInterface({ input, output });
    await rl.question("Press enter to pick up the phone");
    onRelease();
    await rl.question("Press enter to hang up the phone");
    onPress();
    rl.close();
    await main();
  }

  main();
}
