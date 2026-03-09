
let alldata = [];

const createElements =  (arr) => {
  const elements = arr.map((el) => `<span class="badge badge-soft p-3 ${badgecolors(el)} uppercase">${el}</span>`);

  return elements.join(" ");
};


function badgecolors(prio) {
    
    if(prio==="high" || prio==="bug")
    {
        return "bg-red-100 text-red-700";
    }
    else if(prio==="medium" || prio==="help wanted")
    {
        return "bg-yellow-100 text-yellow-700";
    }
    else if(prio==="enhancement" || prio==="good first issue")
    {
        return "bg-green-100 text-green-700";
    }
    else if(prio==="documentation")
    {
        return "bg-blue-100 text-blue-700";
    }
    else if(prio==="open")
    {
        return "bg-green-700 text-white";
    }
    else if(prio==="closed")
    {
        return "bg-red-700 text-white";
    }

}


 const allbtn = document.getElementById("allbtn");
 const openbtn = document.getElementById("openbtn");
 const closebtn = document.getElementById("closebtn");

 const cardcontainer = document.getElementById("cardcontainer");

 const loadspinner = document.getElementById("loadspinner");


 function togglekorbe(id) {

  allbtn.classList.add("bg-gray-100", "text-black");
  openbtn.classList.add("bg-gray-100", "text-black");
  closebtn.classList.add("bg-gray-100", "text-black");

  allbtn.classList.remove("bg-indigo-700", "text-white");
  openbtn.classList.remove("bg-indigo-700", "text-white");
  closebtn.classList.remove("bg-indigo-700", "text-white");

  const MainId = document.getElementById(id);

  CurrentStatus = id;

  MainId.classList.remove("bg-gray-100", "text-black");
  MainId.classList.add("bg-indigo-700", "text-white");
 }


 function showloading() {
    loadspinner.classList.remove("hidden");
 }

 function hideloading() {
    loadspinner.classList.add("hidden");
 }

 async function loaddatas(){
//     fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
//     .then((res) => res.json())
//     .then((data) => { console.log(data);
//     })

showloading();

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

const data = await res.json();

hideloading();

alldata =  data.data;

displaydatas(alldata);


 }

  loaddatas();


function statuscheck(status){

    if(status==="all")
    {
        displaydatas(alldata);
        return;
    }

    const filterdata = alldata.filter(issue => issue.status===status);

    displaydatas(filterdata);
}


const LoadWordDetail = async (id) => {

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    const abc = await fetch(url);

    const detail = await abc.json();

    DisplayWordDetail(detail.data);

    my_modal_5.showModal();

}

const DisplayWordDetail = (detail) => {

    const detailContainer = document.getElementById("detailContainer");

    detailContainer.innerHTML = `
    <h1 class="font-bold text-2xl">${detail.title}</h1>

    <div class="flex items-center space-x-3">
      <div class="badge badge-soft ${badgecolors(detail.status)} p-3 uppercase ">${detail.status}</div>
      <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
      <p class="text-gray-400">Opened by ${detail.author}</p>
      <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
      <p class="text-gray-400">${new Date(detail.createdAt).toLocaleDateString()}</p>
    </div>

    <div class="pt-2 pb-2">
      <div class="">${createElements(detail.labels)}</div>
    </div>

    <p class="font-semibold text-gray-400 pb-2">${detail.description}</p>

    <div class="bg-gray-200 flex items-center p-4 rounded-md">
      
      <div>
        <p class="text-gray-400">assignee:</p>
        <p class="font-bold">${detail.assignee}</p>
      </div>

      <div class="mx-auto">
        <p class="text-gray-400">priority:</p>
        <div class="badge badge-soft p-3 ${badgecolors(detail.priority)} uppercase ">${detail.priority}</div>
      </div>
    </div>
    `

}


function displaydatas(data){


    cardcontainer.innerHTML ="";

    data.forEach(info => {
        
        const card = document.createElement("div");

        card.onclick = function(){

            LoadWordDetail(info.id);
        }

        card.className = "card rounded-xl bg-white shadow-lg m-2 p-4 space-y-3";

       if(info.status=="open")
       {
        card.classList.add("border-t-6", "border-green-500");
       }
       else if(info.status=="closed")
       {
         card.classList.add("border-t-6", "border-violet-500");

       }

        card.innerHTML = `
          
          <!-- div 1 -->
           <div class="flex justify-between">
             <img src="./assets/${info.status}-Status.png" alt="">
             <div class="badge badge-soft p-3 ${badgecolors(info.priority)} uppercase">${info.priority}</div>
           </div>

           <!-- div 2 -->
            <div class="space-y-1">
              <p class="font-bold text-lg line-clamp-1">${info.title}</p>
              <p class="text-gray-500">${info.description}</p>
            </div>

            <!-- div 3 -->
             <div class="">${createElements(info.labels)}</div>

             <hr class=" border-gray-300 w-full pb-1" />

             <!-- div 4 -->

            <div class="flex justify-between">

             <div>
              <p class="text-gray-500">#${info.id} ${info.author}</p>
              <p class="text-gray-500">Assignee: ${info.assignee}</p>


             </div>

             <div class="items-end">
              
             <p class="text-gray-500 text-right">${new Date(info.createdAt).toLocaleDateString()}</p>
             <p class="text-gray-500">Updated: ${new Date(info.updatedAt).toLocaleDateString()}</p>
             </div>

            </div>


             
        `;

        cardcontainer.appendChild(card);



    });

    alltotal.innerText = cardcontainer.children.length;

}

const as = cardcontainer.children.length;

    console.log(as);

document.getElementById("btnSearch").addEventListener("click", async () => {

    //alltotal.innerText = cardcontainer.children.length;

    const input = document.getElementById("inputSearch");
    const searchvalue = input.value.trim().toLowerCase();

    const search = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchvalue}`;

    const searched = await fetch(search);

    const searchdetail = await searched.json();

    const finalsearch = searchdetail.data;



    displaydatas(finalsearch);



    //clg




})


const alltotal = document.getElementById("alltotal");


//           <div class="badge badge-soft badge-secondary">${}</div>
            //   <div class="badge badge-soft badge-secondary">Secondary</div>