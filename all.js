// const productData = [
//   {
//     id: 0,
//     name: "肥宅心碎賞櫻3日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     area: "高雄",
//     description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     group: 87,
//     price: 1400,
//     rate: 10,
//   },
//   {
//     id: 1,
//     name: "貓空纜車雙程票",
//     imgUrl:
//       "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台北",
//     description: "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     group: 99,
//     price: 240,
//     rate: 2,
//   },
//   {
//     id: 2,
//     name: "台中谷關溫泉會1日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台中",
//     description:
//       "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     group: 20,
//     price: 1765,
//     rate: 7,
//   },
// ];

const apiUrl = `https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json`;
let productData = undefined;

const areaData = ["台北", "台中", "高雄"];

const trainingForm = document.querySelector(".training-form"); // 表單
const ticketCardArea = document.querySelector(".ticketCard-area"); // 套票卡片區
const searchTicketRegion = document.querySelector("#searchTicketRegion"); // 套票卡片區
const searchLength = document.querySelector("#searchLength"); // 查詢結果數量
const cantFindArea = document.querySelector(".cantFind-area"); // 查詢結果為 0 

trainingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
});

searchTicketRegion.addEventListener("change", (e) => {
  filterTicketCardData(e.target.value);
});

// 讀取 API
async function getData() { 
  try { 
    let { data } = await axios.get(apiUrl);
    productData = data.data;
  }
  catch (err) { 
    console.error(err);
  }
}

// 新增
function submitForm() {
  let newData = {
    id: productData.length,
    name: trainingForm[0].value,
    imgUrl: trainingForm[1].value,
    area: trainingForm[2].value,
    description: trainingForm[6].value,
    group: trainingForm[4].value,
    price: trainingForm[3].value,
    rate: trainingForm[5].value,
  };
  productData.push(newData);
  renderTicketCardArea([...productData]);
  trainingForm.reset();
}

// 分類
function filterTicketCardData(selectLocation = '') {
  let ticketList = productData;
  if (selectLocation) {
    ticketList = productData.filter((item) => item.area === selectLocation)
  } 
  if (ticketList.length) {
    ticketCardArea.classList.remove('d-none');
    cantFindArea.classList.add('d-none');
  } else { 
    ticketCardArea.classList.add('d-none');
    cantFindArea.classList.remove('d-none');
  }
  renderTicketCardArea(ticketList);
}

// 渲染
function renderTicketCardArea(ticketList) {
  let totalTicketCardStr = ``;
  ticketList.forEach((ticket) => {
    totalTicketCardStr += `
        <li class="ticketCard">
          <div class="ticketCard-img">
            <div class="ticketCard-location">${ticket.area}</div>
            <a href="#">
              <img
                src="${ticket.imgUrl}"
                alt=""
              />
            </a>
            <div class="ticketCard-rank">${ticket.rate}</div>
          </div>
          <div class="ticketCard-content">
            <h3 class="ticketCard-title">${ticket.name}</h3>
            <div class="ticketCard-description">
              <p>${ticket.description}</p>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span> ${ticket.group} </span> 組
                </p>
                <p class="ticketCard-price">TWD <span>$${ticket.price}</span></p>
              </div>
            </div>
          </div>
        </li>
        `;
  });
  ticketCardArea.innerHTML = totalTicketCardStr;
  searchLength.innerHTML = `本次搜尋共 ${ticketList.length} 筆資料`
}

async function init() {
  await getData();
  filterTicketCardData();
}

init();
