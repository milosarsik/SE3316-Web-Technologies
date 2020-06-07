var currentLanguage = "en";

// All the items that are currently available at the beginning of the program
var itemShelf = {
    inSearchOfLostTime: {
        id: "inSearchOfLostTime",
        seString: "У потрази за изгубљеним временом Марцел Проуст",
        enString: "In Search Of Lost Time by Marcel Proust",
        dueDate: 30,
    },
    ulysses: {
        id: "ulysses",
        seString: "Улиссес Јамес Јоице-а",
        enString: "Ulysses by James Joyce",
        dueDate: 30,
    },
    donQuixote: {
        id: "donQuixote",
        seString: "Дон Кихот Мигуела де Цервантеса",
        enString: "Don Quixote by Miguel de Cervantes",
        dueDate: 30,
    },
    theGreatGatsby: {
        id: "theGreatGatsby",
        seString: "Велики Гатсби Ф. Сцотта Фитзгералда",
        enString: "The Great Gatsby by F. Scott Fitzgerald",
        dueDate: 30,
    },
    mobyDick: {
        id: "mobyDick",
        seString: "Моби Дицк Херман Мелвилле",
        enString: "Moby Dick by Herman Melville",
        dueDate: 30,
    },
    oneHundredYearsOfSolitude: {
        id: "oneHundredYearsOfSolitude",
        seString: "Сто година самоће Габриел Гарциа Маркуез",
        enString: "One Hundred Years Of Solitude by Gabriel Garcia Marquez",
        dueDate: 30,
    },
    warAndPeace: {
        id: "warAndPeace",
        seString: "Рат и мир Леа Толстоја",
        enString: "War and Peace by Leo Tolstoy",
        dueDate: 30,
    },
    hamlet: {
        id: "hamlet",
        seString: "Хамлет Виллиам Схакеспеаре",
        enString: "Hamlet by William Shakespeare",
        dueDate: 30,
    },
    lolita: {
        id: "lolita",
        seString: "Лолита Владимира Набокова",
        enString: "Lolita by Vladimir Nabokov",
        dueDate: 30,
    },
    theOdyssey: {
        id: "theOdyssey",
        seString: "Хомерова одисеја",
        enString: "The Odyssey by Homer",
        dueDate: 30,
    },
    ledZeppelinIV: {
        id: "ledZeppelinIV",
        seString: "Лед Зеппелин ИВ Лед Зеппелин",
        enString: "Led Zeppelin IV by Led Zeppelin",
        dueDate: 10,
    },
    nevermind: {
        id: "nevermind",
        seString: "Нирвана нема везе",
        enString: "Nevermind by Nirvana",
        dueDate: 10,
    },
    backInBlack: {
        id: "backInBlack",
        seString: "Назад у црно АЦ / ДЦ",
        enString: "Back In Black by AC/DC",
        dueDate: 10,
    }
};

// Function to limit the amount of characters that the user can enter
function maxChars(string) {
    var max = 100;

    // Checking for chars that can be used for injection attacks and removing them
    if (string.value[string.value.length - 1] == '}' || string.value[string.value.length - 1] == '{' || string.value[string.value.length - 1] == '<' || string.value[string.value.length - 1] == '>') {
        string.value = string.value.substr(0, string.value.length - 1);
    }

    if (string.value.length > max) {
        string.value = string.value.substr(0, max);
    }
}

// Function to check if the user is an admin
function isAdmin(name, dob) {
    return name == "admin" && dob == 1867;
}

