/// <reference types="../@types/jquery/"/>


// ! =================  Global Variables ================

const barIcon =document.getElementById('barIcon');
const mealsRow =document.getElementById('mealsRow');
let data = [] ;
let mealsByName =[];
let mealsByFirstlettr =[];
let  catogeries=[];
let mealsOfCatogery=[];
let mealsArea =[];
let mealsOfthisArea=[];
let mealsIntegrites=[];
let mealsOfThisIntegrites=[];
let searchMeal  ;
let mealIndex ; 
let catogeryIndex ;
let searchMealFirstlettr;
const SearchByNameInput =document.getElementById('SearchByName');
const SearchByFirstletterInput =document.getElementById('SearchByFirstletter');
const mealDetailsAreaSection =document.getElementById('mealDetailsArea');
const catogeryRow =document.getElementById('catogeryRow');
const CategoriesLink= document.getElementById('CategoriesLink');
const mealsCatogeryRow = document.getElementById('mealsCatogeryRow');
const mealAreaContainer= document.getElementById('mealAreaContainer')

$(function(){

    $('.loader').fadeOut(2000, function(){
        $('.loading').fadeOut(2000, function(){
            $('body').css('overflow', 'auto')
        })
    });

    $('.navContainer').hide();
    $('#mainSidebar .barIcon').css({'left': '0'});
});

// ! >===================== Navbar Logic =======================>


$('#mainSidebar #barIcon').on('click', function(){
    setTimeout(() => {
    
      let barIconMargin =$('.barIcon').css('margin-left');

      if(barIconMargin == '0px'){

        $('#mainSidebar .barIcon').animate({'left': '300px'},1000)
        $('#mainSidebar .navContainer').animate({width: 'toggle'},1000);
        $('#mainSidebar #closeIcon').removeClass('d-none');
        $('#mainSidebar #barIcon').addClass('d-none');
        

      }
    
    }, 1000);
});

$('#mainSidebar #closeIcon').on('click' , function(){

 
  $('#mainSidebar .barIcon').animate({'left': '0'},1000)
  $('#mainSidebar .navContainer').animate({width: 'toggle'},1000);
   $('#mainSidebar li a').replaceAll('animate__backOutLeft')

  $('#mainSidebar #closeIcon').addClass('d-none');
  $('#mainSidebar #barIcon').removeClass('d-none');
 
})


$('#mainSidebar #closeIcon').on('click', function(){
    setTimeout(() => {
    
        let barIconleft =$('#mainSidebar .barIcon').css({'left':'200px'});
        console.log(barIconleft)
         if(barIconleft == '200px'){
     
         $('#mainSidebar .barIcon').animate({'left': '0'},1000)
         $('#mainSidebar .navContainer').animate({width: 'toggle'},1000);
         $('#mainSidebar #closeIcon').addClass('d-none');
         $('#mainSidebar #barIcon').removeClass('d-none');
         
         }
      
    }, 1000);
});


// ! >===================== get Rondom Meals by Search Api and set them when I open my webpage =======================>

async function getApi(){
    let https =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s `);
    let response = await https.json();
     data =await response.meals;
   

    displayData()
}

getApi()

function displayData(){

    let cartona = ``;

    for( let i=0 ; i< data.length ; i++){

         mealIndex = i ;
        cartona += ` 
        
        <div class="col-md-3">
        <div class="imageArea" onclick=getTargetMealDetails(${i}) >
          <img class="w-100 rounded-2" src=${data[i].strMealThumb } alt="meals image">
          <div class="layer d-flex align-items-center text-black rounded-2">
          <h3>${data[i].strMeal}</h3>
        </div>
        </div>

      </div>
        
        
        `
    };

    mealsRow.innerHTML = cartona;
    

}


 // ! ============================== Get Search By Meal Name Api =====================================

 $('#mainSidebar #SearchLink').on('click', function(){
    $('.searchArea').removeClass('d-none');

    $('#mainSidebar .barIcon').animate({'left': '0'},1000)
  $('#mainSidebar .navContainer').animate({width: 'toggle'},1000);

    $('#home').addClass('d-none');
    $('#mealDetailsArea').addClass('d-none');
    $('#mealCatogeries').addClass('d-none');
    $('#mealAreaContainer').addClass('d-none');
    $('#MealsOfEachAreaSection').addClass('d-none');
    $('#mealsOfTargetIntegrites').addClass('d-none');
    $('#ingredientsSection').addClass('d-none')
    $('#contact').addClass('d-none');
 });


 async function searchByName(mealName){

    let http = await fetch(` https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let res = await http.json();
     mealsByName =await res.meals
 
     $('#mealDetailsArea').removeClass('d-none');
    displayMealByName()

 }

