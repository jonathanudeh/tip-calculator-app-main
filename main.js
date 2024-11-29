const billInput = document.getElementById("bill"); // bill amount
const tipPercent = document.querySelectorAll("#tip"); // tip percent
const people = document.getElementById("people"); // number of people to share the tip percent
const errorMsg = document.querySelector(".error-msg"); // error msg for when number of people is less than or equal to 0
const individualTip = document.querySelector(".tip-per-person") // amount of tip each person should get
const totalTip = document.querySelector(".total") // total number of tip each person received
const resetBtn = document.getElementById("reset-btn"); // the reset button

let billValue;
let tipSelect;

const handleBill = (bill) => {
    const numericBill = Number(bill);
    return isNaN(numericBill) || numericBill < 0 ? 0 : numericBill;
}

const handlePercent = (percent) => {
    return percent.split("%").join(""); // removes the % from the values of the button
}

const handleIndividualTip = (element, tip) => {
    element.textContent = tip.toFixed(2); //sets the textcontent of element to 2 decimal place
}

const handleTotalTip = (element, tip) => {
    element.textContent = tip.toFixed(2); //sets the textcontent of element to 2 decimal place
}

const handleCalculation = (e) => {
    const validInput = e.target.value.length > 0 || e.target.value > 0 || e.target.value !== "0";
    
    if (!validInput) {
        errorMsg.classList.remove("disable"); // shows error message if any fied is left empty 
    } else {
        errorMsg.classList.add("disable");
        let amountInPercentage = (handleBill(billValue) * handlePercent(tipSelect)) / 100; // calculate the total amount of tip everyone got

        if(people.value <= 0) {
            individualTip.textContent = "0.00";
            totalTip.textContent = "0.00";
        }
        
        let tipPerPerson = amountInPercentage / people.value; //calculate the tipp each person should get
        
       if (isNaN(amountInPercentage) || isNaN(tipPerPerson)) {
           individualTip.textContent = "0.00";
            totalTip.textContent = "0.00";
       } else {
          handleIndividualTip(individualTip, tipPerPerson); // calling the function that handles display of tip
       handleTotalTip(totalTip, amountInPercentage); // caling the function that handles display of total tip
       }
        
        
    }
}



resetBtn.addEventListener("click", () => {
    // reset btn resets all values to zero
    // I let the default behaviour of the reset run, that makes the input reset by default when the btn is clicked so i didn't reset it here
    billValue = "";
    tipSelect = "";
    errorMsg.classList.add("disable");
    individualTip.textContent = "0.00";
    totalTip.textContent = "0.00";
})

// I called the handleCalulation function on all event listener so that when the listeners are fired the calculation starts running, 
// this was done for users ease 

billInput.addEventListener("input", (e) => {
    billValue = e.target.value;
    handleCalculation(e); 
});

tipPercent.forEach(el => {
    if (el.tagName === "BUTTON") {
    el.addEventListener("click", (e)=> {
        tipSelect = e.target.value;
        handleCalculation(e)
    }); 
    } else {
    el.addEventListener("input", (e)=> {
        tipSelect = e.target.value;
        handleCalculation(e)
    });
}});

people.addEventListener("input", handleCalculation);


