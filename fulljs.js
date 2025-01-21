
// Public variables
let intervells=[]; //all current active intervells to block them if needed



// Events
document.getElementById("btn").addEventListener("click",submiting); //submit form when clicked

document.addEventListener("keypress",function(pressed){
if(pressed.key=="Enter")
    submiting();
})  //submit form when enter btn is clicked




document.querySelectorAll("input").forEach((ele,i)=>{

    ele.addEventListener("input",function(x){
        x.target.value=x.target.value.replace(/[^0-9]/g,"");
    })


    ele.addEventListener("keydown",function(){
        if(ele.classList.contains("border-lightRed"))
            empty(ele,ele.previousElementSibling,ele.nextElementSibling,2);
        if(((i==0 || i==1) &&ele.value.length==2) ||(ele.value.length==4))
            if((((i+1)%3==0 || (i+1)%3==1) &&document.querySelectorAll("input")[(i+1)%3].value.length<2) ||((i+1)%3==2 && document.querySelectorAll("input")[(i+1)%3].value.length<4))
                document.querySelectorAll("input")[(i+1)%3].focus();
            else
            if((((i+2)%3==0 || (i+2)%3==1) &&document.querySelectorAll("input")[(i+2)%3].value.length<2) ||((i+2)%3==2 && document.querySelectorAll("input")[(i+2)%3].value.length<4))
                document.querySelectorAll("input")[(i+2)%3].focus();

    })
}) //remove error when inputing in a input




//Event Functions
function submiting()
{
        let breaking=false; //Valid state
        let info=[];  //Inputs info
        
        document.querySelectorAll("input").forEach((ele,i)=>{
            ele.value=ele.value.replace(/[^0-9]/g,"");
            if(ele.value=="") //make error if empty
            {
                empty(ele,ele.previousElementSibling,ele.nextElementSibling,1);
                breaking=true;
            }
            else{
                //make error if not valid
                let time =new Date();
                if(i==0 && (ele.value==0 ||ele.value>31))
                {
                    empty(ele,ele.previousElementSibling,ele.nextElementSibling.nextElementSibling,1);
                    breaking=true;
                }
             
                
                if(i==1 && (ele.value==0 ||ele.value>12)){
                    empty(ele,ele.previousElementSibling,ele.nextElementSibling.nextElementSibling,1);
                    breaking=true;
                }
               
                if(i==2 && (ele.value==0 ||ele.value>time.getFullYear()))
                {
                    empty(ele,ele.previousElementSibling,ele.nextElementSibling.nextElementSibling,1);
                    breaking=true;
                }
                
                info[i]=ele.value; //add current info
    
    
            }
                
        })
    
    
        if(!breaking)
        {
            const currentTime = new Date();
            let givenTime=new Date(info[2],info[1]-1,info[0]);
            if(givenTime>currentTime ||givenTime.getDate()!=info[0]) //if date is invalid
            {
                const ele=document.querySelectorAll("input");
                empty(ele[0],ele[0].previousElementSibling,ele[0].nextElementSibling.nextElementSibling,1);
                notvalid(ele[1],ele[1].previousElementSibling);
                notvalid(ele[2],ele[2].previousElementSibling);
    
    
    
    
            }
            else{
                calculateAge(givenTime);
            }
            
    
    
        }
    
}








//Key press events
document.addEventListener("keydown",function(key){
    if(key.key=="Escape")
    {
        while(intervells.length>0)
        {
            clearInterval(intervells.pop());
        }
        let title=document.querySelectorAll("h2 span");
        title[0].innerHTML="--";
        title[1].innerHTML="--";
        title[2].innerHTML="--";
        let input=document.querySelectorAll("input");
        input[0].value="";
        input[1].value="";
        input[2].value="";
    }

}) //reset everything if Esc is pressed














//Functions

function empty(ele,txt_bfr,txt_afr,type){
    if(type==1)
    {
    ele.classList.replace("border-lightGrey","border-lightRed");
    txt_bfr.classList.replace("text-smokeyGrey","text-lightRed");
    txt_afr.classList.replace("hidden","visible");

    }
    else
    if(type==2)
    {
    ele.classList.replace("border-lightRed","border-lightGrey");
    txt_bfr.classList.replace("text-lightRed","text-smokeyGrey");
    txt_afr.classList.replace("visible","hidden");
    if(txt_afr.classList.contains("visible"))
        txt_afr.classList.replace("visible","hidden");
    else
    txt_afr.nextElementSibling.classList.replace("visible","hidden");
    }
}//turn valid into invalid and viceversa with type of problem

function notvalid(ele,txt_bfr)
{
    ele.classList.replace("border-lightGrey","border-lightRed");
    txt_bfr.classList.replace("text-smokeyGrey","text-lightRed");
}//if whole date doesn't make sense


async function calculateAge(time)
{
    const currentTime = new Date();
    const fullTime=currentTime-time;


    const fullYear=fullTime/60/1000/60/24/365.2422;
    const Years=Math.floor(fullYear);

    const remainingDaysAfterYears = (fullYear - Years) * 365.2422;
    const Months = Math.floor(remainingDaysAfterYears / 30.44);
    const Days = Math.floor(remainingDaysAfterYears % 30.44);

    let title=document.querySelectorAll("h2 span");

    let timeout=Math.max(1000 / Years, 5);
    await updateTime(title[0],Years,timeout);
    await updateTime(title[1],Months,timeout);
    await updateTime(title[2],Days,timeout);
  


} //async to make it wait

async function updateTime(title,timer,timeout)
{
    return new Promise((val)=>{
        title.innerHTML=0;
        
   const inter= setInterval(()=>{
        if(parseInt(title.innerHTML)<timer)
            title.innerHTML++;
       
    
        else
        {
        clearInterval(inter);
        intervells.pop();
        val();
        }
    },timeout)
    intervells.push(inter);
    
}
)
} //simple animation


