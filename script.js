const quizData={

web:[
{question:"What does HTML stand for?",
answers:[
{text:"Hyper Text Markup Language",correct:true},
{text:"Home Tool Markup Language",correct:false},
{text:"Hyperlinks Text Language",correct:false},
{text:"High Tool Machine Language",correct:false}]}
],

programming:[
{question:"Which language runs in the browser?",
answers:[
{text:"Java",correct:false},
{text:"C++",correct:false},
{text:"JavaScript",correct:true},
{text:"Python",correct:false}]}
],

gk:[
{question:"Capital of India?",
answers:[
{text:"Mumbai",correct:false},
{text:"Delhi",correct:true},
{text:"Pune",correct:false},
{text:"Chennai",correct:false}]}
]

}

let currentCategory=[]
let currentIndex=0
let score=0
let difficulty="easy"

const question=document.getElementById("question")
const answers=document.getElementById("answer-buttons")
const nextBtn=document.getElementById("next-btn")
const quizScreen=document.getElementById("quiz-screen")
const menuScreen=document.getElementById("menu-screen")
const resultScreen=document.getElementById("result-screen")
const scoreText=document.getElementById("score")
const leaderboard=document.getElementById("leaderboard")

function setDifficulty(level){
difficulty=level
}

function startCategory(cat){

currentCategory=quizData[cat]

menuScreen.classList.add("hide")
quizScreen.classList.remove("hide")

currentIndex=0
score=0

showQuestion()

}

function showQuestion(){

answers.innerHTML=""

let q=currentCategory[currentIndex]

question.innerText=q.question

q.answers.forEach(ans=>{

let btn=document.createElement("button")
btn.innerText=ans.text
btn.classList.add("answer-btn")

btn.onclick=()=>selectAnswer(ans.correct,btn)

answers.appendChild(btn)

})

}

function selectAnswer(correct,btn){

if(correct){
score++
btn.classList.add("correct")
}else{
btn.classList.add("wrong")
}

Array.from(answers.children).forEach(b=>b.disabled=true)

nextBtn.style.display="block"

}

nextBtn.onclick=()=>{

currentIndex++

if(currentIndex<currentCategory.length){

showQuestion()
nextBtn.style.display="none"

}else{

finishQuiz()

}

}

function finishQuiz(){

quizScreen.classList.add("hide")
resultScreen.classList.remove("hide")

scoreText.innerText="Your Score: ${score}"

saveScore(score)

showLeaderboard()

}

function saveScore(score){

let scores=JSON.parse(localStorage.getItem("thinkfastScores"))||[]

scores.push(score)

scores.sort((a,b)=>b-a)

scores=scores.slice(0,5)

localStorage.setItem("thinkfastScores",JSON.stringify(scores))

}

function showLeaderboard(){

leaderboard.innerHTML=""

let scores=JSON.parse(localStorage.getItem("thinkfastScores"))||[]

scores.forEach(s=>{
let li=document.createElement("li")
li.innerText=s
leaderboard.appendChild(li)
})

}

function restartQuiz(){

resultScreen.classList.add("hide")
menuScreen.classList.remove("hide")

}