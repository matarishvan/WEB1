const quizData = [
  {
    image: "imagens/pope-wearing-balenciaga-jacket-viral-ai-images.jpeg",
    answer: "Sim",
    reason: "Um viral feito por IA, há diversas anomalias e também porque o Papa vestiria balenciaga"
  },
  {
    image: "imagens/paris-garbage-viral-ai-images.jpg",
    answer: "Sim",
    reason: "Uma imagem que apresenta diversas anomalias e inconsistencias, parecendo estilizado"
  },
  {
    image: "imagens/trump-arrested-viral-ai-images.jpeg",
    answer: "Sim",
    reason: "Um viral feito por IA, há diversas anomalias, porque Trump seria preso desta forma?"
  },
  {
    image: "imagens/aa.jpg",
    answer: "Não",
    reason: "É só uma foto borrada"
  },
  {
    image: "imagens/pops.jpg",
    answer: "Não",
    reason: "É a foto da capa do album Popstar da Tinashe"
  }
];

quizData.sort(() => Math.random() - 0.5);

const questionElement = document.getElementById("question");
const optionElement = document.getElementById("option");
const imageContainer = document.getElementById("image-container");
const feedbackElement = document.getElementById("feedback");
const quizContainer = document.getElementById("quiz");

let currentQuestion = 0;
let score = 0;

function zoomImage(src) {
  const modal = document.getElementById("zoom-modal");
  document.getElementById("zoom-img").src = src;
  modal.style.display = "flex";
}

function showQuestion() {
  const current = quizData[currentQuestion];
  feedbackElement.innerHTML = "";

  if (imageContainer) {
    imageContainer.innerHTML = current.image
      ? `<img src="${current.image}" alt="Quiz IA" onclick="zoomImage('${current.image}')" style="max-width: 100%; max-height: 400px; display: block; margin: 0 auto; border-radius: 8px; margin-bottom: 15px;">`
      : "";
  }

  const options = ["Sim", "Não"].sort();
  optionElement.innerHTML = "";

  options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.style.margin = "5px";
    button.style.padding = "10px 20px";
    button.addEventListener("click", selectAnswer);
    optionElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const chosen = e.target.innerText;
  const current = quizData[currentQuestion];
  const acertou = chosen === current.answer;

  if (acertou) score++;

  optionElement.querySelectorAll("button").forEach(btn => btn.disabled = true);

  const textoBotao = currentQuestion < quizData.length - 1 ? "Próxima" : "Ver resultado";

  feedbackElement.innerHTML = `
    <p style="color: #000000; margin-bottom: 10px;">
      <strong>${acertou ? "Acertou!" : `Errou! Resposta: ${current.answer}`}</strong> ${current.reason}
    </p>
    <button id="next-btn" style="padding: 8px 18px;">${textoBotao}</button>
  `;

  document.getElementById("next-btn").onclick = () => {
    currentQuestion++;
    currentQuestion < quizData.length ? showQuestion() : showResult();
  };
}

function showResult() {
  if (quizContainer) {
    quizContainer.innerHTML = `
      <div class="text-center p-4">
        <h1>Teste Finalizado!</h1>
        <span style="color: #000000;">
          <p class="lead my-3">Você acertou ${score} de ${quizData.length} imagens.</p>
        </span>
        <div class="d-flex justify-content-center gap-3">
          <button onclick="location.reload()" class="btn btn-branco">Tentar Novamente</button>
          <button onclick="window.location.href='fin.html'" class="btn btn-outline-secondary">Saiba como se proteger</button>
        </div>
      </div>
    `;
  }
}

showQuestion();