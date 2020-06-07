function displayAll()
{
    var parent = document.getElementById("list");
   
    var request = new Request('http://54.173.143.16:8080/api/bears', {
    method: 'GET',
    headers: new Headers({
    'Content-Type': 'application/json'
    })
    });
    
    fetch(request).then(res =>  res.json())
			.then(response => parent.innerHTML = JSON.stringify(response))
			.catch(error => console.error('Error:', error));
}

setInterval(function(){
    displayAll()
}, 2000);

function createANewItem()
{
    var itemName = prompt("Please enter the item name: ", "");
    var itemType = prompt("Please enter the item type: ", "");
    var itemLoanPeriod = prompt("Please enter the loan period for the item: ", "");
    var itemQuantity = prompt("Please enter the quantity of the item: ", "");
    
    if(sanitize(itemName) && sanitize(itemType) && sanitize(itemLoanPeriod) && sanitize(itemQuantity))
    {}
    else
    {
        alert("Invalid input! Nice try!");
        return false;
    }
 
    var data = {
        name: itemName,
        type: itemType,
        loanPeriod: itemLoanPeriod,
        quantity: itemQuantity
    };

    var request = new Request('http://54.173.143.16:8080/api/bears', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
			})
		});
	
	fetch(request) .then(resp => {}).catch(err => {});
}

function updateQuantity()
{
    var itemID = prompt("Please enter the item ID: ", "");
    var itemQuantity = prompt("Please enter the new quantity of the item: ", "");
    
    if(sanitize(itemID) == true && sanitize(itemQuantity) == true)
    {}
    else
    {
        alert("Invalid input! Nice try!");
        return false;
    }
    
    var data = {
        quantity: itemQuantity
    };

    var request = new Request('http://54.173.143.16:8080/api/bears/' + itemID, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
			
			})
		});
	
	fetch(request) .then(resp => {}).catch(err => {});
}

function updateLoanPeriod()
{
    var itemID = prompt("Please enter the item ID: ", "");
    var itemLoanPeriod = prompt("Please enter the new loan period of the item: ", "");
    
    if(sanitize(itemID) == true && sanitize(itemLoanPeriod))
    {}
    else
    {
        alert("Invalid input! Nice try!");
        return false;
    }

    var data = {
        loanPeriod: itemLoanPeriod
    };

    var request = new Request('http://54.173.143.16:8080/api/bears/' + itemID, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
			})
		});
	
	fetch(request) .then(resp => {}).catch(err => {});
}

function deleteItem()
{
    var itemID = prompt("Please enter the item ID: ", "");
    
    if(sanitize(itemID) == true)
    {}
    else
    {
        alert("Invalid input! Nice try!");
        return false;
    }

    var request = new Request('http://54.173.143.16:8080/api/bears/' + itemID, {
		method: 'DELETE',
		headers: new Headers({
			'Content-Type': 'application/json'
			})
		});
	
	fetch(request) .then(resp => {}).catch(err => {});
}

function findItem()
{
    var itemID = prompt("Please enter the item ID you wish to find: ", "");
    
    if(sanitize(itemID) == true)
    {}
    else
    {
        alert("Invalid input! Nice try!");
        return false;
    }

    var parent = document.getElementById("specificItem");

    var request = new Request('http://54.173.143.16:8080/api/bears/' + itemID, {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json'
			})
		});
    
    fetch(request).then(res =>  res.json())
			.then(response => parent.innerHTML = JSON.stringify(response))
			.catch(error => console.error('Error:', error));		
	
}

function sanitize(string) {
    var max = 100;

    // Checking for chars that can be used for injection attacks and removing them
    if ((string.toString()).includes("{") || (string.toString()).includes("}") || (string.toString()).includes("<") || (string.toString()).includes(">") || (string.toString()).length >= max)
    {
        return false;
    }
    else{
        return true;
    }
}

