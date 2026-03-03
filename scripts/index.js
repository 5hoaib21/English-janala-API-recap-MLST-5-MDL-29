const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const remoteActive = () => {
  const lessonBtn = document.querySelectorAll(".lessonBtn");
  // console.log(lessonBtn);
  lessonBtn.forEach(btn=>{
    btn.classList.remove("active")
  })
};

const loadLevelWord = (id) => {
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

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
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
    return;
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
          <button onclick="my_modal_5.showModal()" class="btn bg-blue-50 hover:bg-blue-300 rounded-lg">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-blue-50 hover:bg-blue-300 rounded-lg">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
`;
    wordContainer.append(card);
  });
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
