let mascots = [
  {
    type: '',
    name: '',
    owner: '',
  },
];

const form = document.getElementById('form-modal');

function listMascots() {
  const tableList = document.getElementById('mascots-table');
  let mascotsHTML = mascots
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
              <button type="button" class="btn btn-info">
                <i class="far fa-edit"></i>
              </button>
              <button type="button" class="btn btn-danger">
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>`
    )
    .join('');
  tableList.innerHTML = mascotsHTML;
}

function createMascot(e) {
  e.preventDefault();
  console.log(e);
}
