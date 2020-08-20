// elements grb from the dom
const contestants = document.querySelector(".con");
const scale = document.querySelector(".scale");
const leader = document.querySelector(".leader");
const body = document.querySelector("body");
const avVotes = document.querySelector(".av");
const mainView = document.querySelector(".view");
const select = document.querySelector("#housemate");
const manualVotes = document.querySelector("#range");

// house mate data
const data = [
  {
    name: "Dorathy",
    image: "./images/Ellipse 1.png",
    votes: 0,
  },
  {
    name: "Nengi",
    image: "images/Nengi.jpg",
    votes: 0,
  },
  {
    name: "Erica",
    image: "./images/erica.jpg",
    votes: 0,
  },
  {
    name: "Laycon",
    image: "./images/laycon.jpg",
    votes: 0,
  },
  {
    name: "Prince",
    image: "./images/prinebbn.jpg",
    votes: 0,
  },
  {
    name: "Ozo",
    image: "./images/ozo.jpg",
    votes: 0,
  },
];

// Global Scopes
let availableVotes = 100;
let percentage = availableVotes;
let housemate = "";
let range = 0;

// main function displaying vote ui
function main() {
  const allContestants = data
    .map((each) => {
      return `<div class="card md:flex lg:flex flex-wrap md:p-2 lg:p-2 text-center my-2 shadow-lg border-t-2 border-blue-700 rounded py-2 ${each.name} ">
      <div class="img text-center lg:m-auto  lg:w-24 lg:flex lg:justify-center lg:items-center">
        <img
          src="${each.image}"
          alt="Dorathy"
          class="rounded-full w-12 h-12 m-auto lg:w-20 lg:h-20 img "
        />
      </div>
      <div class="lg:text-center lg:m-auto">
        <h2 class="text-gray-700 p-2 font-bold text-lg">${each.name}</h2>
        <div class="shadown-lg w-full m-auto flex justify-center">
          <p
            class=" dec border-2 py-1 px-6 py-2 cursor-pointer font-bold text-gray-900"
        
          >
            -
          </p>
          <p class="text-gray-900 font-bold border-2 px-8 py-2 votes">0

          </p>
          <p
            class=" inc border-2 py-1 px-6 py-2 cursor-pointer font-bold text-gray-900"

          >
            +
          </p>
        </div>
      </div>
      <div class="text-red-400 text-sm mx-24 md:mr-54 md-w-full lg:w-full lg:ml-64 warn show"> votes exceeded </div>
    </div>`;
    })
    .join("");

  contestants.innerHTML = allContestants;
}
main();

// button dexrementing vote
const decrement = document.querySelectorAll(".dec");
decrement.forEach((node) => {
  node.addEventListener("click", () => {
    if (percentage >= 100) {
      return;
    }
    data.map((ele, idx) => {
      let parent = node.parentElement;
      let grand = parent.parentElement;
      let great = grand.parentElement;
      if (great.classList.contains(ele.name)) {
        let votes = great.querySelector(".votes");
        if (ele.votes <= 0) {
          return;
        }
        votes.innerHTML = ele.votes = ele.votes - 1;

        percentage = percentage + 1;
        scale.style.width = percentage + "%";
        avVotes.innerHTML = percentage;
      }
    });
  });
});

// button incrementing vote
const incremant = document.querySelectorAll(".inc");
incremant.forEach((node, idx) => {
  node.addEventListener("click", () => {
    if (percentage <= 0) {
      const warn = document.querySelectorAll(".warn");
      warn[idx].classList.remove("show");

      setTimeout(() => {
        warn[idx].classList.add("show");
      }, 3000);
      return;
    }
    data.map((ele, idx) => {
      let parent = node.parentElement;
      let grand = parent.parentElement;
      let great = grand.parentElement;
      if (great.classList.contains(ele.name)) {
        let votes = great.querySelector(".votes");
        votes.innerHTML = ele.votes = ele.votes + 1;

        percentage = percentage - 1;
        scale.style.width = percentage + "%";
        avVotes.innerHTML = percentage;
      }
    });
  });
});

// leaders board
const sorted = () => {
  const whoEvicted = document.querySelector(".lea");
  const evict = document.querySelector(".evicted");
  const leads = data
    .sort((a, b) => a.votes - b.votes)
    .map((each) => {
      return `
      <div
      class="flex flex-wrap  justify-between mt-6 shadow-lg border-t-2 border-blue-800 rounded p-4"
    >
      <div class="flex justify-center items-center">
        <img src="${each.image}" alt="${each.name}" 
        class ="rounded-full w-12 h-12 m-auto lg:w-20 lg:h-20"
        />
        <span class="text-blue-900 font-bold mt-1 mx-2">${each.name}</span>
      </div>

      <div
        class="flex justify-center items-center mx-4 mt-2 items-center w-12 h-12 rounded-full bg-blue-800 text-white font-bold"
      >
        ${each.votes}
      </div>
      
    </div>`;
    })
    .join("");

  whoEvicted.innerHTML = leads;
  let lastPerson = data.sort((a, b) => a.votes - b.votes)[0];
  evict.innerHTML = lastPerson.name;
};

// displaying leders board
const leadersBlock = document.querySelector(".leads");
leader.addEventListener("click", () => {
  leadersBlock.classList.remove("show");
  mainView.classList.add("show");

  sorted();
});

// displaying main ui view
document.querySelector(".btn").addEventListener("click", () => {
  leadersBlock.classList.add("show");
  mainView.classList.remove("show");
});

// user select
select.addEventListener("input", () => {
  housemate = select.value;
});

// user vote manual input
manualVotes.addEventListener("input", () => {
  document.querySelector(".input_select").innerHTML = manualVotes.value;
  range = Number(manualVotes.value);
});

document.querySelector(".btn_vote").addEventListener("click", () => {
  if (!housemate) return;
  const filtered = data.filter((each) => {
    if (each.name === housemate) {
      if (each.votes > 100) {
        each.votes = 100;
      } else {
        let hm = document.querySelector(`.${housemate}`);
        let child = hm.querySelector(".votes");
        // if (percentage < range) {
        //   let warning = document.querySelector(".warn");
        //   warning.classList.remove("show1");

        //   setTimeout(() => {
        //     warning.classList.add("show1");
        //   }, 2000);
        // }

        if (range > percentage) return;
        let picked = Number(range);
        let updated = each.votes + range;
        each.votes = each.votes + range;

        percentage = percentage - picked;
        child.innerHTML = updated;

        scale.style.width = percentage + "%";
        avVotes.innerHTML = percentage;
      }
    }
    return each;
  });
});
