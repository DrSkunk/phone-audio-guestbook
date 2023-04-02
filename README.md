# Phone Audio Guestbook

This is a guestbook that uses a rotary phone to record audio messages using a Raspberry Pi and a USB sound card.

Inspired by by Nick Pourazima and Craig Hesling: https://github.com/nickpourazima/rotary-phone-audio-guestbook

## Software

This is written in Node.js and uses the [onoff](https://www.npmjs.com/package/onoff) library to read the rotary phone dial.
It calls the [Sox command line tool](https://sox.sourceforge.net/) to record the audio. This also installs `play` and `rec`, which must must be available in path since this program calls them using `child_process.spawn`.

Install the dependencies with npm:

```bash
npm install
```

Create `.env` file with the following variable:

```bash
GPIO_PIN=14
```

Where `GPIO_PIN` is the GPIO pin that the rotary phone hook switch is connected to.

Create a greeting and place its audio file in the root directory, next to `beep.wav`. The file must be named `greeting.mp3`.

Run the program with:

```bash
npm start
```

## Hardware

I'll flesh this out later, promise 🤞!
