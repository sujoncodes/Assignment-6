
const loadCategories = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "flex"; 

  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.categories));
};


const loadLevelCategory = (id) => {
  const allCategories = document.querySelectorAll(".category-btn");
  const loader = document.getElementById("loader");
  const cardContainer = document.getElementById("card-container");

  loader.style.display = "flex";
  cardContainer.innerHTML = "";

  const URL = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(URL)
    .then(res => res.json())
    .then(json => displayPlant(json.plants)); 

  allCategories.forEach(btn => {
    btn.classList.remove("bg-[#15803D]", "text-white");
    btn.classList.add("hover:bg-[#DCFCE7]");
  });

  const selected = document.getElementById(`category-${id}`);
  selected.classList.add("bg-[#15803D]", "text-white");
  selected.classList.remove("hover:bg-[#DCFCE7]");
};

const displayCategories = (categories) => {
  const loader = document.getElementById("loader");
  loader.style.display = "flex"; 
  const levelCategories = document.getElementById("level-categories");
  levelCategories.innerHTML = "";

  for (let category of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button 
        id="category-${category.id}" 
        onclick="loadLevelCategory(${category.id})" 
        class="category-btn w-full text-left text-[1rem] px-3 py-2 font-medium rounded-lg hover:bg-[#DCFCE7]">
        ${category.category_name}
      </button>
    `;
    levelCategories.appendChild(btnDiv);
  }

  loader.style.display = "none"; 
};


const loadAllplants = () => {
  const loader = document.getElementById("loader");
  const cardContainer = document.getElementById("card-container");

  loader.style.display = "flex";
  cardContainer.innerHTML = "";

  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(res => res.json())
    .then(json => displayPlant(json.plants));
};


const displayPlant = (plants) => {
  const loader = document.getElementById("loader");
  loader.style.display = "flex"; 

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  for (let [index, plant] of plants.entries()) {
    const modalId = `my_modal_${index}`;
    const cardBtnDiv = document.createElement("div");
    cardBtnDiv.innerHTML = `
      <div class="bg-white p-[16px] rounded-lg shadow">
        <img src="${plant.image}" alt="" class="mb-[12px] h-[186px] w-[311px] object-cover rounded-md">

        <!-- Modal Trigger -->
        <button class="btn border-none p-0 bg-white shadow-none" 
          onclick="document.getElementById('${modalId}').showModal()">
          ${plant.name}
        </button>

        <!-- Modal -->
        <dialog id="${modalId}" class="modal">
          <div class="modal-box">
            <h3 class="text-xl font-bold mb-[8px]">${plant.name}</h3>
            <img class="h-[226px] w-full object-cover rounded-[8px]" src="${plant.image}" alt="">
            <h3 class="text-[18px] font-semibold my-[13px]">
              Category: <span class="font-normal">${plant.category}</span>
            </h3>
            <h4 class="text-[18px] font-semibold mb-[13px]">
              Price: ৳ <span class="font-normal">${plant.price}</span>
            </h4>
            <p class="mb-[13px] text-[18px] font-semibold">
              Description: <span class="font-normal">${plant.description}</span>
            </p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        <p class="text-[12px] opacity-[0.7] py-[8px] mb-[8px] h-[62px] clamp-3">${plant.description}</p>
              
        <div class="flex justify-between mb-[12px]">
          <h3 class="bg-[#DCFCE7] px-[12px] py-[4px] rounded-[999px] text-[14px] text-[#15803D]">${plant.category}</h3>
          <p class="text-[12px] font-extrabold">৳ <span>${plant.price}</span></p>
        </div>

        <button 
          class="add-cart-btn btn btn-block bg-[#15803D] border-none shadow-none text-gray-50"
          data-name="${plant.name}" 
          data-price="${plant.price}">
          Add to Cart
        </button>
      </div>
    `;
    cardContainer.append(cardBtnDiv);
  }

  loader.style.display = "none"; 

  
  document.querySelectorAll(".add-cart-btn").forEach(button => {
    button.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      const price = parseInt(this.getAttribute("data-price"));

      const cartHistory = document.getElementById("cart-history");
      const cartFooter = document.getElementById("cart-footer");
      const totalPriceEl = document.getElementById("cart-total");

      let existingItem = cartHistory.querySelector(`[data-cart-item="${name}"]`);
      let currentTotal = parseInt(totalPriceEl.innerText);

      if (existingItem) {
        
        let qtyEl = existingItem.querySelector(".item-qty");
        let qty = parseInt(qtyEl.innerText) + 1;
        qtyEl.innerText = qty;
      } else {
        
        const div = document.createElement("div");
        div.setAttribute("data-cart-item", name);
        div.innerHTML = `
          <div class="flex items-center justify-between bg-[#F0FDF4] py-[8px] px-[12px] mb-[8px] rounded-md">
            <div>
              <h1 class="text-[14px] font-semibold">${name}</h1>
              <p class="text-[16px] text-gray-400">
                ৳ <span class="item-price">${price}</span> x <span class="item-qty">1</span>
              </p>
            </div>
            <div class="remove-btn text-[16px] text-gray-500 font-semibold cursor-pointer">x</div>
          </div>
        `;
        cartHistory.appendChild(div);

        
        div.querySelector(".remove-btn").addEventListener("click", function () {
          let qty = parseInt(div.querySelector(".item-qty").innerText);
          let itemPrice = parseInt(div.querySelector(".item-price").innerText);
          let totalRemove = qty * itemPrice;
          let currentTotal = parseInt(totalPriceEl.innerText);
          totalPriceEl.innerText = currentTotal - totalRemove;
          div.remove();


          if (cartHistory.children.length === 0) {
            cartFooter.classList.add("hidden");
          }
        });
      }

      if (cartFooter.classList.contains("hidden")) {
        cartFooter.classList.remove("hidden");
      }
      currentTotal += price;
      totalPriceEl.innerText = currentTotal;
    });
  });
};

// init
loadAllplants();
loadCategories();
