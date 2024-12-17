const fs = require("fs");

const a = 100;

setImmediate(() => {
  console.log("set Immediate function execution");
});

setTimeout(() => {
  console.log("set time out executed");
}, 0);

fs.readFile("./models/user.js", () => {
  console.log("reading file");
});

console.log("a =" + a);
