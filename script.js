let vehicles = [
  {id:1, make:'Perodua', model:'Myvi', year:2023, vin:'Dhaka Metro Ga 11-2201', price:2450000, status:'Available'},
  {id:2, make:'Perodua', model:'Axia', year:2022, vin:'Dhaka Metro Ha 22-1187', price:1850000, status:'Reserved'},
  {id:3, make:'Perodua', model:'Bezza', year:2023, vin:'Chattogram Metro Ga 04-5563', price:2100000, status:'Sold'},
];
let nextId = 4;

const $ = s => document.querySelector(s);

// Formats numbers the Bangladesh way: last 3 digits, then groups of 2 (e.g. 24,50,000)
function formatBDT(num){
  num = Math.round(Number(num));
  const str = num.toString();
  if(str.length <= 3) return '৳' + str;
  const lastThree = str.slice(-3);
  const rest = str.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return '৳' + rest + ',' + lastThree;
}

function render(){
  const q = $('#searchInput').value.trim().toLowerCase();
  const statusFilter = $('#searchStatus').value;

  let filtered = vehicles.filter(v=>{
    const matchesQuery = !q || [v.make,v.model,v.vin].some(f=>f.toLowerCase().includes(q));
    const matchesStatus = !statusFilter || v.status===statusFilter;
    return matchesQuery && matchesStatus;
  });

  const total = vehicles.length;
  const avail = vehicles.filter(v=>v.status==='Available').length;
  const res = vehicles.filter(v=>v.status==='Reserved').length;
  const sold = vehicles.filter(v=>v.status==='Sold').length;
  const totalValue = vehicles.reduce((a,v)=>a+Number(v.price),0);
  const avgValue = total ? Math.round(totalValue/total) : 0;

  $('#s-total').textContent = total;
  $('#s-avail').textContent = avail;
  $('#s-res').textContent = res;
  $('#s-sold').textContent = sold;
  $('#s-value').textContent = formatBDT(totalValue);
  $('#s-avg').textContent = formatBDT(avgValue);

  const wrap = $('#tableWrap');
  if(filtered.length===0){
    wrap.innerHTML = `<div class="empty"><b>No vehicles found</b>Add a vehicle on the left, or adjust your search.</div>`;
    return;
  }

  wrap.innerHTML = `
    <table>
      <thead>
        <tr><th>Vehicle</th><th>Year</th><th>VIN/Plate</th><th>Price</th><th>Status</th><th></th></tr>
      </thead>
      <tbody>
        ${filtered.map(v=>`
          <tr>
            <td><b>${escapeHtml(v.make)} ${escapeHtml(v.model)}</b></td>
            <td>${v.year}</td>
            <td class="vin">${escapeHtml(v.vin)}</td>
            <td class="price">${formatBDT(v.price)}</td>
            <td>
              <select class="status-select" data-id="${v.id}" onchange="updateStatus(${v.id}, this.value)">
                <option value="Available" ${v.status==='Available'?'selected':''}>Available</option>
                <option value="Reserved" ${v.status==='Reserved'?'selected':''}>Reserved</option>
                <option value="Sold" ${v.status==='Sold'?'selected':''}>Sold</option>
              </select>
            </td>
            <td><button class="del-btn" onclick="removeVehicle(${v.id})">Remove</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function updateStatus(id, status){
  const v = vehicles.find(v=>v.id===id);
  if(v){ v.status = status; render(); }
}

function removeVehicle(id){
  vehicles = vehicles.filter(v=>v.id!==id);
  render();
}

$('#addForm').addEventListener('submit', e=>{
  e.preventDefault();
  const make = $('#f-make').value.trim();
  const model = $('#f-model').value.trim();
  const year = $('#f-year').value;
  const price = $('#f-price').value;
  const vin = $('#f-vin').value.trim();
  const status = $('#f-status').value;

  if(!make || !model || !year || !price || !vin) return;

  vehicles.push({id: nextId++, make, model, year, vin, price, status});
  e.target.reset();
  $('#f-status').value = 'Available';
  render();
});

$('#searchInput').addEventListener('input', render);
$('#searchStatus').addEventListener('change', render);
$('#clearSearch').addEventListener('click', ()=>{
  $('#searchInput').value=''; $('#searchStatus').value=''; render();
});

function tick(){
  const d = new Date();
  $('#clock').textContent = d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) + ' · ' + d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
}
tick(); setInterval(tick, 30000);

render();