/*
 ** @description Variables form HTML
 */
const form = document.getElementById('form-modal');
const doctorName = document.getElementById('name-doctor-form');
const doctorID = document.getElementById('id-doctor-form');
const doctorSpecialty = document.getElementById('specialty-doctor-form');
const indexModal = document.getElementById('index-modal');
const submitBtn = document.getElementById('submit-btn');
const url = 'https://vet-app-backend.vercel.app/doctors';

/*
 ** @description Immutable object that will not change
 */
let doctors = [];

/*
 ** @description Initialize the fetching of the backend and display it
 */
window.onload = fetchBackend();

/*
 ** @description async function to submit the form with data and POST it.
 ** In case we edit, the method PUT will be called.
 ** @returns the backend information and paint it in the HTML
 ** @params {e} to prevent the change of URL and auto-submit
 */
async function submitForm(e) {
  e.preventDefault();
  try {
    let data = {
      name: doctorName.value,
      id: doctorID.value,
      specialty: doctorSpecialty.value,
    };
    let method = 'POST';
    let sentURL = url;
    const actionToPerform = submitBtn.innerHTML;
    if (actionToPerform === 'Save changes') {
      method = 'PUT';
      doctors[indexModal.value] = data;
      sentURL = `${url}/${indexModal.value}`;
      $('#modal').modal('hide');
    }
    const response = await fetch(sentURL, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      (async function asyncPaintMascots() {
        try {
          await fetchBackend();
          paintDoctors();
          resetModal();
          $('#modal').modal('hide');
        } catch (error) {
          console.log({ error });
          $('.alert').show();
        }
      })();
    }
  } catch (error) {
    console.log({ error });
    $('.alert').show();
  }
}

/*
 ** @description function to render the doctors on the DOM
 ** @returns and HTML filled with the data from the form
 */
function paintDoctors() {
  const tableList = document.getElementById('doctors-table');
  let printdoctors = doctors
    .map(
      (doctor, index) =>
        `<tr id="table-row-${index}">
            <th scope="row">${index}</th>
            <td>${doctor.specialty}</td>
            <td>${doctor.name}</td>
            <td>${doctor.id}</td>
            <td>
              <button id="edit-button" specialty="button" class="btn btn-info edit" data-index=${index} data-toggle="modal"
                data-target="#modal">
                <i class="far fa-edit"></i>
              </button>
              <button id="delete-button" specialty="button" class="btn btn-danger delete" data-index=${index} >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>`
    )
    .join('');
  tableList.innerHTML = printdoctors;

  Array.from(document.getElementsByClassName('btn btn-info edit')).forEach(
    (btnEdit, index) => (btnEdit.onclick = edit(index))
  );

  Array.from(document.getElementsByClassName('btn btn-danger delete')).forEach(
    (btnDelete, index) => (btnDelete.onclick = deleteData(index))
  );

  /*
   ** @description function to edit the doctors
   ** @returns the inside handler function so it will be execute when we click the edit button
   ** @params {i} the index assigned to the doctors on the HTML
   */

  function edit(i) {
    const handler = () => {
      submitBtn.innerHTML = 'Save changes';
      $('#modal').modal('toggle');
      doctorName.value = doctors[i].name;
      doctorID.value = doctors[i].id;
      doctorSpecialty.value = doctors[i].specialty;
      indexModal.value = i;
    };
    return handler;
  }

  /*
   ** @description function to delete the doctors
   ** @params {i} the index assigned to the doctors on the HTML
   */
  function deleteData(i) {
    const row = document.getElementById(`table-row-${i}`);
    let sentURL = `${url}/${i}`;
    return async function handler() {
      try {
        const response = await fetch(sentURL, {
          method: 'DELETE',
        });
        if (response.ok) {
          (async function displayActualDoctors() {
            try {
              await fetchBackend();
              row.remove();
              paintDoctors();
            } catch (error) {
              console.log({ error });
              $('.alert').show();
            }
          })();
        }
      } catch (error) {
        console.log({ error });
        $('.alert').show();
      }
    };
  }
}

/*
 ** @description function to reset the modal form
 ** @returns set the modal to '' values
 */
function resetModal() {
  doctorName.value = '';
  doctorID.value = '';
  doctorSpecialty.value = '';
  submitBtn.innerHTML = 'Save';
}

async function fetchBackend() {
  try {
    const fetchDoctors = await fetch(url).then((response) => response.json());
    const backendDoctors = fetchDoctors;
    if (Array.isArray(backendDoctors)) {
      doctors = backendDoctors;
      paintDoctors();
    }
  } catch (error) {
    console.log({ error });
    $('.alert').show();
  }
}

form.onsubmit = submitForm;