// Function to replace all the labels and text boxes with the user
function replaceContent() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var dob = document.getElementById("birth-year").value;
    var maturity;

    // If statements to check if the fields are empty 
    if (name.length == 0) {
        alert("Name is empty!");
        return;
    }
    else if (email.length == 0) {
        alert("Email is empty!");
        return;
    }
    else if (dob.length == 0) {
        alert("Year of birth is empty!");
        return;
    }
    else { }

    // If statement to check if the email provided is valid
    if (/\S+@\S+\.\S+/.test(email)) { }
    else {
        alert("Invalid email!");
        return;
    }

    // If statement that sets the admin and regular user maturity, also checks if year of birth is valid
    if (isAdmin(name, dob)) {
        maturity = "Adult";
        alert("You are logging in as admin!");

    }
    else if (dob >= 1900 && dob <= 2019) {
        if ((2019 - dob) > 18) {
            maturity = "Adult";
        }
        else {
            maturity = "Child";
        }

    }
    else {
        alert("Invalid year of birth!");
        return;
    }

    // Removing all the labels and inputs and replacing them with the user information in specified format
    var parent = document.getElementById("loginForm");

    parent.removeChild(document.getElementById("name"));
    parent.removeChild(document.getElementById("nameLabel"));
    parent.removeChild(document.getElementById("email"));
    parent.removeChild(document.getElementById("emailLabel"));
    parent.removeChild(document.getElementById("birth-year"));
    parent.removeChild(document.getElementById("birthYearLabel"));
    parent.removeChild(document.getElementById("formButton"));

    var text = document.createElement("p");
    text.id = "userinformation";
    var node = document.createTextNode(name + " (" + email + ") " + "[" + maturity + "]");
    text.appendChild(node);

    parent.appendChild(text);

    // Checking if user is admin so that we can add all the new functionalty
    if (isAdmin(name, dob)) {
        div = document.getElementById("newitemdiv");

        // Creating Add New Item button
        var btn = document.createElement("BUTTON");
        btn.id = "addNewItem";
        btn.setAttribute("onClick", "javascript: addNewItem();")
        btn.innerHTML = "Add New Item";

        div.appendChild(btn);

        // Removing the add buttons
        for (item in itemShelf) {
            var temp = document.getElementById(item + "List");
            temp.removeChild(document.getElementById(item));
        }

        // Creating a button that the admin can click to log out
        var logoutLink = document.getElementById("userinformation");
        var btn = document.createElement("BUTTON");
        btn.id = "adminlogoutbutton";
        btn.setAttribute("onClick", "javascript: adminLogout();")
        btn.innerHTML = "Logout";

        logoutLink.appendChild(btn);

        // Iterating through each item and adding the new buttons for admin functionality 
        for (item in itemShelf) {
            var checking = document.getElementById(item + "List");

            // If it isn't "undefined" and it isn't "null", then it exists.
            if (typeof (checking) != 'undefined' && checking != null) {
                // Creating a button to remove existing items
                var btn = document.createElement("BUTTON");
                btn.id = item;
                btn.className = item + "AdminRemove";
                btn.setAttribute("onClick", "javascript: adminRemove(this.id);");
                btn.innerHTML = "Remove";

                checking.appendChild(btn);

                // Creating a button to change the due date
                var btn = document.createElement("BUTTON");
                btn.id = item;
                btn.className = item + "AdminChangeDueDate";
                btn.setAttribute("onClick", "javascript: adminChangeDueDate(this.id);");
                btn.innerHTML = "Change Due Date";

                checking.appendChild(btn);
            }
            else {
                continue;
            }
        }
    }
}

// Function to add an item to the checkout 
function addItem(itemID) {
    var date = new Date();

    var numberOfDaysToAdd = itemShelf[itemID].dueDate;

    date.setDate(date.getDate() + numberOfDaysToAdd);

    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var y = date.getFullYear();
    var someFormattedDate = dd + '/' + mm + '/' + y;

    var basket = document.getElementById("basket");

    var list = document.createElement("li");
    list.id = itemID + "Checkout";

    var text = document.createElement("p");
    var dateNode = document.createElement("p");

    var node = document.createTextNode(itemShelf[itemID].enString);
    var dateNodeAdd = document.createTextNode("Due date: " + someFormattedDate);

    text.appendChild(node);
    dateNode.appendChild(dateNodeAdd);

    list.appendChild(text);
    list.appendChild(dateNode);

    // Creating a remove button to remove the item from the checkout
    var btn = document.createElement("BUTTON");
    btn.id = itemID;
    btn.setAttribute("onClick", "javascript: removeItem(this.id);")
    btn.innerHTML = "Remove";

    list.appendChild(btn);

    basket.appendChild(list);

    // Removing the item from the available items list
    var parent = document.getElementById("available-items");
    parent.removeChild(document.getElementById(itemID + "List"));
}

