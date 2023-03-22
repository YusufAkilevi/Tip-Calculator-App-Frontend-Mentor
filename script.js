const billInput = document.querySelector("#bill");
const customTip = document.querySelector("#custom-tip");
const peopleNumberInput = document.querySelector("#people-number");
const tipPercentages = document.querySelector(".tip-percentages");
const tipAmountResult = document.querySelector("#tip-amount-result");
const totalResult = document.querySelector("#total-result");
const resetBtn = document.querySelector(".btn-reset");

let billAmount;
let tipPercentage;
let peopleNumber;

const tipAmountPerPerson = (tipPercentage, bill, people) => {
  return ((bill * tipPercentage) / 100 / people).toFixed(2);
};
const totalAmountPerPerson = (tipPercentage, bill, people) => {
  return ((bill + (bill * tipPercentage) / 100) / people).toFixed(2);
};

const showResults = () => {
  if (billAmount && tipPercentage && peopleNumber) {
    tipAmountResult.textContent = `$${tipAmountPerPerson(
      tipPercentage,
      billAmount,
      peopleNumber
    )}`;
    totalResult.textContent = `$${totalAmountPerPerson(
      tipPercentage,
      billAmount,
      peopleNumber
    )}`;
  }
};
const removeActiveClass = () => {
  document.querySelector(".active").classList.remove("active");
};

/////////////////////
/////////////////////
/////////////////////

billInput.addEventListener("change", function () {
  billAmount = +billInput.value;
  showResults();
});

customTip.addEventListener("change", function () {
  if (document.querySelector(".active")) removeActiveClass();
  tipPercentage = +customTip.value;
  showResults();
});

tipPercentages.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.contains("tip-percentage")) {
    tipPercentage = +e.target.dataset.tip;
    if (document.querySelector(".active"))
      document.querySelector(".active").classList.remove("active");
    target.classList.add("active");
  }
  showResults();
});

peopleNumberInput.addEventListener("change", function () {
  if (peopleNumberInput.value == 0) {
    const html = `
    <label style="color:rgb(251, 83, 11) " for="people-number" id="peopleNum-label-red">
        Can't be zero.
    </label>`;
    if (!document.querySelector("#peopleNum-label-red"))
      document
        .querySelector("#peopleNum-label")
        .insertAdjacentHTML("afterend", html);

    peopleNumberInput.addEventListener("focus", function () {
      this.style.outline = "2px solid rgb(251, 83, 11)";
    });
  } else {
    peopleNumberInput.addEventListener("focus", function () {
      this.style.outline = "2px solid hsl(172, 67%, 45%)";
    });
    peopleNumber = peopleNumberInput.value;
    if (document.querySelector("#peopleNum-label-red"))
      document.querySelector("#peopleNum-label-red").remove();
  }
  showResults();
});

resetBtn.addEventListener("click", function () {
  billAmount = tipPercentage = peopleNumber = 0;
  billInput.value = customTip.value = peopleNumberInput.value = "";
  totalResult.textContent = tipAmountResult.textContent = "$0.00";
  if (document.querySelector(".active")) removeActiveClass();
  if (document.querySelector("#peopleNum-label-red"))
    document.querySelector("#peopleNum-label-red").remove();
});
