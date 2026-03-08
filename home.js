
const createElements =  (arr) => {
  const elements = arr.map((el) => `<span class="badge badge-soft badge-secondary uppercase">${el}</span>`);

  return elements.join(" ");
};

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

displaydatas(data.data);
 }

  loaddatas();

function displaydatas(data){

    data.forEach(info => {
        
        const card = document.createElement("div");

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
             <img src="./assets/Open-Status.png" alt="">
             <div class="badge badge-soft badge-secondary uppercase">${info.priority}</div>
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

}

//           <div class="badge badge-soft badge-secondary">${}</div>
            //   <div class="badge badge-soft badge-secondary">Secondary</div>