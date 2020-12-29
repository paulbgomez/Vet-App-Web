/*
 ** @description Variables form HTML
 */
const form = document.getElementById('form-modal');
const mascotName = document.getElementById('name-animal-form');
const mascotOwner = document.getElementById('owner-animal-form');
const mascotType = document.getElementById('type-animal-form');
const mascotTreatment = document.getElementById('treatmentControlSelect');
const indexModal = document.getElementById('index-modal');
const submitBtn = document.getElementById('submit-btn');
const url = 'http://localhost:5000/mascots';

/*
 ** @description Immutable object that will not change
 */
let mascots = [];

window.onload = fetchBackend();
/*
 ** @description function to submit the form with data
 ** @returns a new array and calls the {function} paintMascots
 ** @params {e} to prevent the change of URL and auto-submit
 */
async function submitForm(e) {
  e.preventDefault();
  try {
    let data = {
      type: mascotType.value,
      name: mascotName.value,
      owner: mascotOwner.value,
      treatment: mascotTreatment.value,
    };
    let method = 'POST';
    let sentURL = url;
    const actionToPerform = submitBtn.innerHTML;
    if (actionToPerform === 'Save changes') {
      method = 'PUT';
      mascots[indexModal.value] = data;
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
          paintMascots();
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
 ** @description function to render the mascots on the DOM
 ** @returns and HTML filled with the data from the form
 */
function paintMascots() {
  const tableList = document.getElementById('mascots-table');
  let printMascots = mascots
    .map(
      (mascot, index) =>
        `<tr id="table-row-${index}">
            <th scope="row">${index}</th>
            <td>${mascot.type}</td>
            <td>${mascot.name}</td>
            <td>${mascot.owner}</td>
            <td>${mascot.treatment}</td>
            <td>
              <button id="edit-button" type="button" class="btn btn-info edit" data-index=${index} data-toggle="modal"
                data-target="#modal">
                <i class="far fa-edit"></i>
              </button>
              <button id="delete-button" type="button" class="btn btn-danger delete" data-index=${index} >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>`
    )
    .join('');
  tableList.innerHTML = printMascots;

  Array.from(document.getElementsByClassName('btn btn-info edit')).forEach(
    (btnEdit, index) => (btnEdit.onclick = edit(index))
  );

  Array.from(document.getElementsByClassName('btn btn-danger delete')).forEach(
    (btnDelete, index) => (btnDelete.onclick = deleteData(index))
  );

  /*
   ** @description function to edit the mascots
   ** @returns the inside handler function so it will be execute when we click the edit button
   ** @params {i} the index assigned to the mascots on the HTML
   */

  function edit(i) {
    const handler = () => {
      submitBtn.innerHTML = 'Save changes';
      $('#modal').modal('toggle');
      mascotName.value = mascots[i].name;
      mascotOwner.value = mascots[i].owner;
      mascotType.value = mascots[i].type;
      mascotTreatment.value = mascots[i].treatment;
      indexModal.value = i;
    };
    return handler;
  }

  /*
   ** @description function to delete the mascots
   ** @params {i} the index assigned to the mascots on the HTML
   */
  function deleteData(i) {
    let sentURL = `${url}/${i}`;
    return async function handler() {
      try {
        const response = await fetch(sentURL, {
          method: 'DELETE',
        });
        const row = document.getElementById(`table-row-${i}`);
        row.remove();
        if (response.ok) {
          fetchBackend();
          paintMascots();
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
  mascotName.value = '';
  mascotOwner.value = '';
  mascotType.value = '';
  mascotTreatment.value = '';
  submitBtn.innerHTML = 'Save';
}

async function fetchBackend() {
  try {
    const fetchMascots = await fetch(url).then((response) => response.json());
    const backendMascots = fetchMascots;
    if (Array.isArray(backendMascots)) {
      mascots = backendMascots;
      paintMascots();
    }
  } catch (error) {
    console.log({ error });
    $('.alert').show();
  }
}

form.onsubmit = submitForm;
