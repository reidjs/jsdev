function echo(s, n) {
  for (var i = 0; i < n; i++) {
    console.log(s);
  }
}
function average(arr) {
  sum = 0;
  for(let i in arr) {
    sum+=arr[i];
  }
  console.log(Math.round(sum/arr.length));
}
// echo("echo", 10);
average([90,98,89,100,100,86,94]);
