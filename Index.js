const BtnMenuPrincipal = document.querySelector("#BtnMenuPrincipal");
const MenuPrincipal = document.querySelector("#MenuPrincipal");
const TodosMenusPrincipais = [...document.querySelectorAll(".BtnMenuItem")];

BtnMenuPrincipal.addEventListener("click",(evt)=> {
    MenuPrincipal.classList.toggle("ocultar");
});

TodosMenusPrincipais.forEach(e=> {
    e.addEventListener("click", (evt) => {
        MenuPrincipal.classList.add("ocultar");
    });
});



    
