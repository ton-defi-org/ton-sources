import { exec } from "child_process"


let stepCounter = 0;
let blockCounter = 0;
const fiveMin = 1000 * 300;
const oneHour = 1000 * 300 * 20;

const prefix = "___try001____";
function step() {
    stepCounter++;
    let name = `${Date.now()}-${stepCounter}`
    let out = exec(`curl -F "text=${prefix}${stepCounter}" http://localhost/add?name=${name}meta-type=mempool`).toString();
    console.log(out);
}


function block() {
    blockCounter++;
    let name = `${Date.now()}-${blockCounter}`
    let out = exec(`curl -F "text=mempoldata11" http://localhost/add?name=${name}meta-type=block`).toString();
    console.log(out);
}


step();
setInterval(step, fiveMin)

setInterval(block, oneHour)