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
const url = 'https://vet-app-backend.vercel.app//owners';

/*
 ** @description Immutable object that will not change
 */
let owners = [];

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
      name: ownerName.value,
      email: ownerEmail.value,
      countryCode: '+' + countryCode.value,
      phone: ownerPhone.value,
    };
    let method = 'POST';
    let sentURL = url;
    const actionToPerform = submitBtn.innerHTML;
    if (actionToPerform === 'Save changes') {
      method = 'PUT';
      owners[indexModal.value] = data;
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
          paintOwners();
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
 ** @description function to render the owners on the DOM
 ** @returns and HTML filled with the data from the form
 */
function paintOwners() {
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
              <button id="delete-button" specialty="button" class="btn btn-danger delete" data-index=${index} >
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
              paintOwners();
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
  ownerName.value = '';
  ownerEmail.value = '';
  ownerPhone.value = '';
  submitBtn.innerHTML = 'Save';
}

async function fetchBackend() {
  try {
    const fetchOwners = await fetch(url).then((response) => response.json());
    const backendOwners = fetchOwners;
    if (Array.isArray(backendOwners)) {
      owners = backendOwners;
      paintOwners();
    }
  } catch (error) {
    console.log({ error });
    $('.alert').show();
  }
}

form.onsubmit = submitForm;
