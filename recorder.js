const EventEmitter = require("events");
const spawn = require("child_process").spawn;
const path = require("path");

class Recorder extends EventEmitter {
  recording = false;

  recorder;

  constructor() {
    // Check if play and sox are in path

    super();
  }

  start() {
    if (this.recording) {
      this.stop();
      return;
    }
    const fileName = path.join("recordings", `${new Date().toISOString()}.wav`);
    console.log("Writing new recording file at:", fileName);
    this.recording = true;

    this.recorder = spawn("rec", [fileName]);
    this.recorder.on("error", (err) => {
      console.log(`error: ${err}`);
    });
    this.recorder.on("close", () => {
      this.recording = false;
      this.emit("end");
      this.recording = false;
    });
  }

  stop() {
    if (!this.recording) {
      console.warn("Recorder not recording.");
      return;
    }
    this.recorder.kill("SIGINT");
  }
}

module.exports = Recorder;
