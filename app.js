// app.js （适用于根目录结构）
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
        <h3>${car.name}</h3>
        <p>${car.price}</p>
      `;
      carGrid.appendChild(div);
    });
  } catch (error) {
    const carGrid = document.getElementById("carGrid");
    carGrid.innerHTML = `<p>暂时无车辆数据（请检查 cars.json 是否已上传）</p>`;
  }
}

loadCars();
