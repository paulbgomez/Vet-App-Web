/*
 ** @description Variables form HTML
 */
const form = document.getElementById('form-modal');
const doctorName = document.getElementById('name-doctor-form');
const doctorID = document.getElementById('id-doctor-form');
const doctorSpecialty = document.getElementById('specialty-doctor-form');
const indexModal = document.getElementById('index-modal');
const submitBtn = document.getElementById('submit-btn');

/*
 ** @description Immutable object that will not change
 */
let doctors = [];

/*
 ** @description function to submit the form with data
 ** @returns a new array and calls the {function} paintdoctors
 ** @params {e} to prevent the change of URL and auto-submit
 */
function submitForm(e) {
  e.preventDefault();
  let data = {
    specialty: doctorSpecialty.value,
    name: doctorName.value,
    id: doctorID.value,
  };
  const actionToPerform = submitBtn.innerHTML;
  switch (actionToPerform) {
    case 'Save changes':
      doctors[indexModal.value] = data;
      $('#modal').modal('hide');
      break;
    default:
      doctors.push(data);
      $('#modal').modal('hide');
      break;
  }
  paintdoctors();
  resetModal();
}

/*
 ** @description function to render the doctors on the DOM
 ** @returns and HTML filled with the data from the form
 */
function paintdoctors() {
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
              <button id="delete-button" specialty="button" class="btn btn-danger delete" data-index=${index} onclick="deleteRow()">
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
    const handler = () => {
      doctors = doctors.filter((_, doctorIndex) => doctorIndex !== i);
      deleteRow();
    };
    function deleteRow() {
      const row = document.getElementById(`table-row-${i}`);
      row.remove();
    }
    return handler;
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

form.onsubmit = submitForm;
