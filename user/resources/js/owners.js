/*
 ** @description Variables form HTML
 */
const form = document.getElementById('form-modal');
const ownerName = document.getElementById('name-owner-form');
const ownerEmail = document.getElementById('email-owner-form');
const ownerPhone = document.getElementById('phone-owner-form');
const countryCode = document.getElementById('country-code');
const indexModal = document.getElementById('index-modal');
const submitBtn = document.getElementById('submit-btn');

/*
 ** @description Immutable object that will not change
 */
let owners = [];

/*
 ** @description function to submit the form with data
 ** @returns a new array and calls the {function} paintowners
 ** @params {e} to prevent the change of URL and auto-submit
 */
function submitForm(e) {
  e.preventDefault();
  let data = {
    name: ownerName.value,
    email: ownerEmail.value,
    countryCode: '+' + countryCode.value,
    phone: ownerPhone.value,
  };
  const actionToPerform = submitBtn.innerHTML;
  switch (actionToPerform) {
    case 'Save changes':
      owners[indexModal.value] = data;
      $('#modal').modal('hide');
      break;
    default:
      owners.push(data);
      $('#modal').modal('hide');
      break;
  }
  paintowners();
  resetModal();
}

/*
 ** @description function to render the owners on the DOM
 ** @returns and HTML filled with the data from the form
 */
function paintowners() {
  const tableList = document.getElementById('owners-table');
  let printowners = owners
    .map(
      (owner, index) =>
        `<tr id="table-row-${index}">
            <th scope="row">${index}</th>
            <td>${owner.name}</td>
            <td>${owner.email}</td>
            <td>${owner.countryCode}</td>
            <td>${owner.phone}</td>
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
  tableList.innerHTML = printowners;

  Array.from(document.getElementsByClassName('btn btn-info edit')).forEach(
    (btnEdit, index) => (btnEdit.onclick = edit(index))
  );

  Array.from(document.getElementsByClassName('btn btn-danger delete')).forEach(
    (btnDelete, index) => (btnDelete.onclick = deleteData(index))
  );

  /*
   ** @description function to edit the owners
   ** @returns the inside handler function so it will be execute when we click the edit button
   ** @params {i} the index assigned to the owners on the HTML
   */

  function edit(i) {
    const handler = () => {
      submitBtn.innerHTML = 'Save changes';
      $('#modal').modal('toggle');
      ownerName.value = owners[i].name;
      ownerEmail.value = owners[i].email;
      countryCode.value = owners[i].countryCode;
      ownerPhone.value = owners[i].phone;
      indexModal.value = i;
    };
    return handler;
  }

  /*
   ** @description function to delete the owners
   ** @params {i} the index assigned to the owners on the HTML
   */
  function deleteData(i) {
    const handler = () => {
      owners = owners.filter((_, ownerIndex) => ownerIndex !== i);
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
  ownerName.value = '';
  ownerEmail.value = '';
  ownerPhone.value = '';
  submitBtn.innerHTML = 'Save';
}

form.onsubmit = submitForm;
