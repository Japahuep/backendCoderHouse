const getRandomNum = () => Math.floor(Math.random() * 1000);

const getRandomNumObj = (n) => {
  const aux = {};
  n = Number.isInteger(n) ? n : 100000000;
  for (let i = 0; i < n; i++) {
    let num = getRandomNum().toString();
    if (Object.keys(aux).includes(num)) {
      aux[num] = ++aux[num];
    } else {
      aux[num] = 1;
    }
  }
  return aux;
};

process.on("message", (msg) => {
  if (msg.instruction === "start") {
    process.send(getRandomNumObj(msg.qty));
  }
});
