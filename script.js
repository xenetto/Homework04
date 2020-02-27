var correct_answers = 0;
var wrong_answers = 0;
var quiz_time = 60;
var q =0;
var questionEl = document.getElementById("questions");
var answersEl = document.getElementById("answers");

const myQuestions= [
    {
        question: "Which of the following is correct about features of JavaScript?",
        answers: ['JavaScript is a lightweight, interpreted programming language.','JavaScript is designed for creating network-centric applications.','JavaScript is complementary to and integrated with Java','All of the above.'], 
        correctAnswer: '4'
    },
    {
        question: "Which of the following is a valid type of function javascript supports?",
        answers: ['named function','anonymous functionee','Both of the above.',' None of the above.'], 
        correctAnswer: '3'
    },
    {
        question: " Which built-in method returns the length of the string?",
        answers: ['length()','size()','index()','None of the above.'], 
        correctAnswer: '1'
    },
    {
        question: "Which built-in method returns the calling string value converted to lower case?",
        answers: ['toLowerCase()','toLower()','changeCase(case)','None of the above.'], 
        correctAnswer: '1'
    },
    {
        question: "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
        answers: ['testoSource()','valueOf()',' toString()','None of the above.'], 
        correctAnswer: '1'
    },
    {
        question: "Which of the following function of String object is used to find a match between a regular expression and a string, and to replace the matched substring with a new substring?",
        answers: ['concat()','match()','eplace()','search()'], 
        correctAnswer: '3'
    },            
    {
        question: "Which of the following function of String object returns the primitive value of the specified object.?",
        answers: ['toLocaleUpperCase()','toUpperCase()','toString()','valueOf()'], 
        correctAnswer: '4'
    },
    {
        question: "Which of the following function of String object causes a string to be displayed in a small font, as if it were in a <small> tag?",
        answers: ['link()','small()','sup()','sub()'], 
        correctAnswer: '2'
    },
    {
        question: "Which of the following function of Array object creates a new array with all of the elements of this array for which the provided filtering function returns true?",
        answers: ['concat()','every()','filter()','some()'], 
        correctAnswer: '3'
    },
    {
        question: "Which of the following function of Array object sorts the elements of an array?",
        answers: ['toSource()','sort()','oString()','unshift()'], 
        correctAnswer: '2'
    }
]

function start() {
        document.getElementById("disappear").setAttribute("style" , "display:none;");
        timer();
        renderQuestion();
}

function timer(){
var timerInterval = setInterval(function(){ 
    quiz_time--; 
    document.getElementById("time").innerText = quiz_time;
if(q >= myQuestions.length-1 || quiz_time<=0){
    clearInterval(timerInterval);
}
}, 1000);
}

function renderQuestion(){
document.getElementById("questions").innerHTML="";
document.getElementById("answers").innerHTML="";
document.getElementById("questionNumber").innerText = q+1;
var runningQuestion = myQuestions[q];
var questionLabel;
questionLabel= document.createElement("LABEL");
questionLabel.innerText = `${q+1} - ${runningQuestion.question}`;
console.log(questionLabel.innerText );
questionEl.appendChild(questionLabel);
for(var i=0 ; i<4 ;i++){
    var answerRadio = document.createElement("INPUT");
    answerRadio.setAttribute("type","radio");
    answerRadio.setAttribute("id", `id${i+1}`);
    answerRadio.setAttribute("name",`question${q+1}`);
    answerRadio.setAttribute("value", i+1);
    answerRadio.setAttribute("onClick" , "calculation(this)");
    answersEl.appendChild(answerRadio);
    
    var answersLabel;
    answersLabel = document.createElement("LABEL");
    answersLabel.id=`id${i+1}`;

    answersEl.appendChild(answersLabel);
    answersLabel.innerHTML=`&nbsp;&nbsp;${i+1}&nbsp;)&nbsp;`+ runningQuestion.answers[i];
    answersEl.appendChild(document.createElement("br"));
}
}


function calculation(userAnswer){
if(userAnswer.value == myQuestions[q].correctAnswer){
    console.log("correct");
    correct_answers++;
    document.getElementById("correctAnswer").innerText = correct_answers;
}else{
    console.log("incorrect");
    wrong_answers++;
    document.getElementById("wrongAnswer").innerText = wrong_answers;
    quiz_time -= 5;
}
if(q < myQuestions.length-1 && quiz_time > 0){
    q++;
    renderQuestion();
}else {
    if(quiz_time<0){
        quiz_time = 0;
    }
    document.getElementById("time").innerText = quiz_time;
    document.getElementById("questions").innerHTML="";
    document.getElementById("answers").innerHTML="";
    document.getElementById("userInfo").setAttribute("style", "display: block;")
    document.getElementById("results").innerHTML=`<h2 style='text-decoration-line: underline; text-align: center;'>Game is Over!</h2><h3>Time Left : ${quiz_time} out of 60 Seconds</h3><h3>Correct Answer : ${correct_answers} out of 10 Questions</h3>`;
    console.log("finished");
}
}

function saveRecord(){
var d = new Date();
var currentDate = d.toLocaleDateString();
let userObj = {
    Name: document.getElementById("name").value,
    CorrectAnswers: correct_answers*10+"%",
    TimeLeft: quiz_time,
    Date: currentDate
}
addToLocalStorageObject("MultipleChoice_Quiz", d, userObj);
document.getElementById("userInfo").innerHTML += `<br><h3 >Your record is saved!</h3>
<h3><a href='${window.location.href}'>Repeat</a></h3>`;
}

function addToLocalStorageObject (name, key, value) {
// Get the existing data
var existing = localStorage.getItem(name);
// If no existing data, create an array
// Otherwise, convert the localStorage string to an array
existing = existing ? JSON.parse(existing) : {};
// Add new data to localStorage Array
existing[key] = value;
// Save back to localStorage
localStorage.setItem(name, JSON.stringify(existing));
}