
function deleteId() {
  const id = document.getElementById("item-delete-id").value;
  const area = document.getElementById("delete-result-area");

  fetch(`http://localhost:8099/items/${id}`, {
    method: "DELETE"
  })  
  .then(response => response.json())
  .then(item => {
    console.info(`${JSON.stringify(item)}`);
    area.value = JSON.stringify(item);
  });

}

function searchId() {
  const id =  document.getElementById("item-search-id").value;
  const area = document.getElementById("search-result-area");

  fetch(`http://localhost:8099/items/${id}`, {
    method: "GET"
  })
  .then(response => response.json())
  .then(item => {
    console.info(`${JSON.stringify(item)}`);
    area.value = JSON.stringify(item);
  });
}

function insertValues() {
  const id =  document.getElementById("item-add-id").value;
  const value =  document.getElementById("item-add-value").value;

  fetch(`http://localhost:8099/items/${id}`,
    {
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(JSON.parse(value))
    });
}

function getValues() {
  fetch("http://localhost:8099/items/all")
    .then(response => response.json())
    .then(items => {
      const contentDiv = document.getElementById("item-content");
      if(items.length > 0) {
        const newItems = document.createElement('ul');
        for(const item of items) {
          const itemToAppend = document.createElement('li');
          itemToAppend.innerHTML = `Id:${item.id} => Value:${JSON.stringify(item.value)}`;
          newItems.appendChild(itemToAppend);
        }

        contentDiv.replaceChildren(newItems);
      }
      else {
        contentDiv.replaceChildren("No elements to display.")
      }
    })
}
