/*
 ** @description Variables form HTML
 */
const form = document.getElementById('form-modal');
const indexModal = document.getElementById('index-modal');
const submitBtn = document.getElementById('submit-btn');
const diagnostic = document.getElementById('text-area-diagnostic');
const mascot = document.getElementById('mascot');
const doctor = document.getElementById('doctor');
const url = 'https://vet-app-backend.vercel.app/';

let consults = [];
let mascots = [];
let doctors = [];

/*
 ** @description async function to submit the form with data and POST it.
 ** In case we edit, the method PUT will be called.
 ** @returns the backend information and paint it in the HTML
 ** @params {e} to prevent the change of URL and auto-submit
 */
async function submitForm(e) {
  e.preventDefault();
  const entity = 'consults';
  try {
    let data = {
      mascot: mascot.value,
      doctor: doctor.value,
      diagnostic: diagnostic.value,
    };
    let method = 'POST';
    let sentURL = `${url}/${entity}`;
    const actionToPerform = submitBtn.innerHTML;
    if (actionToPerform === 'Save changes') {
      method = 'PUT';
      consults[indexModal.value] = data;
      sentURL = `${url}/${indexModal.value}`;
      $('#modal').modal('hide');
      console.log(data);
    }
    const response = await fetch(sentURL, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      paintConsults();
      resetModal();
      $('#modal').modal('hide');
    }
  } catch (error) {
    console.log({ error });
    $('.alert-danger').show();
  }
}

/*
 ** @description function to render the consults on the DOM
 ** @returns and HTML filled with the data
 */
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

    /*
     ** @description function to edit the consults
     ** @returns the inside handler function so it will be execute when we click the edit button
     ** @params {i} the index assigned to the doctors on the HTML
     */
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
    console.log({ error });
    $('.alert-danger').show();
  }
}

async function listMascots() {
  const entity = 'mascots';
  try {
    const answer = await fetch(`${url}/${entity}`).then((response) =>
      response.json()
    );
    const fetchedMascots = answer;
    if (Array.isArray(fetchedMascots)) {
      mascots = fetchedMascots;
    }
    if (answer) {
      mascots.forEach((_mascot, index) => {
        const actualOption = document.createElement('option');
        actualOption.innerHTML = _mascot.name;
        actualOption.value = index;
        mascot.appendChild(actualOption);
      });
    }
  } catch (error) {
    console.log({ error });
    $('.alert-danger').show();
  }
}

async function listDoctors() {
  const entity = 'doctors';
  try {
    const response = await fetch(`${url}/${entity}`).then((response) =>
      response.json()
    );
    const fetchedDoctors = response;
    if (Array.isArray(fetchedDoctors)) {
      doctors = fetchedDoctors;
    }
    if (response) {
      doctors.forEach((_doctor, index) => {
        const actualOption = document.createElement('option');
        actualOption.innerHTML = _doctor.name;
        actualOption.value = index;
        doctor.appendChild(actualOption);
      });
    }
  } catch (error) {
    console.log({ error });
    $('.alert-danger').show();
  }
}

/*
 ** @description function to reset the modal form
 ** @returns set the modal to '' values
 */

function resetModal() {
  mascot.value = '';
  doctor.value = '';
  diagnostic.value = '';
  submitBtn.innerHTML = 'Save';
}

form.onsubmit = submitForm;

paintConsults();
listDoctors();
listMascots();