function displayMealByName(){

  
    let cartona = ``;
   

    for( let i=0 ; i< mealsByName.length ; i++){
      
       
        if( mealsByName[i].strMeal.toLowerCase().includes( searchMeal.toLowerCase())){

            cartona += ` 
        
            <div class="col-md-3">
            <div class="imageArea" onclick=getTargetMealDetails(${i})>
              <img class="w-100 rounded-2" src=${mealsByName[i].strMealThumb } alt="meals image">
              <div class="layer d-flex align-items-center text-black rounded-2">
              <h3>${mealsByName[i].strMeal}</h3>
            </div>
            </div>
    
          </div>
            
            
            `
        }

    }

    mealsRow.innerHTML = cartona;
     $('#home').removeClass('d-none');
    
      

}

 SearchByNameInput.addEventListener('input',function () { 

    searchMeal = SearchByNameInput.value;
    searchByName(searchMeal)
  })


  
 // ! ============================== Get Search By First Letter Api =====================================



 async function searchByFirstletter(searchMealFirstlettr){

    let http = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchMealFirstlettr}`);
    let res = await http.json();
     mealsByFirstlettr =await res.meals
    
     $('#mealDetailsArea').removeClass('d-none');
    displayMealByFirstlettr()

 }

function displayMealByFirstlettr(){
    
    let cartona = ``;
 

    for( let i=0 ; i< mealsByFirstlettr.length ; i++){
       
        if( mealsByFirstlettr[i].strMeal.toLowerCase().includes( searchMealFirstlettr.toLowerCase())){

            cartona += ` 
        
            <div class="col-md-3">
            <div class="imageArea" onclick=getTargetMealDetails(${i})>
              <img class="w-100 rounded-2" src=${mealsByFirstlettr[i].strMealThumb } alt="meals image">
              <div class="layer d-flex align-items-center text-black rounded-2">
              <h3>${mealsByFirstlettr[i].strMeal}</h3>
            </div>
            </div>
    
          </div>
            
            
            `
        }

    }

    mealsRow.innerHTML = cartona;
     $('#home').removeClass('d-none')

}

SearchByFirstletterInput.addEventListener('input',function () { 
    searchMealFirstlettr = SearchByFirstletterInput.value;
    searchByFirstletter(searchMealFirstlettr)
  })


  // ! ============================== Get Meal datails ===============================


  function getTargetMealDetails (mealIndex){
  
    $('#home').addClass('d-none');
    $('#mealsOfCatogeryArea').addClass('d-none');
    $('#mealCatogeries').addClass('d-none');
    $('#mealAreaContainer').addClass('d-none');
    $('#mealDetailsArea').removeClass('d-none');
    $('#MealsOfEachAreaSection').addClass('d-none');
    $('#mealsOfTargetIntegrites').addClass('d-none');
    $('#ingredientsSection').addClass('d-none')
    $('#contact').addClass('d-none');

    mealDetailsAreaSection.innerHTML = `
    
    <div class="container">
    <div class="row text-white">
      <div class="col-md-4">
        <div class="mealImage">
          <img class="w-100 rounded-2" src="${data[mealIndex].strMealThumb}" alt="">
          <h3>${data[mealIndex].strMeal}</h3>
        </div>
      </div>

      <div class="col-md-7">
        <div class="mealdetails">
          <h2>Instructions</h2>
          <p class="py-3">${data[mealIndex].strInstructions}</p>

          <h3>Area : ${data[mealIndex].strArea}</h3>
          <h3>Category : ${data[mealIndex].strCategory}</h3>

          <h3>Recipes :</h3>
          <span class="btn btn-success text-white my-2 me-2">${data[mealIndex].strMeasure1}  ${data[mealIndex].strIngredient1}</span>
          <span class="btn btn-success text-white my-2  me-2">${data[mealIndex].strMeasure2}  ${data[mealIndex].strIngredient2}</span>
          <span class="btn btn-success text-white my-2  me-2">${data[mealIndex].strMeasure3}  ${data[mealIndex].strIngredient3}</span>
          <span class="btn btn-success text-white my-2  me-2">${data[mealIndex].strMeasure4}  ${data[mealIndex].strIngredient4}</span>
          <span class="btn btn-success text-white my-2  me-2">${data[mealIndex].strMeasure5}  ${data[mealIndex].strIngredient5}</span>
          <span class="btn btn-success text-white my-2">${data[mealIndex].strMeasure6}  ${data[mealIndex].strIngredient6}</span>

          <h3>Tags :</h3>
          <div class="tags">
            <span class="btn btn-info text-white my-2 me-2">${data[mealIndex].strTags}</span>
            <span class="btn btn-info text-white my-2 me-2">Streetfood</span>
          </div>

          <div>
            <a class="btn btn-success text-white my-2 me-2" href="${data[mealIndex].strSource}"> Source</a>
            <a class="btn btn-danger text-white my-2 me-2" href="${data[mealIndex].strYoutube}">Youtube</a>
          </div>


        </div>
      </div>
    </div>
  </div>
    
    
    
    
    `


  }


  //! ============================== Get Catogeries Details when click on catogeries link in navbarside ================
CategoriesLink.addEventListener('click', function () { 

  $('#mainSidebar .barIcon').animate({'left': '0'},1000)
  $('#mainSidebar .navContainer').animate({width: 'toggle'},1000);
 
  getCatogeries()
 

 })

  async function getCatogeries(){

    let http = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let res = await http.json();
     catogeries =await res.categories;

     
  $('#home').addClass('d-none');
  $('#mealCatogeries').removeClass('d-none');
  $('.searchArea').addClass('d-none');
  $('#mealsOfCatogeryArea').addClass('d-none');
  $('#mealDetailsArea').addClass('d-none');
  $('#mealAreaContainer').addClass('d-none');
  $('#MealsOfEachAreaSection').addClass('d-none');
  $('#mealsOfTargetIntegrites').addClass('d-none');
  $('#ingredientsSection').addClass('d-none');
  $('#contact').addClass('d-none');
   displayCatogries();
  

 }


 function displayCatogries(){

   let cartona= '';
  

   for(let i=0 ; i< catogeries.length ; i++){

    

      cartona += `
      
      
      <div class="col-md-3">
      <div class="imageArea" onclick=getCatogeryMeals(${i})>
        <img class="w-100 rounded-2" src=${catogeries[i].strCategoryThumb} alt="catogery image">
        <div class="layer rounded-2 text-center">
          <h3>${catogeries[i].strCategory}</h3>
          <p>${catogeries[i].strCategoryDescription}</p>
        </div>
      </div>
    </div>
      
      `
   }

   catogeryRow.innerHTML = cartona;
  
   
 }


async function getCatogeryMeals(catogeryIndex){
  let catogeryMeals = catogeries[catogeryIndex].strCategory;

  
  let http = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catogeryMeals}`);
  let res = await http.json();
   mealsOfCatogery =await res.meals;

 console.log(mealsOfCatogery)

 $('#home').addClass('d-none');

 $('#mealCatogeries').addClass('d-none');
 $('#mealDetailsArea').addClass('d-none');
 $('#mealAreaContainer').addClass('d-none');
 $('#MealsOfEachAreaSection').addClass('d-none');
 $('#mealsOfCatogeryArea').removeClass('d-none');
 $('#mealsOfTargetIntegrites').addClass('d-none');
 $('#ingredientsSection').addClass('d-none')
 $('#contact').addClass('d-none');
 displayMealsOfCatogery()

 }


 
