let Alldata = [],
  products = document.querySelector(".products"),
  YourCart = document.querySelector(".YourCart"),
  NumInCart = document.querySelector(".YourCart p"),
  allBuyers = document.querySelector(".empty"),
  show = document.querySelector(".show"),
  showInfo = document.querySelector(".showinfo"),
  btn = document.querySelector(".YourCart .showinfo button"),
  confirmBtn = document.querySelector(".confirm button"),
  ArrayOfCharts = [],
  numProdicts = 0,
  ToatlNumBuy = 0,
  OrderTotal = 0;

btn.addEventListener("click", confirmBuy);
confirmBtn.addEventListener("click", startNewBuy);
handelAssycFunc();
async function getData() {
  try {
    Alldata = await fetch("data.json");
    console.log(Alldata);
    Alldata = await Alldata.json();
    console.log(Alldata);
    // drawData();
  } catch (err) {
    console.log(err);
  }
}
async function handelAssycFunc() {
  await getData();
  drawData();
}

function drawData() {
  products.innerHTML = "";
  Alldata.forEach((product, idx) => {
    products.innerHTML += `
      <div class="product">
        <div class="img">
          <img src="${product.image.tablet}" alt="product">
          <div class="cart" onclick="handleCart(this.nextElementSibling, ${idx})">
            <img src="assets/images/icon-add-to-cart.svg" alt="cart">
            <span>Add to Cart</span>
          </div>
          <div class="numpro">
            <img src="assets/images/icon-decrement-quantity.svg" onclick="handleDecrement(this.nextElementSibling, ${idx})" alt="decrement">
            <span class="Num">0</span>
            <img src="assets/images/icon-increment-quantity.svg" onclick="handleIncrement(this.previousElementSibling, ${idx})" alt="increment">
          </div>
        </div>
        <span class="name">${product.category}</span>
        <span class="dis">${product.name}</span>
        <span class="price">${product.price}</span>
      </div>
    `;
  });
}

function handleCart(numPro, idx) {
  console.log(ToatlNumBuy);
  numPro.classList.add("appear");
  // NumInCart.innerHTML = `Your Cart (${ToatlNumBuy}) `;
  // allBuyers.classList.add("hidden");
}

function handleDecrement(Ele, idx) {
  numProdicts = Ele.innerHTML;
  // console.log(ToatlNumBuy);

  if (ToatlNumBuy > 0 && numProdicts > 0) {
    // console.log(Ele);

    ToatlNumBuy--;
    NumInCart.innerHTML = `Your Cart (${ToatlNumBuy}) `;
    allBuyers.classList.add("hidden");
    if (ToatlNumBuy == 0) {
      allBuyers.classList.remove("hidden");
      showInfo.classList.remove("appear");
    } else {
      showInfo.classList.add("appear");
    }
  }

  if (numProdicts > 1) {
    let Buyers = document.querySelectorAll(".Buyers");
    let counts = document.querySelectorAll(".Buyers .count");

    let totals = document.querySelectorAll(".Buyers .total");
    let intils = document.querySelectorAll(".Buyers .intialPrice");

    let dataPrices = document.querySelectorAll(".price");
    // console.log(dataPrices);
    OrderTotal -= extractNumber(dataPrices[idx].innerHTML.trim());

    document.querySelector(".TotalPri").innerHTML = `$${OrderTotal}`;
    Buyers.forEach((buyer, ele) => {
      if (buyer.getAttribute("attr-id") == idx) idx = ele;
    });

    let nums =
      (parseInt(counts[+idx].innerHTML) - 1) *
      +extractNumber(intils[+idx].innerHTML.trim());

    counts[idx].innerHTML = parseInt(counts[+idx].innerHTML) - 1 + "x";

    totals[idx].innerHTML = nums;
  } else {
    numProdicts == 0;
    showDatainCart(idx);
    ArrayOfCharts.splice(ArrayOfCharts.indexOf(idx), 1);
  }
  if (numProdicts > 0) {
    numProdicts--;
    Ele.innerHTML = numProdicts;
  }
  numProdicts = parseInt(Ele.innerHTML);
  // console.log(numProdicts);
}

// console.log(ToatlNumBuy);

// console.log(NumInCart);

/**
 * Increment the number of products you want to buy
 * @param {Element} Ele - the element that you want to increment
 * @param {number} idx - the index of the product in the data array
 */

function handleIncrement(Ele, idx) {
  // console.log(Ele);
  // console.log(idx);
  let dataPrices = document.querySelectorAll(".price");
  // console.log(dataPrices);
  OrderTotal += extractNumber(dataPrices[idx].innerHTML.trim());

  document.querySelector(".TotalPri").innerHTML = `$${OrderTotal}`;
  showInfo.classList.add("appear");
  letElements = document.querySelectorAll(".product");
  // let intils = document.querySelectorAll(".Buyers .intialPrice");
  // console.log(intils);
  // console.log(letElements);
  // console.log(ArrayOfCharts);

  if (ArrayOfCharts.indexOf(idx) == -1) {
    ArrayOfCharts.push(idx);
    addElemntToBuy(idx);
    console.log("Ds");
  } else {
    let Buyers = Array.from(document.querySelectorAll(".Buyers"));
    let counts = Array.from(document.querySelectorAll(".Buyers .count"));
    // console.log(counts);
    // let intialPrices = document.querySelectorAll(".Buyers intialPrice");
    let totals = Array.from(document.querySelectorAll(".Buyers .total"));
    let intils = Array.from(document.querySelectorAll(".Buyers .intialPrice"));
    // console.log(counts);
    // console.log(totals);
    // console.log(idx);
    Buyers.forEach((buyer, ele) => {
      if (buyer.getAttribute("attr-id") == idx) idx = ele;
    });

    let nums =
      (parseInt(counts[+idx].innerHTML) + 1) *
      +extractNumber(intils[+idx].innerHTML.trim());

    counts[idx].innerHTML = parseInt(counts[+idx].innerHTML) + 1 + "x";

    totals[idx].innerHTML = nums;
  }

  // when there arr products
  allBuyers.classList.add("hidden");

  //Increment Total Number that you buy
  ToatlNumBuy++;
  NumInCart.innerHTML = `Your Cart (${ToatlNumBuy}) `;

  //Increment  Number of this product that you want to buy
  numProdicts = parseInt(Ele.innerHTML);
  numProdicts++;
  Ele.innerHTML = numProdicts;
}
// console.log(ToatlNumBuy);

