const productData = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description: "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
      "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
];

const areaData = ["台北", "台中", "高雄"];

const trainingForm = document.querySelector(".training-form"); // 表單
const ticketCardArea = document.querySelector(".ticketCard-area"); // 套票卡片區
const searchTicketRegion = document.querySelector("#searchTicketRegion"); // 套票卡片區

trainingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
});

searchTicketRegion.addEventListener("change", (e) => {
  filterTicketCardData(e.target.value);
});

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

function filterTicketCardData(selectLocation = '') {
  let ticketList = productData;
  if (selectLocation) {
    ticketList = productData.filter((item) => item.area === selectLocation)
  } 
  renderTicketCardArea(ticketList);
}

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
}

function init() {
  filterTicketCardData();
}

init();
