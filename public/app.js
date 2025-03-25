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
    <header class="header">
  <div class="menu-icon" id="menu-icon">&#9776;</div>

  <nav class="nav" id="nav">
    <ul>
      <li><a href="#i">About Me</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#cont">My Work</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#tact">Contacts</a></li>
      <li>
        <a href="http://localhost:5000/cveng.pdf" target="_blank">
          <button class="resume">Resumé</button>
        </a>
      </li>
    </ul>
  </nav>
</header>

    `,
});

app.mount("#app");
