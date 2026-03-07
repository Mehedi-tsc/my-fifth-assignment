const allCardContainer = document.getElementById('all-card-container');
const loadingCard = async() =>{
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const result = data.data;
    displayCard(result);
}
function displayCard(card){
    card.forEach(item=> {
        const div = document.createElement('div');
        div.innerHTML = `
         <div class="card card-body shadow-sm space-y-2 h-70">
                    <div class="card-top flex justify-between items-center">
                        <img src="${item.status==='open'?'assets/Open-Status.png':'assets/Closed- Status .png'}" alt="">
                        <div class="badge badge-soft badge-success">HIGH</div>
                    </div>
                    <div class="text-part">
                        <h2 class="font-semibold">${item.title}</h2>
                        <p class="text-xs text-[#64748B] line-clamp-2">${item.description}</p>
                    </div>
                    <!-- badge part -->
                    <div>
                        <div class="badge badge-success">
                            <span><img src="assets/BugDroid.png" alt=""></span>
                             <span>BUG</span>
                        </div>
                        <div class="badge badge-warning">
                            <span><img src="assets/Lifebuoy.png" alt=""></span>
                             <span>HELP WANTED</span>
                        </div>
                    </div>
                    <!-- badge part end -->
                     <hr class="my-1 text-[#E4E4E7]">
                     <div class="space-y-2 text-[#64748B]">
                        <p>#1by john_doe</p>
                        <p>1/15/2024</p>
                     </div>
                </div>
        `
        allCardContainer.appendChild(div);
    })
}
loadingCard();