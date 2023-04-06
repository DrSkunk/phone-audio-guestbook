function readNumber() {
  return new Promise((resolve, reject) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", (data) => {
      // Exit on CTRL+C
      if (data[0] === 3) {
        reject();
      }
      // Only accept 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
      if (data[0] >= 0x30 && data[0] <= 0x39) {
        resolve(data[0] - 0x30);
      }
    });
  });
}

module.exports = {
  readNumber,
};
