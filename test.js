const createEls = (arr) => {
  const htmlEls = arr.map((el) => `<span class="btn">${el}</span>`);
  console.log(htmlEls.join(" "));
};

const synonyms = ["hello", "hi", "shoaib"];
createEls(synonyms);