// Changing the language to English 
function englishLanguage() {
    currentLanguage = "en";

    for (item in itemShelf) {
        var checking = document.getElementById(item + "String");

        // If it isn't "undefined" and it isn't "null", then it exists.
        if (typeof (checking) != 'undefined' && checking != null) {
            checking.innerHTML = itemShelf[item].enString;
        } else {
            continue;
        }
    }
}

// Changing the language to Serbian
function serbianLanguage() {
    currentLanguage = "se";

    for (item in itemShelf) {
        var checking = document.getElementById(item + "String");

        // If it isn't "undefined" and it isn't "null", then it exists.
        if (typeof (checking) != 'undefined' && checking != null) {
            checking.innerHTML = itemShelf[item].seString;
        } else {
            continue;
        }
    }

    // for (items in itemShelf) {
    //     document.getElementById(items + "String").innerHTML = itemShelf[items].seString;
    // }
}

// Function to remove the item from the checkout and add it back to the available items
function removeItem(itemID) {
    // Creating a new list node
    var list = document.createElement("li");
    list.id = itemID + "List";

    var header = document.createElement("h3");
    header.id = itemID + "String";

    // Checking the current language to return the item properly
    if (currentLanguage == "en") {
        header.innerHTML = itemShelf[itemID].enString;
    }
    else {
        header.innerHTML = itemShelf[itemID].seString;
    }

    // Creating an image tag
    var image = document.createElement("IMG");
    image.src = "images/" + itemID.toLowerCase() + ".jpg";
    image.alt = itemShelf[itemID].enString;

    // Checking the due date to see what the size of the image is, either book size or cd size
    if (itemShelf[itemID].dueDate == 30) {
        image.height = "160";
        image.width = "100";
    }
    else {
        image.height = "160";
        image.width = "160";
    }

    var text = document.createElement("p");
    text.id = itemID + "Due";
    var textNode = document.createTextNode("Due in " + itemShelf[itemID].dueDate + " days");
    text.appendChild(textNode);

    // Creating an add button to attach to the list node again because the item is now available
    var btn = document.createElement("BUTTON");
    btn.id = itemID;
    btn.setAttribute("onClick", "javascript: addItem(this.id);")
    btn.innerHTML = "Add";

    list.appendChild(header);
    list.appendChild(image);
    list.appendChild(text);
    list.appendChild(btn);

    var parentNode = document.getElementById("available-items");

    parentNode.appendChild(list);

    parentNode = document.getElementById("basket");
    parentNode.removeChild(document.getElementById(itemID + "Checkout"));
}

// Fucntion that will prompt the user, whether he wants to checkout or not
function checkout() {
    var numberOfItems = document.getElementById("basket").getElementsByTagName("li").length;

    var wantsToCheckout = confirm("Do you wish to checkout " + numberOfItems + " items?");

    if (wantsToCheckout) {
        for (item in itemShelf) {
            var checking = document.getElementById(item + "Checkout");

            // If it isn't "undefined" and it isn't "null", then it exists.
            if (typeof (checking) != 'undefined' && checking != null) {
                parent = checking.parentNode;
                parent.removeChild(document.getElementById(item + "Checkout"));
            } else {
                continue;
            }
        }
    }
    else {
        for (item in itemShelf) {
            var checking = document.getElementById(item + "Checkout");

            // If it isn't "undefined" and it isn't "null", then it exists.
            if (typeof (checking) != 'undefined' && checking != null) {
                parent = checking.parentNode;
                parent.removeChild(document.getElementById(item + "Checkout"));

                rebuild(item);
            } else {
                continue;
            }
        }
    }
}