function displayMealsOfCatogery(){

  let cartona = ``;

  for( let i=0 ; i< mealsOfCatogery.length ; i++){

    mealIndex = i ;
      cartona += ` 
      
      <div class="col-md-3">
      <div class="imageArea" onclick=getTargetMealDetails(${i}) >
        <img class="w-100 rounded-2" src=${mealsOfCatogery[i].strMealThumb } alt="meals image">
        <div class="layer d-flex align-items-center text-black rounded-2">
        <h3>${mealsOfCatogery[i].strMeal}</h3>
      </div>
      </div>

    </div>
      
      
      `
  };

  mealsCatogeryRow.innerHTML = cartona;
  

}

//! ========================== Get Meals Area =======================================

$('#AreaLink').on('click',function(){

  $('#mainSidebar .barIcon').animate({'left': '0'},1000)
  $('#mainSidebar .navContainer').animate({width: 'toggle'},1000);

 getMealArea()
})


async function getMealArea(){

  let http = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let res = await http.json();
   mealsArea =await res.meals;
   
 
   $('#home').addClass('d-none');
   $('.searchArea').addClass('d-none');
 $('#mealCatogeries').addClass('d-none');
 $('#mealDetailsArea').addClass('d-none');
 $('#mealsOfCatogeryArea').addClass('d-none');
 $('#mealAreaContainer').removeClass('d-none');
 $('#mealsOfTargetIntegrites').addClass('d-none');
 $('#ingredientsSection').addClass('d-none')
 $('#contact').addClass('d-none');
 $('#mealAreaSection').removeClass('d-none');

 displayMealArea()

}

