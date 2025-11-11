// app.js — ONE MOTOR GROUP 黑金展示专用版
const DATA_URL = "cars.json";

async function loadCars() {
  try {
    const res = await fetch(DATA_URL);
    const cars = await res.json();

    const carGrid = document.getElementById("carGrid");
    carGrid.innerHTML = "";

    cars.forEach((car) => {
      const div = document.createElement("div");
      div.className = "car-card";
      div.innerHTML = `
        <img src="${car.image}" alt="${car.name}">
        <div class="car-info">
          <h3>${car.name}</h3>
          <p class="price">${car.price}</p>
        </div>
      `;
      carGrid.appendChild(div);
    });
  } catch (error) {
    document.getElementById("carGrid").innerHTML =
      `<p>⚠️ 暂无车辆数据（请确认 cars.json 已上传）</p>`;
  }
}

loadCars();