// Function that will rebuild a whole list object and add it to the available items list
function rebuild(item) {
    // Creating a new list node
    var list = document.createElement("li");
    list.id = item + "List";

    var header = document.createElement("h3");
    header.id = item + "String";

    if (currentLanguage == "en") {
        header.innerHTML = itemShelf[item].enString;
    }
    else {
        header.innerHTML = itemShelf[item].seString;
    }

    var image = document.createElement("IMG");
    image.src = "images/" + item.toLowerCase() + ".jpg";
    image.alt = itemShelf[item].enString;
    if (itemShelf[item].dueDate == 30) {
        image.height = "160";
        image.width = "100";
    }
    else {
        image.height = "160";
        image.width = "160";
    }

    var text = document.createElement("p");
    text.id = item + "Due";
    var textNode = document.createTextNode("Due in " + itemShelf[item].dueDate + " days");
    text.appendChild(textNode);

    var btn = document.createElement("BUTTON");
    btn.id = item;
    btn.setAttribute("onClick", "javascript: addItem(this.id);");
    btn.innerHTML = "Add";

    list.appendChild(header);
    list.appendChild(image);
    list.appendChild(text);
    list.appendChild(btn);

    var parentNode = document.getElementById("available-items");

    parentNode.appendChild(list);
}

// Admin function to create a new item and add it to available list
function addNewItem() {
    var itemName = prompt("Please enter the name of the item: ", "");
    var itemNameTranslation = prompt("Please enter the name of the item in the second language: ", "");
    var author = prompt("Please enter the name of the author: ", "");
    var daysDue = prompt("Please enter the number of days due: ", "0");
    var imageLink = prompt("Please enter the link to the image: ", "");

    // Formatting itemName
    itemName = camelize(itemName);

    var toDisplay = unCamelCase(itemName);

    author = unCamelCase(camelize(author));

    // Formatting itemNameTranslation
    itemNameTranslation = unCamelCase(camelize(itemNameTranslation));

    // Converting daysDue to a number
    daysDue = parseInt(daysDue, 10);

    var list = document.createElement("li");
    list.id = itemName + "List";

    var header = document.createElement("h3");
    header.innerHTML = toDisplay + " by " + author;
    header.id = itemName + "String";

    var image = document.createElement("IMG");
    image.src = imageLink;
    image.alt = toDisplay + " by " + author;

    if (daysDue == 30) {
        image.height = "160";
        image.width = "100";
    }
    else {
        image.height = "160";
        image.width = "160";
    }

    var text = document.createElement("p");
    text.id = itemName + "Due";
    var textNode = document.createTextNode("Due in " + daysDue + " days");
    text.appendChild(textNode);

    list.appendChild(header);
    list.appendChild(image);
    list.appendChild(text);

    // Creating the button to remove existing items because we are still in admin mode
    var btn = document.createElement("BUTTON");
    btn.id = itemName;
    btn.className = itemName + "AdminRemove";
    btn.setAttribute("onClick", "javascript: adminRemove(this.id);")
    btn.innerHTML = "Remove";
    list.appendChild(btn);

    // Creating the button to change the due date because we are still in admin mode
    var btn = document.createElement("BUTTON");
    btn.id = itemName;
    btn.className = itemName + "AdminChangeDueDate";
    btn.setAttribute("onClick", "javascript: adminChangeDueDate(this.id);")
    btn.innerHTML = "Change Due Date";
    list.appendChild(btn);

    var parentNode = document.getElementById("available-items");

    parentNode.appendChild(list);

    // Adding the new item to the itemShelf so that we can run regular functionality with it
    var o = {};
    o[itemName] = {
        id: itemName,
        seString: itemNameTranslation + " " + author,
        enString: toDisplay + " by " + author,
        dueDate: daysDue,
    };

    Object.assign(itemShelf, o);
}

