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
// ];

const apiUrl = `https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json`;
let productData = [];

const areaData = ["台北", "台中", "高雄"];
let c3Data = [];

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
  } catch (err) {
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
  calcAreaNumber();
  c3Init();
  renderTicketCardArea([...productData]);
  trainingForm.reset();
}

// 統計各套票的地區數量，並整理成 c3 的格式
function calcAreaNumber() {
  // 1. 統計各套票的地區數量
  // 2. 整理成 c3 的格式 [ ["高雄", 2], ["台北",1], ["台中", 1] ]
  c3Data = [];
  let tempObj = {};
  productData.forEach((item) => {
    if (tempObj[item.area] === undefined) {
      tempObj[item.area] = 1;
    } else {
      tempObj[item.area] += 1;
    }
  });
  const areaLabel = Object.keys(tempObj);
  areaLabel.forEach((item) => {
    let temp = [];
    temp.push(item);
    temp.push(tempObj[item]);
    c3Data.push(temp);
  });
  console.log(c3Data);
}

// 分類
function filterTicketCardData(selectLocation = "") {
  let ticketList = productData;
  if (selectLocation) {
    ticketList = productData.filter((item) => item.area === selectLocation);
  }
  if (ticketList.length) {
    ticketCardArea.classList.remove("d-none");
    cantFindArea.classList.add("d-none");
  } else {
    ticketCardArea.classList.add("d-none");
    cantFindArea.classList.remove("d-none");
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
  searchLength.innerHTML = `本次搜尋共 ${ticketList.length} 筆資料`;
}

// C3
function c3Init() {
  c3.generate({
    bindto: "#chart", // HTML 元素綁定
    data: {
      columns: c3Data, // 資料存放
      type: "donut", // 圖表種類
      colors: {
        高雄: "#E68618",
        台中: "#5151D3",
        台北: "#26BFC7",
      },
    },
    size: {
      width: 160,
      height: 160,
    },
    donut: {
      title: "套票地區比重",
      width: 8,
      label: {
        show: false,
      },
    },
  });
}

async function init() {
  await getData();
  calcAreaNumber();
  filterTicketCardData();
  c3Init();
}

init();
