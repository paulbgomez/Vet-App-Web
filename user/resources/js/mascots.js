/*
 ** @description Variables form HTML
 */
const form = document.getElementById('form-modal');
const mascotName = document.getElementById('name-animal-form');
const mascotOwner = document.getElementById('owner-animal-form');
const mascotType = document.getElementById('type-animal-form');
const indexModal = document.getElementById('index-modal');
const submitBtn = document.getElementById('submit-btn');

/*
 ** @description Immutable object that will not change
 */
let mascots = [
  {
    type: '',
    name: '',
    owner: '',
    index: '',
  },
];

/*
 ** @description function to render the mascots on the DOM
 ** @returns and HTML filled with the data from the form
 */
function paintMascots() {
  const tableList = document.getElementById('mascots-table');
  let printMascots = mascots
    .map(
      (mascot, index) =>
        `<tr>
            <th scope="row">${index}</th>
            <td>${mascot.type}</td>
            <td>${mascot.name}</td>
            <td>${mascot.owner}</td>
            <td>
              <select class="form-control" id="treatmentControlSelect">
                <option>--</option>
                <option>Vaccination</option>
                <option>Minor surgery</option>
                <option>Castration</option>
                <option>Regular check</option>
                <option>Other</option>
              </select>
            </td>
            <td>
              <button type="button" class="btn btn-info edit" data-index=${index} data-toggle="modal"
                data-target="#modal">
                <i class="far fa-edit"></i>
              </button>
              <button type="button" class="btn btn-danger delete" data-index=${index}>
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
      indexModal.value = mascots[i];
    };
    return handler;
  }

  function deleteData(element) {
    const handler = () => console.log(element);
    return handler;
  }
}

/*
 ** @description function to submit the form with data
 ** @returns a new array and calls the {function} paintMascots
 ** @params {e} to prevent the change of URL and auto-submit
 */
function submitForm(e) {
  e.preventDefault();
  let data = {
    type: mascotType.value,
    name: mascotName.value,
    owner: mascotOwner.value,
  };
  const actionToPerform = submitBtn.innerHTML;
  switch (actionToPerform) {
    case 'Save changes':
      console.log(indexModal.value); //need to fix this
      break;
    default:
      mascots.push(data);
      break;
  }
  paintMascots();
}

form.onsubmit = submitForm;