function displayMealArea(){

  let cartona =``;

  for(let i=0 ; i< mealsArea.length ; i++){
    mealIndex = i

    cartona += `
    
    <div class="col-md-3">
    <div onclick= getMealsOfthisArea(${i})>
      <p><i class="fa-solid fa-house-laptop"></i></p>
      <p class="fs-2">${mealsArea[i].strArea}</p>
    </div>
  </div>
  
    
    `
  }
  mealAreaContainer.innerHTML =cartona

}

async function getMealsOfthisArea(mealIndex) {

  let mealAreaName = mealsArea[mealIndex].strArea;
  let http = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealAreaName}`);
  let res = await http.json();
   mealsOfthisArea =await res.meals;
   console.log(mealsOfthisArea)

   
   $('#home').addClass('d-none');
   $('.searchArea').addClass('d-none');
 $('#mealCatogeries').addClass('d-none');
 $('#mealDetailsArea').addClass('d-none');
 $('#mealsOfCatogeryArea').addClass('d-none');
 $('#mealAreaSection').addClass('d-none');
 $('#MealsOfEachAreaSection').removeClass('d-none');
 $('#mealsOfTargetIntegrites').addClass('d-none');
 $('#ingredientsSection').addClass('d-none')
 $('#contact').addClass('d-none');

   displayMealsOfthisArea()

  }
  
  function displayMealsOfthisArea() {  

    let cartona =`` ;

    for(let i=0 ; i<mealsOfthisArea.length ; i++){

      cartona += `
      
      <div class="col-md-3">
      <div class="imageArea" onclick=getTargetMealDetails(${i})>
        <img class="w-100 rounded-2" src=${mealsOfthisArea[i].strMealThumb } alt="meals image">
        <div class="layer d-flex align-items-center text-black rounded-2">
        <h3>${mealsOfthisArea[i].strMeal}</h3>
      </div>
      </div>

    </div>
      
      
      `

    }
   
   document.getElementById('MealsOfEachArea').innerHTML =cartona;
  }


  //! ========================  Get Integrites of Meals ==================================


  $('#ingredientsLink').on('click', function(){

    $('#mainSidebar .barIcon').animate({'left': '0'},1000)
    $('#mainSidebar .navContainer').animate({width: 'toggle'},1000);
    getMealsIntegrites()
  })

 async function getMealsIntegrites(){

  
  let http = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let res = await http.json();
   mealsIntegrites=await res.meals;



$('#home').addClass('d-none');
$('.searchArea').addClass('d-none');
$('#mealCatogeries').addClass('d-none');
$('#mealDetailsArea').addClass('d-none');
$('#mealsOfCatogeryArea').addClass('d-none');
$('#mealAreaSection').addClass('d-none');
$('#MealsOfEachAreaSection').addClass('d-none');
$('#mealsOfTargetIntegrites').addClass('d-none');
$('#contact').addClass('d-none');
$('#ingredientsSection').removeClass('d-none')
displayMealsIntegrites()

 }


 function displayMealsIntegrites (){

let cartona =``;

for(let i=0 ; i< 21 ; i++){
  mealIndex = i

   cartona += `
   
   <div class="col-md-3 ">
   <div class="integritesDesc" onclick= getMealsOfIntergrites(${i})>
     <p><i class="fa-solid fa-drumstick-bite"></i></p>
     <p class="fs-3 ">${mealsIntegrites[i].strIngredient}</p>
     <p>${mealsIntegrites[i].strDescription}</p>
   </div>
 </div> 
   
   
   
   
   `
}
document.getElementById('ingredientsContainer').innerHTML =cartona

 }

async function getMealsOfIntergrites(mealIndex){
  
 
  let integritesIndex =mealsIntegrites[mealIndex].strIngredient;

  let http = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${integritesIndex}`);
  let res = await http.json();
   mealsOfThisIntegrites=await res.meals;

   $('#home').addClass('d-none');
