

document.getElementById("btn").addEventListener("click",function(){
    document.querySelectorAll("input").forEach((ele,i)=>{
        if(ele.value=="")
            empty(ele,ele.previousElementSibling,ele.nextElementSibling,1);
        else{
            let time =new Date();
            if((i==0 && ele.value>31)||(i==0 && document.querySelectorAll("input")[1].value!="" &&document.querySelectorAll("input")[2].value!="" && !dayExist(ele.value,document.querySelectorAll("input")[1].value,document.querySelectorAll("input")[2].value) ))
                empty(ele,ele.previousElementSibling,ele.nextElementSibling.nextElementSibling,1);
            
            if(i==1 && ele.value>12)
                empty(ele,ele.previousElementSibling,ele.nextElementSibling.nextElementSibling,1);
            if(i==2 && ele.value>time.getFullYear())
                empty(ele,ele.previousElementSibling,ele.nextElementSibling.nextElementSibling,1);
        }
            
    })
})

document.querySelectorAll("input").forEach((ele,i)=>{
    ele.addEventListener("keyup",function(){
        if(ele.classList.contains("border-lightRed"))
            empty(ele,ele.previousElementSibling,ele.nextElementSibling,2);
        if(((i==0 || i==1) &&ele.value.length==2) ||(ele.value.length==4))
            if((((i+1)%3==0 || (i+1)%3==1) &&document.querySelectorAll("input")[(i+1)%3].value.length<2) ||((i+1)%3==2 && document.querySelectorAll("input")[(i+1)%3].value.length<4))
                document.querySelectorAll("input")[(i+1)%3].focus();
            else
            if((((i+2)%3==0 || (i+2)%3==1) &&document.querySelectorAll("input")[(i+2)%3].value.length<2) ||((i+2)%3==2 && document.querySelectorAll("input")[(i+2)%3].value.length<4))
                document.querySelectorAll("input")[(i+2)%3].focus();

    })
})





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
}




