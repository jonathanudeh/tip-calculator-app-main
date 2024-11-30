const billInput = document.getElementById("bill"); /// bill amount
const tipBtn = document.querySelectorAll("#tip"); // tip percent
const customTip = document.getElementById("tip-custom"); // custom tip btn
const people = document.getElementById("people"); // number of people to share the tip percent
const errorMsg = document.querySelector(".error-msg"); // error msg for when number of people is less than or equal to 0
const individualTip = document.querySelector(".tip-per-person") // amount of tip each person should get
const totalTip = document.querySelector(".total") // total number of tip each person received
const resetBtn = document.getElementById("reset-btn"); // the reset button

let billValue;
let tipValue;

const handleBill = (bill) => {
    const numericBill = Number(bill);
    return numericBill < 0 ? 0 : numericBill;
}

const handleIndividualTip = (element, tip) => {
    element.textContent = Number(tip).toFixed(2); //set the textcontent of element to 2 decimal place
}

const handleTotalTip = (element, tip) => {
    element.textContent = Number(tip).toFixed(2); //set the textcontent of element to 2 decimal place
}

const handleCalculation = (e) => {
    const validInput = e.target.value.length > 0 && e.target.value.split("%").join("") > 0 && e.target.value !== "0"; // defines what our valid inputs are

    //if input is not valid then:
    if (!validInput) {
        errorMsg.classList.remove("disable"); // shows error message if any fied is invalid
        tipPerPerson = 0;
        amountInPercentage = 0;
        totalPerPerson = 0;
        individualTip.textContent = "0.00"; // whenever there's an error our display texts reverts back to zero
        totalTip.textContent = "0.00"; //  whenever there's an error our display texts reverts back to zero
    } else {
        //else if input is valid
        errorMsg.classList.add("disable"); // doesn't show error message if all fields are valid after input
        let amountInPercentage = handleBill(billValue) * (tipValue / 100); // calculate the total amount of tip everyone got
        let tipPerPerson = amountInPercentage / people.value ; //calculate the tip each person should get
        let totalPerPerson = handleBill(billValue) / people.value + tipPerPerson;
        // handles negative numbers incase the validInput didn't catch them
        if(people.value <= 0 || billInput.value <= 0 || tipBtn.value <= 0 || customTip <= 0) {
            tipPerPerson = 0;
            amountInPercentage = 0;
            totalPerPerson = 0;
        }
      
        // prevents user from calculating more than a hundred percent(100%) of tip
        if (tipValue > 100) {
            tipPerPerson = 0;
            amountInPercentage = 0;
            totalPerPerson = 0;
        }

        //handles cases where calculation is infinite or not a number
       if (isNaN(amountInPercentage) || isNaN(tipPerPerson) || tipPerPerson === Infinity || tipPerPerson === NaN) {
            tipPerPerson = 0;
            amountInPercentage = 0;
            totalPerPerson = 0;
        }

        handleIndividualTip(individualTip, tipPerPerson); // calling the function that handles display of tip
        handleTotalTip(totalTip, totalPerPerson); // caling the function that handles display of total tip
        
    }
}


resetBtn.addEventListener("click", () => {
    // reset btn resets all values to zero
    // I let the default behaviour of the reset run, that makes the inputs reset by default when the btn is clicked so i didn't reset it here
    billValue = "";
    tipValue = "";
    customTip.value = "";
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

customTip.addEventListener("input", (e) => {
    tipValue = e.target.value.split("%").join("");
    handleCalculation(e); 
})

// this function was specifiaclly written outside the event listener so that when looping through the tipBtn the click event isn't fired automatically but only when one of the tipBtn is clicked on and only the button clicked does it listen for
const tipLoop = (e) => {
    tipValue = e.target.value.split("%").join(""); 
    handleCalculation(e); 
}

tipBtn.forEach(button => {
    button.addEventListener("click", tipLoop);
})

people.addEventListener("input", handleCalculation);