// Admin function to remove an item from the available list
function adminRemove(itemID) {
    var parentNode = document.getElementById("available-items");
    parentNode.removeChild(document.getElementById(itemID + "List"));
}

// Admin function that will allow them to change the due date, this will alter the object in itemShelf
function adminChangeDueDate(itemID) {
    var numberOfDays = prompt("Please enter the amount of days this item is due in:", "0");

    itemShelf[itemID].dueDate = parseInt(numberOfDays, 10);

    var textNode = document.getElementById(itemID + "Due");
    textNode.innerHTML = "Due in " + numberOfDays + " Days";
}

// Admin function that will allow the admin to logout and return to regular user functionality
function adminLogout() {
    // Removing admin information
    var userDelete = document.getElementById("loginForm");
    userDelete.removeChild(document.getElementById("userinformation"));

    // Removing the Add New Item button
    var newItemDelete = document.getElementById("newitemdiv");
    newItemDelete.removeChild(document.getElementById("addNewItem"));

    // Creating add buttons on each item again
    for (item in itemShelf) {
        var checking = document.getElementById(item + "List");

        // If it isn't "undefined" and it isn't "null", then it exists.
        if (typeof (checking) != 'undefined' && checking != null) {
            var btn = document.createElement("BUTTON");
            btn.id = item;
            btn.setAttribute("onClick", "javascript: addItem(this.id);");
            btn.innerHTML = "Add";

            checking.appendChild(btn);
        } else {
            continue;
        }
    }

    // Removing the admin Remove buttons
    for (item in itemShelf) {
        var checking = document.getElementById(item + "List");

        //If it isn't "undefined" and it isn't "null", then it exists.
        if (typeof (checking) != 'undefined' && checking != null) {
            var temp = document.getElementsByClassName(item + "AdminRemove");
            checking.removeChild(temp[0]);
            temp = document.getElementsByClassName(item + "AdminChangeDueDate");
            checking.removeChild(temp[0]);
        } else {
            continue;
        }
    }

    // Rebuilding the whole login form
    var parent = document.getElementById("loginForm");

    var nameLabel = document.createElement("LABEL");
    nameLabel.htmlFor = "name";
    nameLabel.id = "nameLabel";
    nameLabel.innerHTML = "Name: ";
    var inputName = document.createElement("input");
    inputName.type = "text";
    inputName.id = "name";
    inputName.setAttribute("onkeydown", "javascript: maxChars(this);");
    inputName.setAttribute("opnkeyup", "javascript: maxChars(this);");

    parent.appendChild(nameLabel);
    parent.appendChild(inputName);

    var emailLabel = document.createElement("LABEL");
    emailLabel.htmlFor = "email";
    emailLabel.id = "emailLabel";
    emailLabel.innerHTML = "Email: ";
    var inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.id = "email";

    parent.appendChild(emailLabel);
    parent.appendChild(inputEmail);

    var birthLabel = document.createElement("LABEL");
    birthLabel.htmlFor = "birth-year";
    birthLabel.id = "birthYearLabel";
    birthLabel.innerHTML = "Year of birth: ";
    var inputBirth = document.createElement("input");
    inputBirth.type = "number";
    inputBirth.id = "birth-year";
    inputBirth.min = "1900"
    inputBirth.max = "2019"

    parent.appendChild(birthLabel);
    parent.appendChild(inputBirth);

    var button = document.createElement("BUTTON");
    button.innerHTML = "Submit";
    button.id = "formButton";
    button.setAttribute("onClick", "javascript: replaceContent();");

    parent.appendChild(button);
}

// Function to make the string a camel case for the use of tag id's
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

// Function to un camel case, so that we can go from id to a readable title that we can display
function unCamelCase(str) {
    return str
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        // uppercase the first character
        .replace(/^./, function (str) { return str.toUpperCase(); })
}