$('.searchArea').addClass('d-none');
$('#mealCatogeries').addClass('d-none');
$('#mealDetailsArea').addClass('d-none');
$('#mealsOfCatogeryArea').addClass('d-none');
$('#mealAreaSection').addClass('d-none');
$('#MealsOfEachAreaSection').addClass('d-none');
$('#ingredientsSection').addClass('d-none')
$('#contact').addClass('d-none');
$('#mealsOfTargetIntegrites').removeClass('d-none')
   displaymealsOfTargetIntegrites()

 }

 
 function displaymealsOfTargetIntegrites(){

  let cartona =`` ;

  for(let i=0 ; i<mealsOfThisIntegrites.length ; i++){


    cartona += `
    
    <div class="col-md-3">
    <div class="imageArea" onclick=getTargetMealDetails(${i})>
      <img class="w-100 rounded-2" src=${mealsOfThisIntegrites[i].strMealThumb } alt="meals image">
      <div class="layer d-flex align-items-center text-black rounded-2">
      <h3>${mealsOfThisIntegrites[i].strMeal}</h3>
    </div>
    </div>

  </div>
    
    
    `

  }
 
 document.getElementById('mealsOfTargetIntegritesContainer').innerHTML =cartona;


 }
 
 //! ==================== ======== contact =================

 $('#contactLink').on('click' , function(){

  $('#mainSidebar .barIcon').animate({'left': '0'},1000)
  $('#mainSidebar .navContainer').animate({width: 'toggle'},1000);
   
  
  $('#home').addClass('d-none');
  $('.searchArea').addClass('d-none');
  $('#mealCatogeries').addClass('d-none');
  $('#mealDetailsArea').addClass('d-none');
  $('#mealsOfCatogeryArea').addClass('d-none');
  $('#mealAreaSection').addClass('d-none');
  $('#MealsOfEachAreaSection').addClass('d-none');
  $('#ingredientsSection').addClass('d-none')
  $('#mealsOfTargetIntegrites').addClass('d-none');
  $('#contact').removeClass('d-none')

 })
 
















