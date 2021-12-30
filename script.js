let cafes = [];
let places = [];
const searchInput = document.querySelector('#searchInput');
const tableBody = document.querySelector('#tableBody');

async function searchCafe() {
  const response = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json',
    {
      method: 'Get',
    }
  );
  const responseText = await response.json();
  cafes = responseText.cafes;
}
async function searchPlace() {
  const response = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json',
    {
      method: 'Get',
    }
  );
  const responseText = await response.json();
  places = responseText.places;
}

async function initialLoad() {
  await searchCafe();
  await searchPlace();
  searchInput.value = '';
  const initialResult = [];
  cafes.forEach((cafe) => {
    places.forEach((place) => {
      if (cafe.location_id === place.id) {
        initialResult.push({
          ...cafe,
          ...place,
        });
      }
    });
  });
  display(initialResult);
}

function filterList() {
  const searchItem = searchInput.value.toLowerCase();
  const filterNames = cafes.filter((cafe) => {
    const name = cafe.name.toLowerCase();
    if (name.includes(searchItem)) {
      return true;
    }
    return false;
  });
  const finalResult = [];
  filterNames.forEach((cafe) => {
    places.forEach((place) => {
      if (cafe.location_id === place.id) {
        finalResult.push({
          ...cafe,
          ...place,
        });
      }
    });
  });
  display(finalResult);
}

function display(cafeList) {
  let html = '';
  let slNo = 1;
  cafeList.forEach((cafe) => {
    html += `<tr>
    <td class="column1">${slNo}</td>
    <td class="column2">${cafe.name}</td>
    <td class="column3">${cafe.locality}</td>
    <td class="column4">${cafe.postal_code}</td>
    <td class="column5">${cafe.lat}</td>
    <td class="column6">${cafe.long}</td>
  </tr>`;
    slNo++;
  });
  tableBody.innerHTML = html;
}

window.onload = initialLoad();
