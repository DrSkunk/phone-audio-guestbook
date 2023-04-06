const EventEmitter = require("events");
const spawn = require("child_process").spawn;

class Player extends EventEmitter {
  playing = false;

  process;

  constructor(files, options = {}) {
    super();
    if (Array.isArray(files)) {
      this.files = files;
    } else {
      this.files = [files];
    }
    this.options = options;
  }

  play() {
    if (this.playing) {
      this.stop();
      return;
    }
    this.playing = true;

    const params = Object.entries(this.options).reduce((acc, [key, value]) => {
      acc.push(`${key}`);
      if (value) acc.push(` ${value}`);
      return acc;
    }, []);

    this.process = spawn("play", [...this.files, ...params]);
    this.process.on("error", (err) => {
      console.log(`error: ${err}`);
    });
    this.process.on("close", () => {
      this.playing = false;
      this.emit("end");
      this.playing = false;
    });
    this.process.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });
  }

  stop() {
    if (!this.playing) return;
    this.process.kill();
    this.process.removeAllListeners();
  }
}

module.exports = Player;
