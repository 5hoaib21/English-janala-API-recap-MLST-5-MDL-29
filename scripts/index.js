const createEls = (arr) => {
  const htmlEls = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlEls.join(" ");
};


function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const remoteActive = () => {
  const lessonBtn = document.querySelectorAll(".lessonBtn");
  // console.log(lessonBtn);
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      remoteActive(); // remove all active classes
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); //add active class
      displayLevelWord(data.data);
    });
};

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
<div class="">
            <h2 class="font-bangla text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
          </div>
          <div class="">
            <h2 class=" font-bold">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
        </div>
          <div class="">
            <h2 class=" font-bold">Example</h2>
            <p class="font-bangla">${word.sentence}</p>
        </div>
          <div class="">
            <h2 class=" font-bold">Synonym</h2>
            <div class="">${createEls(word.synonyms)}</div>
             
        </div>
`;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    manageSpinner(true) //নিজে বুঝে করলাম :)
    wordContainer.innerHTML = `
     <div class="text-center col-span-full space-y-6">
     <img class="mx-auto" src="./assets/alert-error.png" alt="">
     <p class="text-xl opacity-50 font-bangla">
     এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
     </p>
     <h2 class="text-5xl font-medium font-bangla">
     নেক্সট Lesson এ যান
     </h2>
      </div>
     `;
    return manageSpinner(false); //রিটার্ন এর ভিতর আরেকটা ফানশন চলবে কিনা জানিনা কিন্তু নিজে বুঝে দিলাম ।
  }

  // property's keys and values
  //   {
  //     "id": 79,
  //     "level": 1,
  //     "word": "Jump",
  //     "meaning": "লাফানো",
  //     "pronunciation": "জাম্প"
  // }

  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
<div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায়নি"}"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-blue-50 hover:bg-blue-300 rounded-lg">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${word.word}')" class="btn bg-blue-50 hover:bg-blue-300 rounded-lg">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
`;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLessons = (lessons) => {
  //1. get the container && empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  //2. get into every lessons
  for (let lesson of lessons) {
    // console.log(lesson);

    //3. create element
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
          <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lessonBtn"
            ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
          </button>
    `;
    //4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();



document.getElementById("btnSearch").addEventListener("click", ()=>{
  remoteActive();
  // manageSpinner(true);
  const input = document.getElementById("inputSearch");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
  .then(res => res.json())
  .then(data=>{
    const allWords = data.data;
    // console.log(allWords);
    const filterWords = allWords.filter(word=>word.word.toLowerCase().includes(searchValue))

    // manageSpinner(false);
    displayLevelWord(filterWords);
  });
})