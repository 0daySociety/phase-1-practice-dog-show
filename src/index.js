document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    submitAnimals();
  fetchAnimals();
}

function submitAnimals(){

let form =document.querySelector("form")
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let dogname=document.querySelector("#dogName");
    let dogBreed=document.querySelector("#dogBreed");
    let dogSex=document.querySelector("#dogSex");
   
    let formData={
       name:dogname.value,
       breed:dogBreed.value,
       sex:dogSex.value,
    }

  if(dogname.value!==''&&dogBreed!==''&&dogSex.value!==''){

    fetch("http://localhost:3000/dogs",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(formData)
    })
    .then(response=>response.json())
    .then(data=>loadAnimals(data))

  }
  else{
     console.log("empty")
  }  





    
});
    
}


function fetchAnimals() {
  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((element) => {
        loadAnimals(element);
      })
    );
}

function loadAnimals(animalInfo) {
  let tableBody = document.getElementById("table-body");

  let data = document.createElement("tr");

  let name = document.createElement("td");
  let breed = document.createElement("td");
  let sex = document.createElement("td");
  let edit = document.createElement("button");
  edit.innerText = "Edit";
  edit.style.margin = "5px";

  name.innerText = animalInfo.name;
  breed.innerText = animalInfo.breed;
  sex.innerText = animalInfo.sex;

  data.appendChild(name);
  data.appendChild(breed);
  data.appendChild(sex);
  data.appendChild(edit);
  tableBody.appendChild(data);

  edit.addEventListener("click", (e) => {
    e.preventDefault();
    editPage(animalInfo);
  });
}

function editPage(myEditData){
    let inputField=document.querySelector("#dogName")
    inputField.scrollIntoView({behavior:"smooth",block:"start"})
   
    let dogname=document.querySelector("#dogName");
    let dogBreed=document.querySelector("#dogBreed");
    let dogSex=document.querySelector("#dogSex");
   
    let formData={
       name:dogname.value,
       breed:dogBreed.value,
       sex:dogSex.value,
    }
//    console.log(`http://localhost:3000/dogs/${myEditData.id}`)
if(dogname.value!==''&&dogBreed!==''&&dogSex.value!==''){


    fetch(`http://localhost:3000/dogs/${myEditData.id}`,{
       method:"PATCH",
       headers:{"Content-type":"application/json"},
       body:JSON.stringify(formData)
    })
    .then(response=>response.json())
    .then(data=>loadAnimals(data));
}
else{
    console.log("empty data")
}

}