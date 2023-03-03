let timer=setInterval(timerFuntion,1000);
let deadline=60*5;
let result=0;
let question = new Array();
let checkedButton=0;
let timeOut=0;

function timerFuntion()
{
    let timerB=document.getElementById("timerBox");
    let progressB=document.getElementsByTagName("progress");
    let minute, second;
    deadline-=1;
    minute=parseInt(deadline/60);
    second=deadline%60;
    timerB.innerHTML="남은시간 "+minute+"분 "+second+"초";
    progressB[0].value=deadline;
    if(deadline<=0)
    {
        alert("시간이 다 되어 제출됩니다.");
        timeOut=1;
        CalculateScore();
        buttonDisabled();
    }
}
function Submit()
{
    let con=confirm("제출하시겠습니까?");
    if(con==1)
    {
        CalculateScore();
        buttonDisabled();
    }
    
}
function CalculateScore()
{
    question[0]= getRadio("question1");
    question[1]= getRadio("question2");
    question[2]= getRadio("question3");
    if((question[0]==-1||question[1]==-1||question[2]==-1)&&(timeOut==0))
    {
        alert("답안을 모두 입력하시오.");
        return;
    }
    clearInterval(timer);
    if(question[0]==4) result+=20;
    if(question[1]==4) result+=30;
    if(question[2]==1) result+=50;
    alert("시험이 종료되었습니다. 점수는 "+result+" 점 입니다.");
    checkedButton=1;
    return;
}
function getRadio(name)
{
    let input=document.getElementsByName(name);
    for(let i=0; i<input.length; i++)
    {
        if(input[i].checked) return input[i].value;
    }
    return -1;
}
function buttonDisabled()
{
    let button=document.getElementById("submitButton");
    if(checkedButton==1)
    {
        button.disabled='disabled';
    }
}