acount=document.querySelector('.acount')
icon = document.querySelector('.fa')
box1=document.querySelector('.box1')

burger=document.querySelector('.burger')
navbar=document.querySelector('.navbar')
rightNav=document.querySelector('.rightnav')
navList=document.querySelector('.nav-list')

acount.addEventListener('click',()=>{
    box1.classList.toggle('res');
})


burger.addEventListener('click',()=>{
    navList.classList.toggle('v-class');
    navbar.classList.toggle('h-nav');
    rightNav.classList.toggle('v-class');
})