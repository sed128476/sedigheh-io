
const today  = new Date();
const date1 = today.getFullYear();
const copyright = document.createElement('footer');
copyright.innerHTML = `<strong>Sedigheh  &#169 ${date1} </strong>` 
document.body.append(copyright);
const li_skill = [ 'Linux', 'Foxpro','JavaScript','Html','Css'];
const post = document.querySelector('.skillul');
let  li_element = ' ';

 for ( let item of li_skill) {
           li_element = document.createElement('li');
          (li_element.innerHTML = `<strong>  ${item} </strong>`);
           (post.appendChild(li_element))  ;
};