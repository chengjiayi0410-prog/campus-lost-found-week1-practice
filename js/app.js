const items = [
  {
    id: 1,
    type: "lost",
    category: "card",
    title: "校园卡丢失",
    description: "蓝色卡套，里面有一张校园卡。",
    location: "第二教学楼 305",
    date: "11月17日 14:20"
  },
  {
    id: 2,
    type: "found",
    category: "electronics",
    title: "捡到白色蓝牙耳机",
    description: "白色充电盒，已交给图书馆服务台。",
    location: "图书馆三楼",
    date: "11月18日 09:40"
  },
  {
    id: 3,
    type: "lost",
    category: "book",
    title: "《数据结构》教材",
    description: "绿色封面，书里夹着两张便利贴。",
    location: "东区食堂二楼",
    date: "11月16日 18:05"
  },
    {
    id: 4,
    type: "found",
    category: "key",
    title: "捡到一串钥匙，挂着蓝色小熊",
    description: "一共三把钥匙，钥匙扣是蓝色小熊，目前在体育馆门卫处。",
    location: "体育馆正门",
    date: "11月18日 08:15"
  },
  {
    id: 5,
    type: "lost",
    category: "electronics",
    title: "黑色充电宝，侧面有白色贴纸",
    description: "容量 10000mAh，贴纸上写着英文名字，充电线一起丢失。",
    location: "图书馆一楼大厅",
    date: "11月17日 16:30"
  },
  {
    id: 6,
    type: "found",
    category: "card",
    title: "拾到学生证一张，姓名王同学",
    description: "在自动售货机旁边捡到，已拍照登记，请失主描述证件信息认领。",
    location: "一号教学楼 201 门口",
    date: "11月18日 11:10"
  },
  {
    id: 7,
    type: "lost",
    category: "other",
    title: "灰色雨伞，伞柄有姓名贴",
    description: "折叠伞，伞面是深灰色，伞柄贴着一张白色姓名贴，可能落在快递站。",
    location: "南门快递站",
    date: "11月15日 19:25"
  },
  {
    id: 8,
    type: "found",
    category: "book",
    title: "捡到一本《高等数学》习题册",
    description: "封面写着班级和学号后四位，里面有很多铅笔演算，暂放在自习室管理员处。",
    location: "西区自习室",
    date: "11月16日 21:00"
  },
  {
    id: 9,
    type: "lost",
    category: "electronics",
    title: "银色 U 盘，里面有课程资料",
    description: "金属外壳，挂着一根短绳，里面是小组作业和课程课件，非常重要。",
    location: "机房 A402",
    date: "11月17日 10:50"
  },
  {
    id: 10,
    type: "found",
    category: "other",
    title: "捡到一只粉色保温杯",
    description: "杯身有卡通图案，杯底贴着一张小贴纸，已放在田径场器材室。",
    location: "田径场看台",
    date: "11月18日 07:55"
  },
  {
    id: 11,
    type: "lost",
    category: "key",
    title: "宿舍钥匙，挂着小黄鸭",
    description: "钥匙圈上有一个小黄鸭挂件，可能是在去食堂的路上掉的。",
    location: "北区食堂",
    date: "11月16日 12:35"
  },
  {
    id: 12,
    type: "found",
    category: "card",
    title: "捡到身份证一张，请失主联系",
    description: "在校医院门口捡到，证件信息已做遮挡处理，请失主说明姓名后认领。",
    location: "校医院门口",
    date: "11月17日 09:05"
  }
  
];
const typeLabels = {
  lost: "失物",
  found: "招领"
};

const categoryLabels = {
  card: "证件",
  electronics: "电子设备",
  book: "书籍",
  key: "钥匙",
  other: "其他"
};

const categoryIcons = {
  card: "💳",
  electronics: "📱",
  book: "📚",
  key: "🔑",
  other: "🎒"
};

const state = {
  keyword: "",
  type: "all",
  category: "all"
};

console.log(items);


const cardGrid = document.querySelector("#cardGrid");
const cardTemplate = document.querySelector("#cardTemplate");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");

function createCard(item) {
  const fragment = cardTemplate.content.cloneNode(true);
  const badge = fragment.querySelector(".badge");

  fragment.querySelector(".item-card").dataset.id = item.id;
  fragment.querySelector(".item-icon").textContent =
    categoryIcons[item.category];
  fragment.querySelector(".item-title").textContent = item.title;
  fragment.querySelector(".item-desc").textContent = item.description;
  fragment.querySelector(".item-location").textContent = item.location;
  fragment.querySelector(".item-date").textContent = item.date;

  badge.textContent = typeLabels[item.type];
  badge.classList.add(
    item.type === "lost" ? "badge-lost" : "badge-found"
  );

  return fragment;
}

function getFilteredItems() {
  return items.filter((item) => {
    const text = [
      item.title,
      item.description,
      item.location
    ].join(" ").toLowerCase();

    const matchesType =
      state.type === "all" || item.type === state.type;

    const matchesCategory =
      state.category === "all" || item.category === state.category;

    const matchesKeyword =
      state.keyword === "" || text.includes(state.keyword);

    return matchesType && matchesCategory && matchesKeyword;
  });
}

function render() {
  const filtered = getFilteredItems();
  const fragment = document.createDocumentFragment();

  filtered.forEach((item) => {
    fragment.append(createCard(item));
  });

  cardGrid.replaceChildren(fragment);
  resultCount.textContent = filtered.length;
  emptyState.hidden = filtered.length > 0;
}

render();


const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", (event) => {
  state.keyword = event.target.value.trim().toLowerCase();
  render();
});


document.querySelectorAll("[data-type]").forEach((button) => {
  button.addEventListener("click", () => {
    state.type = button.dataset.type;

    document.querySelectorAll("[data-type]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    render();
  });
});

document.querySelectorAll("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;

    document.querySelectorAll("[data-category]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    render();
  });
});

const resetFiltersBtn = document.querySelector("#resetFiltersBtn");

resetFiltersBtn.addEventListener("click", () => {
  state.keyword = "";
  state.type = "all";
  state.category = "all";
  searchInput.value = "";

  document.querySelectorAll("[data-type]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.type === "all"
    );
  });

  document.querySelectorAll("[data-category]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.category === "all"
    );
  });

  render();
});

const detailDialog = document.querySelector("#detailDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogDesc = document.querySelector("#dialogDesc");
const dialogLocation = document.querySelector("#dialogLocation");
const dialogDate = document.querySelector("#dialogDate");

cardGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".card-link");
  if (!button) return;

  const card = button.closest(".item-card");
  const item = items.find(
    (entry) => entry.id === Number(card.dataset.id)
  );

  if (!item) return;

  dialogTitle.textContent = item.title;
  dialogDesc.textContent = item.description;
  dialogLocation.textContent = item.location;
  dialogDate.textContent = item.date;

  detailDialog.showModal();
});