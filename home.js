const allCardContainer = document.getElementById('all-card-container');
const countAll = document.getElementById('count-all');
const allBtn = document.getElementById('allBtn');
const openBtn = document.getElementById('openBtn');
const closedBtn = document.getElementById('closedBtn');
const loadingCard = async() =>{
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const result = data.data;
    displayCard(result);
}
function displayCard(card){
    allCardContainer.innerHTML = "";
    card.forEach(item=> {
        const div = document.createElement('div');
        div.innerHTML = `
         <div class="card card-body shadow-sm space-y-2 lg:h-70">
                    <div class="card-top flex justify-between items-center">
                        <img src="${item.status==='open'?'assets/Open-Status.png':'assets/Closed- Status .png'}" alt="">
                        <div class="badge badge-soft ${item.priority==="high" ? "badge-success bg-red-100" : item.priority==="medium" ? "badge-warning":"badge-accent"}">${item.priority.toUpperCase()}</div>
                    </div>
                    <div class="text-part">
                        <h2 class="font-semibold">${item.title}</h2>
                        <p class="text-xs text-[#64748B] line-clamp-2">${item.description}</p>
                    </div>
                    <!-- badge part -->
                    <div>
                        <div class="badge badge-success mb-1">
                            <span><img src="${item.labels[0]==='bug'?'assets/BugDroid.png':item.labels[0]==='help wanted'?'assets/Lifebuoy.png':'assets/vector.png'}" alt=""></span>
                             <span>${item.labels[0].toUpperCase()}</span>
                        </div>
                        <div class="mb-1 badge badge-warning ${item.labels.length<2?'hidden':'inline-flex'}">
                            <span><img src="assets/Lifebuoy.png" alt=""></span>
                             <span>${item.labels[1]?.toUpperCase()}</span>
                        </div>
                    </div>
                    <!-- badge part end -->
                     <hr class="my-1 text-[#E4E4E7]">
                     <div class="space-y-2 text-[#64748B]">
                        <p>${item.author.toUpperCase().split('_').join(' ')}</p>
                        <p>${item.createdAt}</p>
                     </div>
                </div>
        `
        allCardContainer.appendChild(div);
        
    })
    countAll.innerText=card.length;
    
}
async function openTab(){
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const result = data.data;
    const newArray = result.filter(item => item.status==='open')
    displayCard(newArray);
}
async function closeTab(){
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const result = data.data;
    const newArray = result.filter(item => item.status==='closed')
    displayCard(newArray);
}
allBtn.addEventListener('click',function(){
    allBtn.classList.remove('text-[#64748B]');
    allBtn.classList.add('btn-primary');
    openBtn.classList.remove('btn-primary');
    closedBtn.classList.remove('btn-primary');
    loadingCard();
})
openBtn.addEventListener('click',function(){
    openBtn.classList.remove('text-[#64748B]');
    openBtn.classList.add('btn-primary');
    closedBtn.classList.remove('btn-primary');
    allBtn.classList.remove('btn-primary');
    openTab();
})
closedBtn.addEventListener('click',function(){
    closedBtn.classList.remove('text-[#64748B]');
    closedBtn.classList.add('btn-primary');
    openBtn.classList.remove('btn-primary');
    allBtn.classList.remove('btn-primary');
    closeTab();
})
loadingCard();