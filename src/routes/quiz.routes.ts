import { Router } from "express";

const router = Router();

/* ======================
   🧠 QUIZ QUESTIONS
====================== */
router.get("/questions", async (req, res) => {

  const questions = [
    {
      id: 1,
      question: "Qual período veio antes do Jurássico?",
      optionA: "Triássico",
      optionB: "Cretáceo",
      optionC: "Permiano",
      optionD: "Devoniano",
      correct: "A"
    },

    {
      id: 2,
      question: "Qual destes era um dinossauro carnívoro?",
      optionA: "Triceratops",
      optionB: "T-Rex",
      optionC: "Braquiossauro",
      optionD: "Estegossauro",
      correct: "B"
    },

    {
      id: 3,
      question: "Em qual era viveram os dinossauros?",
      optionA: "Cenozoico",
      optionB: "Paleozoico",
      optionC: "Mesozoico",
      optionD: "Neoproterozoico",
      correct: "C"
    }
  ];

  return res.json(questions);

});

export default router;