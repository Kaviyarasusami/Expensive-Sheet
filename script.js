document.getElementById('trackerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.getElementById('Description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!description || isNaN(amount)) {
        alert('Please provide a valid description and amount.');
        return;
    }

    // Create a new entry
    const entry = {
        id: Date.now(),
        description,
        amount,
        type
    };

    addEntryToList(entry);
    updateTotal(amount, type);
    document.getElementById('trackerForm').reset();
});

let total = 0;

function addEntryToList(entry) {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', entry.id);
    listItem.innerHTML = `${entry.description}: $${entry.amount.toFixed(2)} (${entry.type}) 
        <button onclick="editEntry(${entry.id})">Edit</button>
        <button onclick="deleteEntry(${entry.id})">Delete</button>`;
    document.getElementById('entrYlist').appendChild(listItem);
}

function updateTotal(amount, type) {
    if (type === 'Income') {
        total += amount;
    } else {
        total -= amount;
    }
    document.getElementById('total').textContent = total.toFixed(2);
}

function editEntry(id) {
    const listItem = document.querySelector(`li[data-id='${id}']`);
    const [description, amountAndType] = listItem.firstChild.nodeValue.split(': ');
    const [amount, type] = amountAndType.match(/\$(\d+.\d+)\s\((\w+)\)/).slice(1);

    document.getElementById('Description').value = description.trim();
    document.getElementById('amount').value = amount;
    document.getElementById('type').value = type;

    // Remove entry from the total
    const amountValue = parseFloat(amount);
    const typeValue = type === 'Income' ? 'Expense' : 'Income';
    updateTotal(amountValue, typeValue);

    listItem.remove();
}

function deleteEntry(id) {
    const listItem = document.querySelector(`li[data-id='${id}']`);
    const [description, amountAndType] = listItem.firstChild.nodeValue.split(': ');
    const amount = parseFloat(amountAndType.match(/\$(\d+.\d+)/)[1]);
    const type = amountAndType.includes('Income') ? 'Income' : 'Expense';

    // Remove the entry from the total
    updateTotal(amount, type);
    listItem.remove();
}
