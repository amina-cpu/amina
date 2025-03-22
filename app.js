const app = Vue.createApp({});

app.component('header-component', {
    template: `
        <header class="header">
        <ul>
        <li> <a href="#i">   Aboutme</a></li> 
             <li>  <a href="#skills">   Skills</a></li>  
             <li>  <a href="#cont">   Mywork </a></li>  <li> <a href="#experience"> Experience</a></li> <li>  <a href="#tact">  Contacts </a></li> <li><a href="http://localhost:5000/cveng.pdf" target="_blank">
  <button class="resume">Resumé</button>
</a>


</li></ul>
        </header>
    `,
});

app.mount("#app");
