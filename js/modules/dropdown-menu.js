import outsideClick from './outside-click.js'

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
        
    //define touchstart e click como argumento padrão de events
    if (events === undefined) {
      this.events = ['touchstart', 'click'];
    } else {
      this.events = events;
    }

    this.activeClass = 'active';
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  } 
  
  //Ativa o dropdownmenu e add a função que observa o click fora dele
  activeDropdownMenu(event){
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  //Add os eventos ao dropdownmenu
  addDropdownMenusEvent(){
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach(userEvent => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init(){
    if(this.dropdownMenus.length){
      this.addDropdownMenusEvent();
    }    
    return this
  }  

  
}

