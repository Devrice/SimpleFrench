// Fake data (pour definir le type des 12 exos)//on crée un array

let exercices = [
  {
    type: "learn",
    image: "GBonjour.png",
    sound: "Bonjour.m4a"
  },
  {
    type: "choiceSound",
    image: "GBonjour.png",
    sound: ["Bonjour.m4a", "Combien.m4a"]
  },
  {
    type: "learn",
    image: "GAurevoir.png",
    sound: "Aurevoir.m4a"
  },
  {
    type: "choiceImage",
    image: ["GCombien.png", "GAurevoir.png"],
    sound: "Combien.m4a"
  },
  {
    type: "TrueOrFalse",
    image: "GBonjour.png",
    sound: "Bonjour.m4a"
  },
  {
    type: "learn",
    image: "GCombien.png",
    sound: "Combien.m4a"
  },
  {
    type: "Choice3Sounds",
    image: "GBonjour.png",
    sound: "Bonjour.m4a"
  },
  {
    type: "TrueOrFalse",
    image: "GCombien.png",
    sound: "Combien.m4a"
  },
  {
    type: "learn",
    image: "GBonjour.png",
    sound: "Bonjour.m4a"
  },
  {
    type: "Choice4Images",
    image: "GCombien.png",
    sound: "Combien.m4a"
  },
  {
    type: "choice4Sounds",
    image: "GBonjour.png",
    sound: "Bonjour.m4a"
  },
  {
    type: "learn",
    image: "GCombien.png",
    sound: "Combien.m4a"
  }
];

class ButtonManager {
  constructor() {}

  createButtonSound(current) {
    let sound = document.createElement("div");
    sound.classList.add("buttonSound"); //class sound
    let audio = document.createElement("audio");
    audio.src = "./audio/" + current; //la source de l'audio
    audio.controls = true;
    sound.appendChild(audio);
    let logo = document.createElement("img");
    logo.src = "images/speaker4.png"; //colle le logo
    sound.appendChild(logo);
    let container = document.getElementById("container"); //definir le container où doit se trouver l'image
    container.appendChild(sound);
  }

  listenButtons() {
    let sounds = document.getElementsByClassName("buttonSound");
    for (var i = 0; i < sounds.length; i++) {
      //selectionner le son
      let child = sounds[i].children[0];
      sounds[i].addEventListener("click", e => {
        //fait jouer l'audio au click
        child.play();
      });
    }
  }
}

class ProgressBar {
  constructor() {}

  init(exercices) {
    let i = 0;
    //incrementation de la progressbar
    let progression = document.getElementsByClassName("progression");
    while (i < exercices.length) {
      let div = document.createElement("div");
      div.classList.add("level"); //créer la class level
      progression[0].appendChild(div);
      i++;
    }
  }
}

class App {
  constructor(exercices, buttonManager, progressbar) {
    this.exercices = exercices;
    this.index = 0;
    this.buttonManager = buttonManager;
    this.progressbar = progressbar;
    this.init();
    this.listenNextExercice();
    this.progressbar.init(exercices);
  }

  init() {
    // selon le type de l'index current, j'appel la méthode pour afficher le type d'exercice
    if (this.exercices[this.index].type === "learn") {
      this.displayLearn(this.exercices[this.index]);
    } else if (this.exercices[this.index].type === "choiceSound") {
      this.displayChoiceSound(this.exercices[this.index]);
    } else if (this.exercices[this.index].type === "choiceImage") {
      this.displayChoiceImage(this.exercices[this.index]);
    } else if (this.exercices[this.index].type === "TrueOrFalse") {
      this.displayTrueOrFalse(this.exercices[this.index]);
    }
  }

  boutonAparue() {}

