const delay = async (time) => {
  await new Promise((resolve) => setTimeout(resolve, time * 1000));
  console.log(`Delayed action after ${time} seconds`);
};

module.exports = { delay };
