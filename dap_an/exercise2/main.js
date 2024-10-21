const questions = [
    {
        content: "Câu hỏi 1: Đông Lào là nước nào ?",
        answers: [
            "A.Việt Nam",
            "B.Lào",
            "C.Philipine",
            "D.Indonesia"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 2: Tây Lào là nước nào",
        answers: [
            "A.Miến Điện",
            "B.Ấn Độ",
            "C.Nepal",
            "D.Thái Lan"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 3: Nam Lào là nước nào",
        answers: [
            "A.Campuchia",
            "B.Malaysia",
            "C.Singapore",
            "D.Việt Nam"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 4: Bắc Lào là nước nào",
        answers: [
            "A.Trung Quốc",
            "B.Hàn Quốc",
            "C.Nhật Bản",
            "D.Hoa Kỳ"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 5: Lào có bao nhiêu tỉnh thành",
        answers: [
            "A.14",
            "B.15",
            "C.16",
            "D.17"
        ],
        correctAnswer: 1
    },
    {
        content: "Câu hỏi 6: Đâu là thủ đô của Lào",
        answers: [
            "A.Hà Nội",
            "B.Bangkok",
            "C.Vientiane",
            "D.Phnom Penh"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 7: Lào có biển không",
        answers: [
            "A.Có",
            "B.Không",
            "C.Có và không",
            "D.Không và có"
        ],
        correctAnswer: 1
    },
    {
        content: "Câu hỏi 8: Lào có sân bay quốc tế không",
        answers: [
            "A.Có",
            "B.Không",
            "C.Có và không",
            "D.Không và có"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 9: Lào có biên giới với Việt Nam không",
        answers: [
            "A.Có",
            "B.Không",
            "C.Có và không",
            "D.Không và có"
        ],
        correctAnswer: 0
    },
    {
        content: "Câu hỏi 10: Thủ đô của Brueni là gì",
        answers: [
            "A.Bangkok",
            "B.Bandar Seri Begawan",
            "C.Vientiane",
            "D.Phnom Penh"
        ],
        correctAnswer: 1
    }
]

//câu thứ nhất
let totalScore = 0;
const scoreEchCorrectAnswer = 10;
let questionIndex = 0;

function loadQuestion() {
    const question = questions[questionIndex];
    const questionUI = document.querySelector('.wrapper .question');
    questionUI.innerHTML = question.content;
    const answersUI = document.querySelector('.wrapper .answers');
    answersUI.innerHTML = '';
    const answers = question.answers; //trả về một mảng đáp án
    const correctAnswer = question.correctAnswer;
    for (let i = 0; i < answers.length; i++) {
        let newElem = document.createElement(`div`);
        newElem.classList.add('answer');
        newElem.innerHTML = answers[i];
        newElem.addEventListener('click', function () {
            if (i === correctAnswer) {
                alert("Bạn đã trả lời đúng");
                totalScore += scoreEchCorrectAnswer;
                const scoreUI = document.querySelector('.score span');
                scoreUI.innerHTML = totalScore;
                if (questionIndex >= questions.length) {
                    alert("Bạn đã hoàn thành bài test");
                    return;
                }
                loadQuestion();
            } else {
                alert("Bạn đã trả lời sai");
                answersUI.innerHTML = '';
                loadQuestion();
            }
        })
        answersUI.append(newElem);
    }
    questionIndex++;
    console.log(questionIndex);
}


//tải question lần đầu tiên
loadQuestion();