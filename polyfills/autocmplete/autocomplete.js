let el = document.getElementsByClassName('tags-input')[0];
let tags = [];
let jsonArr = [];
let inputtext = '';

let hiddenInput = document.getElementsByTagName('input')[1],
    mainInput = document.getElementsByTagName("input")[0],
    autocompleteEl = document.getElementById("autocomplete"),
    jsonViewEl = document.getElementById("json-view");



function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        inputtext = e.target.value
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;

        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        a.style.left = mainInput.getBoundingClientRect().x + 'px';

        /*append the DIV element as a child of the autocomplete container:*/
        // this.parentNode.appendChild(a);
        autocompleteEl.appendChild(a);
      
        for (i = 0; i < arr.length; i++) {
          
            let name = arr[i].name;
            if (name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = name;
                b.innerHTML += "<input type='hidden' value='" + name + "'>";
                b.setAttribute("data-ind", i);
                b.addEventListener("click", function (e) {
                    let val = this.getElementsByTagName("input")[0].value;
                    addTag(val, e.target.getAttribute("data-ind"));
                    mainInput.value = '';
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {

        let keyCode = e.which || e.keyCode;
        if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) { //backspace
            removeTag(tags.length - 1);
        }

        var x = document.getElementById("autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);

function checkDuplicate(arr, name) {

    if (arr.length === 0) {
        return false;
    }
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === name) {
                return true;
            }
        }
    }
    return false;

}
function addTag(text, ind) {
    let duplicateEl = checkDuplicate(jsonArr, countries[ind].name);
    if (duplicateEl) {
        alert("duplicate enteries are not allowed");
        return;
    }

    let tag = {
        text: text,
        element: document.createElement('span')
    };

    tag.element.classList.add('tag');
    tag.element.textContent = tag.text;

    let closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.addEventListener('click', function () {
        removeTag(tags.indexOf(tag));
    });
    tag.element.appendChild(closeBtn);
    tags.push(tag);
    el.insertBefore(tag.element, mainInput);
    jsonArr.push(countries[ind]);
    displayJson();

}

function removeTag(index) {
    let tag = tags[index];
    tags.splice(index, 1);
    el.removeChild(tag.element);
    jsonArr.splice(index, 1);
    displayJson();

}

function displayJson() {
    jsonViewEl.innerHTML = JSON.stringify(jsonArr);
}