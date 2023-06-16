function add(a,b){
    return a + b
}

console.log(add(2,3));
console.log(process.argv);
var processArg = process.argv.slice(2);
console.log(processArg);
console.log(add(parseInt(processArg[0]),parseInt(processArg[1])));