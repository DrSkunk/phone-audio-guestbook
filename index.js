const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("process");

const Recorder = require("./recorder");
const Greeting = require("./greeting");
const { initIO, accessible } = require("./io");

const greeting = new Greeting();
const recorder = new Recorder();

function onPress() {
  console.log("Button pressed.");
  greeting.stop();
  greeting.removeAllListeners();
  recorder.stop();
}

function onRelease() {
  console.log("Button released.");
  greeting.play();
  greeting.on("end", () => {
    console.log("Greeting ended.");
    recorder.start();
  });
}

if (accessible) {
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
