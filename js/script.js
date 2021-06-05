/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/




const itemsPerPage=9;
const header=document.querySelector("header");
const searchbar=`<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
header.insertAdjacentHTML("beforeend",searchbar);
const studentList=document.querySelector("ul.student-list");
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list,page){
   //variables to select wich students will appear on each page
   const startIndex=(page*itemsPerPage)-itemsPerPage;
   const endIndex=page*itemsPerPage;
   
   studentList.innerHTML="";
   //loop trought the student's data to select the information from each student
   for(let i=0;i<list.length;i++){
      if(i>=startIndex && i<endIndex){
         const studentItem=list[i];
         const text=`<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${studentItem.picture.medium}" alt="Profile Picture">
           <h3>${studentItem.name.first}</h3>
           <span class="email">${studentItem.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${studentItem.registered.date}</span>
         </div>
       </li>`;
       //student's information is added to the ul list
       studentList.insertAdjacentHTML("beforeend",text);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   //calculate how many pages will be necessay to display all students
   const numOfPages=Math.ceil(list.length/itemsPerPage);
   const linkList=document.querySelector("ul.link-list");
   linkList.innerHTML="";
   //loop to create the necessary amount of buttons
   for(let i=1;i<=numOfPages;i++){
      const button =`<li>
      <button type="button">${i}</button>
      </li>`;
      linkList.insertAdjacentHTML("beforeend",button);
   }
   //when page loads the first button will be active because we want to show the first 9 students
   const firstButton=document.querySelector("button");
   firstButton.className="active";
   //when a button is clicked it will be the "active" button
   linkList.addEventListener("click",(e)=>{
      if(e.target.tagName==="BUTTON"){
         const firstActive=document.querySelector(".active");
         firstActive.className="";
         e.target.className="active";
         //a new page will be loaded acording to the number of the button clicked
         showPage(list,e.target.textContent);
      }
   })
}
//create new list to be used on searchbar
let searchList; 
function createSearchList(){
   searchList=[];
   for(let i=0;i<data.length;i++){;
   searchList.push(data[i])}
}

//checking input
const input=document.querySelector("input");
input.addEventListener("input",(e)=>{
   createSearchList();
   let inputLength=input.value.length;
   //if input has a value the program will loop trough all the names from the list
       if(inputLength>0){
         //loop trough the number of letters on the input searchbar
         for(let j=0;j<inputLength;j++){
            //loop trough the names on the list
            for(let i=0;i<searchList.length;i++){
               let names=searchList[i].name.first;
               //if the letters from the input don't match the letters on the names , those names will be removed from the list 
               if(input.value[j].toLowerCase()!==names[j].toLowerCase()){
                  searchList.splice(i,1);
                  i--;
                  showPage(searchList,Math.ceil(searchList.length/itemsPerPage));
                  addPagination(searchList);
               }
               if(searchList.length==0){
                  const text=`<li ">
                  <div>   
                  <h3>No Results found</h3>
                  </div>
                   </li>`;
                  studentList.insertAdjacentHTML("beforeend",text);
               }
            }
         }    
       }
       //if input is empty the normal list will be shown
       else{
          showPage(data,1);
          addPagination(data);

       } 
   }
)

// Call functions
//showing the page with the first 9 students
 showPage(data,1);
 addPagination(data);