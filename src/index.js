import { fonctionne } from './grapheanime.js';
import { afficherVenteManga } from './Ventemanga.js';
import {typepersonnage}  from './typeperso.js';
import {mape} from './carteonepiece.js';
import { primepers } from './primeperso.js';

const inputData = {
  "Shichibukai": 7,
  "Yonko": 4,
  "Luffy era": 12,
  "Amiraux": 3,
  "Vice-miraux": 8
};

let i = 0;
let i1 = 0;
let i2 = 0;
let i3 = 0;


mape();


//lancer la lecture de ./sonOPAmbiant.mp3 en boucle
let audio = new Audio('./sonOPAmbiant.mp3');
audio.loop = true;
audio.play();


let texteinfo = document.getElementById('textluffy');

let texte = ["One Piece Explorer: Plongez dans l'univers du manga avec des visualisations interactives", 
"Découvrez les chiffres clés de l'univers One Piece à travers nos trois graphiques simples mais informatifs. Plongez dans les ventes de manga, les sorties annuelles de l'animé et les différents types de personnages avec nos graphiques interactifs. Suivez l'évolution de votre série préférée et explorez les données fascinantes de cet anime/manga culte.",
"Partez à l'aventure avec l'équipage de Luffy grâce à notre carte interactive de l'univers One Piece. Suivez leurs périples à travers les différentes îles et découvrez les endroits emblématiques de l'histoire de ce manga/anime légendaire. Explorez les lieux et revivez les moments marquants de l'histoire de One Piece avec notre carte interactive.",
"Explorez les primes des personnages de One Piece grâce à notre graphique interactif. Découvrez les personnages les plus recherchés et les plus dangereux de l'univers One Piece. Suivez l'évolution des primes des personnages au fil des arcs et découvrez les personnages les plus recherchés de l'histoire de One Piece."];


const elementToObserve = document.querySelector('#stat3');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {    
        fonctionne();
        afficherVenteManga();
        typepersonnage( inputData);
    primepers();      
      // Arrêtez l'observation une fois que l'élément est en intersection
 
     observer.disconnect();
    
    }
  });
});

observer.observe(elementToObserve);


// Ajoutez l'élément à observer à l'instance de l'objet IntersectionObserver

const elementToObservee = document.querySelector('#titrebulle');

const observere = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {    
      
    primepers(); 

    observere.disconnect();
    }
   
  });

});

observere.observe(elementToObservee);



const sections = document.querySelectorAll('.section');
const floatingWindowContents = document.querySelectorAll('.floating-window-content');

// Sélectionnez les éléments nécessaires
const staticImage = document.getElementById('static-image');
const floatingWindow = document.getElementById('floating-window');

staticImage.addEventListener('mouseover', () => {
  staticImage.classList.add('statiqueon');
  floatingWindow.classList.add('visible');
  floatingWindow.classList.remove('hidden');
});

staticImage.addEventListener('mouseout', (event) => {
  staticImage.classList.remove('statiqueon');
  const relatedTarget = event.relatedTarget;
  if (relatedTarget !== floatingWindow && !floatingWindow.contains(relatedTarget)) {
    floatingWindow.classList.add('hidden');
    floatingWindow.classList.remove('visible');
  }
});

// Fonction pour ajouter et supprimer la classe "statiqueon" toutes les 5 secondes
function toggleStaticImageAnimation() {
  staticImage.classList.add('statiqueon');

  setTimeout(() => {
    staticImage.classList.remove('statiqueon');
  }, 3000); // La durée de l'animation est de 3 secondes, donc on supprime la classe après 3 secondes
}

// Appeler la fonction toggleStaticImageAnimation toutes les 5 secondes
setInterval(toggleStaticImageAnimation, 5000);

floatingWindow.addEventListener('mouseout', (event) => {
  const relatedTarget = event.relatedTarget;
  if (relatedTarget !== staticImage && !staticImage.contains(relatedTarget)) {
    staticImage.classList.remove('statiqueon');
    floatingWindow.classList.add('hidden');
    floatingWindow.classList.remove('visible');
  }
});


let tooltipprime = document.getElementById('tooltipperso');

// ajouter un écouteur d'événement pour tootltip et lui ajouter une classe lorsqu'il est cliqué et maintenu

function updateFloatingWindowContent() {
  const scrollY = window.scrollY;
  const offset = 100; // Hauteur fixe pour détecter l'entrée dans la section
  let currentSection = null;

  // Trouver la section actuelle
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrollY;

    if (sectionTop - offset <= scrollY && rect.bottom + scrollY > scrollY) {
      currentSection = section;
    }
  });

  // Mettre à jour le contenu de la fenêtre flottante
  if (currentSection) {
    const currentSectionId = currentSection.getAttribute('data-section');
    floatingWindowContents.forEach(content => {
      if (content.id === `floating-window-content-${currentSectionId}`) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });
  }
}






  let ire = 0;
  setInterval(irechange, 100);

  function irechange(){
    console.log(ire)
    if(ire == 1){
      ire = 0;
    } }


  // Appeler updateFloatingWindowContent lors du défilement et au chargement initial
  window.addEventListener('scroll', function(){
    
    if(ire == 0){
     
      updateFloatingWindowContent();
    
    }
    ire = 1;
    
  });
  window.addEventListener('load', updateFloatingWindowContent);

 
  document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.play();
  });













