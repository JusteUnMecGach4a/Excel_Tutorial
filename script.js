document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Smooth scroll and active state
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Scroll Spy
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Formula Simulator Logic
    const challenges = [
        {
            title: "Défi 1 : Somme Simple",
            desc: "Additionnez les valeurs des cellules A1, A2 et A3.",
            valid: ["=SOMME(A1:A3)", "=A1+A2+A3", "=SOMME(A1;A2;A3)"],
            successMsg: "Bravo ! Vous maîtrisez l'addition."
        },
        {
            title: "Défi 2 : Moyenne",
            desc: "Calculez la moyenne de la colonne B (B1 à B3).",
            valid: ["=MOYENNE(B1:B3)", "=(B1+B2+B3)/3"],
            successMsg: "Excellent ! La moyenne n'a plus de secret."
        },
        {
            title: "Défi 3 : Logique SI",
            desc: "Si A1 est supérieur à 5, affichez 'OK', sinon 'NON'.",
            valid: ['=SI(A1>5;"OK";"NON")', '=SI(A1>5;"OK";"NON")'],
            successMsg: "Génial ! Vous commencez à programmer Excel."
        }
    ];

    let currentChallenge = 0;
    const input = document.getElementById('formula-input');
    const checkBtn = document.getElementById('check-btn');
    const resultMsg = document.getElementById('result-msg');
    const title = document.getElementById('challenge-title');
    const desc = document.getElementById('challenge-desc');

    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            const val = input.value.trim().toUpperCase().replace(/\s/g, '');
            const challenge = challenges[currentChallenge];
            
            const isValid = challenge.valid.some(v => v.toUpperCase().replace(/\s/g, '') === val);

            if (isValid) {
                resultMsg.textContent = challenge.successMsg;
                resultMsg.className = 'success';
                setTimeout(() => {
                    currentChallenge++;
                    if (currentChallenge < challenges.length) {
                        updateChallenge();
                    } else {
                        title.textContent = "🏆 TOUS LES DÉFIS RÉUSSIS !";
                        desc.textContent = "Vous êtes un véritable Master d'Excel.";
                        input.style.display = 'none';
                        checkBtn.style.display = 'none';
                    }
                }, 2000);
            } else {
                resultMsg.textContent = "Formule incorrecte. Réessayez !";
                resultMsg.className = 'error';
            }
        });
    }

    function updateChallenge() {
        const c = challenges[currentChallenge];
        title.textContent = c.title;
        desc.textContent = c.desc;
        input.value = "";
        resultMsg.style.display = 'none';
    }

    // Quiz Logic
    const quizQuestions = [
        {
            q: "Quelle touche permet de figer une cellule (référence absolue $) ?",
            o: ["F2", "F4", "F12", "Echap"],
            a: 1
        },
        {
            q: "Quel format de fichier est nécessaire pour sauvegarder une Macro ?",
            o: [".xlsx", ".csv", ".xlsm", ".txt"],
            a: 2
        },
        {
            q: "Quel outil permet de nettoyer et transformer des données sans code ?",
            o: ["TCD", "Power Query", "Solver", "RechercheV"],
            a: 1
        },
        {
            q: "Laquelle de ces fonctions est la plus flexible pour les recherches ?",
            o: ["RECHERCHEV", "RECHERCHEH", "RECHERCHEX", "SOMME.SI"],
            a: 2
        }
    ];

    let currentQ = 0;
    let score = 0;

    function loadQuestion() {
        const qData = quizQuestions[currentQ];
        const qText = document.getElementById('quiz-question');
        const optionsBox = document.getElementById('quiz-options');
        
        if (!qText) return;

        qText.textContent = `Question ${currentQ + 1} : ${qData.q}`;
        optionsBox.innerHTML = '';
        
        qData.o.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-btn';
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(index, btn);
            optionsBox.appendChild(btn);
        });
    }

    function checkAnswer(idx, btn) {
        const correct = quizQuestions[currentQ].a;
        const btns = document.querySelectorAll('.quiz-btn');
        
        btns.forEach(b => b.disabled = true);
        
        if (idx === correct) {
            btn.classList.add('correct');
            score++;
        } else {
            btn.classList.add('wrong');
            btns[correct].classList.add('correct');
        }

        setTimeout(() => {
            currentQ++;
            if (currentQ < quizQuestions.length) {
                loadQuestion();
            } else {
                showFinalScore();
            }
        }, 1500);
    }

    function showFinalScore() {
        document.getElementById('question-box').style.display = 'none';
        const footer = document.getElementById('quiz-footer');
        footer.style.display = 'block';
        document.getElementById('quiz-score').textContent = `Score final : ${score} / ${quizQuestions.length}`;
    }

    window.resetQuiz = () => {
        currentQ = 0;
        score = 0;
        document.getElementById('question-box').style.display = 'block';
        document.getElementById('quiz-footer').style.display = 'none';
        loadQuestion();
    };

    loadQuestion();
});
