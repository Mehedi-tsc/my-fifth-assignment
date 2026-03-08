const allCardContainer = document.getElementById('all-card-container');
const countAll = document.getElementById('count-all');
const allBtn = document.getElementById('allBtn');
const openBtn = document.getElementById('openBtn');
const closedBtn = document.getElementById('closedBtn');
const spinner = document.getElementById('loading-spinner');
const modalTitle = document.getElementById('modal-title');
const modalStatus = document.getElementById('modal-status');
const modalName = document.getElementById('modal-name');
const modalName2 = document.getElementById('modal-name-2');
const modalDate = document.getElementById('modal-date');
const modalDescription = document.getElementById('modal-description');
const modalPriority = document.getElementById('modal-priority');
const modalLeftBadge = document.getElementById('modal-left-badge');
const modalRightBadge = document.getElementById('modal-right-badge');

function showSpinner(){
    spinner.classList.remove('hidden')
    spinner.classList.add('flex')
    allCardContainer.classList.add('hidden')
}
function closeSpinner(){
    spinner.classList.add('hidden')
    spinner.classList.remove('flex')
    allCardContainer.classList.remove('hidden')
}
const loadingCard = async() =>{
    showSpinner();
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const result = data.data;
    displayCard(result);
    closeSpinner();
}
function displayCard(card){
    allCardContainer.innerHTML = "";
    card.forEach(item=> {
        const div = document.createElement('div');
        div.innerHTML = `
         <div onclick = "showIssueModal(${item.id})" class="card card-body shadow-sm space-y-2 lg:h-80 border-t-2 ${item.status==='open'?'border-t-green-600':'border-t-purple-700'}">
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
                            <span><img src="${item.labels[0]==='bug'?'assets/BugDroid.png':item.labels[0]==='help wanted'?'assets/Lifebuoy.png':'assets/Vector.png'}" alt=""></span>
                             <span>${item.labels[0].toUpperCase()}</span>
                        </div>
                        <div class="mb-1 badge badge-warning ${item.labels.length<2?'hidden':'inline-flex'}">
                            <span><img src="${item.labels[1]==='bug'?'assets/BugDroid.png':item.labels[1]==='help wanted'?'assets/Lifebuoy.png':'assets/Vector.png'}" alt=""></span>
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
    showSpinner();
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const result = data.data;
    const newArray = result.filter(item => item.status==='open')
    displayCard(newArray);
    closeSpinner();
}
async function closeTab(){
    showSpinner();
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const result = data.data;
    const newArray = result.filter(item => item.status==='closed')
    displayCard(newArray);
    closeSpinner();
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
 
async function showIssueModal(id){
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const result = data.data;
    modalTitle.textContent = result.title;
    modalStatus.textContent =result.status;
    modalStatus.className= `${result.status==='open' ? 'capitalize text-xs text-white badge badge-success' : 'capitalize text-xs text-white badge badge-warning'}`;
    modalName.textContent = `${result.assignee===""?'not found':result.assignee.split('_').join(' ')}`;
    modalName.className = 'capitalize';
    modalName2.textContent = `${result.assignee===""?'not found':result.assignee.split('_').join(' ')}`;
    modalName2.className = 'capitalize';
    modalDate.textContent = new Date(result.updatedAt).toLocaleDateString();
    modalDescription.textContent = result.description;
    modalPriority.textContent = result.priority;
    modalPriority.className= `${result.priority==='high' ? 'capitalize text-xs text-white badge badge-error' : result.priority==='medium' ? 'capitalize text-xs text-white badge badge-warning': 'capitalize text-xs text-white badge badge-accent'}`;
    modalLeftBadge.textContent = result.labels[0].toUpperCase();
    modalRightBadge.textContent = `${result.labels.length<2?'':result.labels[1].toUpperCase()}`;
    modalRightBadge.className = `${result.labels.length<2?'hidden': 'mb-1 badge badge-warning'}`
    my_modal_1.showModal();
}
loadingCard();
