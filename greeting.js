const EventEmitter = require("events");
const spawn = require("child_process").spawn;
const path = require("path");

class Greeting extends EventEmitter {
  playing = false;

  player;

  constructor() {
    // Check if play and sox are in path

    super();
  }

  play() {
    if (this.playing) {
      // this.player.position.zero();
      this.stop();
      return;
    }
    this.playing = true;

    this.player = spawn("play", [
      path.resolve(__dirname, "intro.mp3"),
      path.resolve(__dirname, "beep.wav"),
    ]);
    this.player.on("error", (err) => {
      console.log(`error: ${err}`);
    });
    this.player.on("close", () => {
      this.playing = false;
      this.emit("end");
      this.playing = false;
    });
  }

  stop() {
    if (!this.playing) return;
    this.player.kill();
    this.player.removeAllListeners();
  }
}

module.exports = Greeting;