function addElemntToBuy(idx) {
  letElements = document.querySelectorAll(".product");
  let names = document.querySelectorAll(".product .name");
  // let dis = document.querySelectorAll(".product .dis");
  let prices = document.querySelectorAll(".product .price");

  show.innerHTML += `
    <div class="Buyers" attr-id="${idx}">
      <div class="Info">
        <p class="Titel">
          ${names[idx].innerHTML}
        </p>
        <div class="price">
          <span class="count">1x</span>
          <span class="intialPrice">
            @$${prices[idx].innerHTML}
          </span>
          <span class="total">
           $${prices[idx].innerHTML}
          </span>
        </div>
      </div>
      <div class="icon" onclick="deleteItem(${idx})">
        <img src="assets/images/icon-remove-item.svg" alt="remove">
      </div>
    </div>`;
}
function extractNumber(text) {
  return (
    parseFloat(
      text
        .split("")
        .filter((char) => !isNaN(char) || char === ".")
        .join("")
    ) || 0
  );
}

function showDatainCart(idx) {
  const buyers = document.querySelectorAll(".Buyers");
  console.log(buyers);
  show.innerHTML = "";
  const filteredBuyers = Array.from(buyers).filter(
    (buyer) => buyer.getAttribute("attr-id") != idx
  );
  filteredBuyers.forEach((buyer) => {
    show.appendChild(buyer);
  });
}
function deleteItem(idx) {
  console.log(ArrayOfCharts);
  ArrayOfCharts.splice(ArrayOfCharts.indexOf(idx), 1);
  console.log(ArrayOfCharts);
  const buyers = Array.from(document.querySelectorAll(".Buyers"));
  let TotalPri = document.querySelectorAll(".total"),
    counts = Array.from(document.querySelectorAll(".count")),
    Nums = Array.from(document.querySelectorAll(".Num")),
    numpro = Array.from(document.querySelectorAll(".numpro"));
  console.log(document.querySelector(".Titel"));
  console.log(ToatlNumBuy);
  console.log(Nums);
  console.log(counts);
  Nums[idx].innerHTML = 0;
  numpro[idx].classList.remove("appear");

  buyers.map((buyer, idnum) => {
    if (buyer.getAttribute("attr-id") == idx) {
      OrderTotal -= extractNumber(TotalPri[idnum].innerHTML.trim());
      console.log(extractNumber(counts[idnum].innerHTML.trim()));
      let val = ToatlNumBuy - extractNumber(counts[idnum].innerHTML.trim());
      // console.log(val);
      // console.log("+++++++++++++++++++");
      // console.log(ToatlNumBuy);

      ToatlNumBuy = val;
      // console.log(ToatlNumBuy);

      document.querySelector(".YourCart p").innerHTML = `Your Cart (${val})`;
      if (val == 0) {
        document.querySelector(".empty").classList.add("appear");
        document.querySelector(".empty").classList.remove("hidden");
        showInfo.classList.remove("appear");
      }
    }
  });

  document.querySelector(".TotalPri").innerHTML = `$${OrderTotal}`;
  showDatainCart(idx);
}

function confirmBuy(e) {
  e.preventDefault();
  document.querySelector(".confirm").classList.add("appear");
  document.querySelector(".container").classList.add("noevent");
  let data = Array.from(document.querySelectorAll(".Buyers"));
  let Titels = Array.from(document.querySelectorAll(".Titel"));
  let prices = Array.from(document.querySelectorAll(".intialPrice"));
  let totals = Array.from(document.querySelectorAll(".total"));

  data.forEach((ele, idx) => {
    document.querySelector(
      ".buys"
    ).innerHTML += `<div class="Buyers" attr-id="${idx}">
      <div class="Info">
        <p class="Titel">
          ${Titels[idx].innerHTML}
        </p>
        <div class="price">
          <span class="count">1x</span>
          <span class="intialPrice">
            ${prices[idx].innerHTML}
          </span>
          <span class="total">
           ${totals[idx].innerHTML}
          </span>
        </div>
      </div>
   
    </div>`;
  });
  document.querySelector(".confirm .TotalPri").innerHTML =
    document.querySelector(".showinfo .TotalPri").innerHTML;
}

function startNewBuy(e) {
  e.preventDefault();
  document.querySelector(".confirm").classList.remove("appear");
  document.querySelector(".container").classList.remove("noevent");
  setTimeout(() => {
    window.location.reload();
  }, 700);
}
