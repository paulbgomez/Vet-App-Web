/*
 ** @description Variables form HTML
 */
const form = document.getElementById('form-modal');
const indexModal = document.getElementById('index-modal');
const submitBtn = document.getElementById('submit-btn');
const url = 'http://localhost:5000';

let consults = [];
let mascots = [];
let doctors = [];

async function paintConsults() {
  const entity = 'consults';
  const tableConsults = document.getElementById('consults-table');
  try {
    const response = await fetch(`${url}/${entity}`).then((response) =>
      response.json()
    );
    const fetchedConsults = response;
    if (Array.isArray(fetchedConsults)) {
      consults = fetchedConsults;
    }
    if (response) {
      console.log(consults);
      const printConsults = consults
        .map(
          (consult, index) =>
            `<tr id="table-row-${index}">
            <th scope="row">${index}</th>
            <td>${consult.mascot.name}</td>
            <td>${consult.doctor.name}</td>
            <td>${consult.creationDate}</td>
            <td>${consult.editionDate}</td>
            <td>${consult.diagnostic}</td>
            <td>
              <button id="edit-button" specialty="button" class="btn btn-info edit" data-index=${index} data-toggle="modal"
                data-target="#modal">
                <i class="far fa-edit"></i>
              </button>
            </td>
          </tr>`
        )
        .join('');
      tableConsults.innerHTML = printConsults;
    }

    Array.from(document.getElementsByClassName('btn btn-info edit')).forEach(
      (btnEdit, index) => (btnEdit.onclick = edit(index))
    );

    function edit(i) {
      const handler = () => {
        submitBtn.innerHTML = 'Save changes';
        $('#modal').modal('toggle');
        const consult = consults[i];
        indexModal.value = i;
        mascot.value = consult.mascot.id;
        doctor.value = consult.doctor.id;
        diagnostic.value = consult.diagnostic;
      };
      return handler;
    }
  } catch (error) {
    throw error;
  }
}

async function listMascots() {
  const optionMascot = document.getElementById('mascot');
  const entity = 'mascots';
  try {
    const answer = await fetch(`${url}/${entity}`).then((response) =>
      response.json()
    );
    const fetchedMascots = answer;
    if (Array.isArray(fetchedMascots)) {
      mascots = fetchedMascots;
      console.log(mascots);
    }
    if (answer) {
      mascots.forEach((_mascot, index) => {
        const actualOption = document.createElement('option');
        actualOption.innerHTML = _mascot.name;
        actualOption.value = index;
        optionMascot.appendChild(actualOption);
      });
    }
  } catch (error) {
    throw error;
  }
}

async function listDoctors() {
  const optionDoctor = document.getElementById('doctor');
  const entity = 'doctors';
  try {
    const response = await fetch(`${url}/${entity}`).then((response) =>
      response.json()
    );
    const fetchedDoctors = response;
    if (Array.isArray(fetchedDoctors)) {
      doctors = fetchedDoctors;
      console.log(doctors);
    }
    if (response) {
      doctors.forEach((_doctor, index) => {
        const actualOption = document.createElement('option');
        actualOption.innerHTML = _doctor.name;
        actualOption.value = index;
        optionDoctor.appendChild(actualOption);
      });
    }
  } catch (error) {
    throw error;
  }
}

listDoctors();
listMascots();
paintConsults();