  listenNextExercice() {
    let nextButton = document.getElementsByClassName("next");
    nextButton[0].addEventListener("click", e => {
      // Si next n'a pas rouge
      let levels = document.getElementsByClassName("level");
      console.log(levels);
      levels[this.index].classList.add("blue");
      this.index += 1;

      let container = document.getElementById("container");
      container.innerHTML = "";
      this.init();
      nextButton[0].classList.add("hidden");
    });
  }
  //pour afficher l'image
  displayImage(exercice) {
    let image = document.createElement("img");
    image.src = "images/" + exercice.image;
    let block = document.createElement("div");
    block.classList.add("image");
    block.appendChild(image);
    let container = document.getElementById("container");
    container.appendChild(block);
  }

  // EXERCICE LEARN
  displayLearn(exercice) {
    let container = document.getElementById("container");
    container.classList.add("learn");
    container.classList.add("main-background");
    container.classList.remove("image-border");
    this.displayImage(exercice);
    this.buttonManager.createButtonSound(exercice.sound);
    this.buttonManager.listenButtons();
    let sounds = document.getElementsByClassName("buttonSound");
    //on crée le bouton next
    sounds[0].addEventListener("click", e => {
      // document.getElementById("container").style.background = "skyblue";(si on veut changer la couleur du container)
      let nextButton = document.getElementsByClassName("next");

      nextButton[0].classList.remove("hidden");
    });
  }

  //EXERCICE CHOIX DES SONS
  displayChoiceSound(exercice) {
    //definir la class du type d'exo
    let container = document.getElementById("container");
    container.classList.add("choiceSound");

    container.classList.remove("main-background"); //retire le background de l'exercice
    let sound = document.createElement("div");

    this.displayImage(exercice);
    // positionne les boutons aléatoirement
    exercice.sound.map(v => {
      console.log(v);
      this.buttonManager.createButtonSound(v);
    });
    let sounds = document.getElementsByClassName("buttonSound");

    //boucle for
    for (var i = 0; i < sounds.length; i++) {
      sounds[i].addEventListener("click", eventSound => {
        //boucle sur tout les boutons

        if (eventSound.target.classList.contains("buttonSound")) {
          var currentSoundButton = eventSound.target;
        } else {
          var currentSoundButton = eventSound.target.parentNode;
        }

        for (let j = 0; j < sounds.length; j++) {
          sounds[j].classList.remove("selected");
        }

        if (audioSrc != exercice.sound[0]) {
          currentSoundButton.classList.add("selected-red");
        } else {
          currentSoundButton.classList.add("selected-green");
        }

        //ajoute slection du bouton
        currentSoundButton.classList.add("selected");

        // document.getElementById("container").style.background = "skyblue";(si on veut changer la couleur du container)
        let nextButton = document.getElementsByClassName("next");
        nextButton[0].classList.remove("hidden");

        console.log(currentSoundButton.firstChild.src);
        console.log(exercice.sound[0]);

        var audioSrc = currentSoundButton.firstChild.src.split("/")[
          currentSoundButton.firstChild.src.split("/").length - 1
        ];


     

        console.log(nextButton);
        // for (i = 0; i < selected.sounds.eventSound.target.parentNodength; i++) {
        //   if (sounds[i].audio.src === exercice.sound[0]) {
        //     sounds[i].classList.add("selected-green");
        //   }
        // }
      });
    }
    this.buttonManager.listenButtons();
  }

  //EXERCICE CHOIX D'IMAGES
  displayChoiceImage(exercice) {
    //definir la class du type d'exo
    let container = document.getElementById("container");
    container.classList.remove("main-background");
    container.classList.add("choiceImage");
    let sound = document.createElement("div");
    sound.classList.add("buttonSound");
    this.displayImage(exercice);
    image.image.map(v => {
      this.buttonManager.createButtonSound(v);
    });
    let image = document.getElementsByClassName("buttonSound");
    //on crée le bouton next
    image[0].addEventListener("click", e => {
      image.classList.add("selected");
      // document.getElementById("container").style.background = "skyblue";
      let nextButton = document.getElementsByClassName("next");
      nextButton[0].classList.remove("hidden");
    });
    this.buttonManager.listenButtons();
  }
}

let progressbar = new ProgressBar();
let buttonManager = new ButtonManager();

// Injection de dépandances
let app = new App(exercices, buttonManager, progressbar);
