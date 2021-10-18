import { countries } from "./jsonData.js";
import { getTemplate } from "./components/list.js";

const getCountries = (text) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(
        countries.filter(
          ({ name }, index) =>
            name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
    }, 1000);
  });
};

const debounce = (fn, timeout) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = undefined;
      fn.apply(this, args);
    }, timeout);
  };
};

(async () => {
  let el = document.getElementsByClassName("tags-input")[0];
  const autocompleteList = document.querySelector(".autocomplete-items");
  let tags = [];
  let jsonArr = [];
  // let inputtext = "";

  let mainInput = document.querySelector("input"),
    autocompleteEl = document.getElementById("autocomplete"),
    jsonViewEl = document.getElementById("json-view");

  // const onDropDownClick = () => {};

  function initAutoComplete(inp, fetchData) {
    let currentFocus,
      data,
      selectedSet = {};
    const onInput = async function (e) {
      console.log("calling input");
      const inputText = e.target.value;
      var val = this.value;
      // closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      autocompleteList.innerHTML = "Loading";
      data = await fetchData(inputText);
      autocompleteList.innerHTML = await getTemplate({ data, text: inputText });
      // autocompleteList.querySelector("");
    };

    const onKeyDown = function (e) {
      let keyCode = e.which || e.keyCode;
      // backspace

      // if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
      //   removeTag(tags.length - 1);
      // }

      var x = document.getElementById("autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (keyCode === 40) {
        /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (keyCode === 38) {
        //up
        /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (keyCode === 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    };

    inp.addEventListener("input", debounce(onInput, 600));
    inp.addEventListener("click", (e) => {
      autocompleteList.classList.remove("d-none");
      e.stopPropagation();
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", onKeyDown);
    autocompleteList.addEventListener("click", (event) => {
      const {path} = event;
      let countryName;
      path.forEach(target => {
        if (target.className === 'country') {
          countryName = target.dataset.name;
        };
      });

      if (countryName) {
        selectedSet[countryName] = data.filter(c => c.name === countryName)[0];
      }
    });

    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      // x[currentFocus].focus();
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
      autocompleteList.classList.add("d-none");
      // for (var i = 0; i < autocompleteList.length; i++) {
      //   if (elmnt != autocompleteList[i] && elmnt != inp) {
      //     autocompleteList[i].parentNode.removeChild(autocompleteList[i]);
      //   }
      // }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

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
      element: document.createElement("span")
    };

    tag.element.classList.add("tag");
    tag.element.textContent = tag.text;

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.addEventListener("click", function () {
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

  initAutoComplete(document.querySelector("#myInput"), getCountries);
  // /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  // autocomplete(document.getElementById("myInput"), countries);
})();
