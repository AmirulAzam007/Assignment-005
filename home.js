

//data nichi
async function loadbtns(){
//     fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
//     .then((res) => res.json())
//     .then((data) => { console.log(data);
//     })

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

const data = await res.json();

 }

 loadbtns();

 const allbtn = document.getElementById("allbtn");
 const openbtn = document.getElementById("openbtn");
 const closebtn = document.getElementById("closebtn");


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
