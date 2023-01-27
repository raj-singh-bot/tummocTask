const fs = require("fs");

//synchronous
//here readFileSync is synchronous task so when task is request comes first it goes to event queue and if it is non-blocking operation it will execute and send response
console.log("1");
const result = fs.readFileSync("sample.txt", "utf-8");
console.log(result);

console.log("2");

//asynchronous
//here readFile is asynchronous task so from event queue ,event loop will assign a thread from thread pool to that task and waits to execute
console.log("3");
fs.readFile("sample.txt", "utf-8", (err, file) => {
  console.log(file);
});
console.log("4");
