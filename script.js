const formContainer = document.getElementById("form-container")
const allFormSections = [...formContainer.querySelectorAll("form>div")]
let currentFormSections = null
const buttonsNavigation = document.querySelector(".btn-container")
const test = document.getElementById("test")
const buttonsContainer = document.getElementById("btn-container")
const backBtn = document.getElementById("go-back-btn")
const chosePlane = document.getElementById("chosen-plan")
const inputEl = document.getElementById("personal-info")
const inputsArray = [...inputEl.querySelectorAll("div>input")]
const extraServices = document.querySelector('.extra-services')
const inputsArrayUpsales = document.querySelector("#upsales-options")
const inputsUpsalesArray = inputsArrayUpsales.querySelectorAll("input")
const monthOrYear = ""
const totalPrice = document.querySelector(".total-price")
const totalPriceNumber = document.querySelector(".total-price-number")
const planUniqePrice = document.querySelector(".plan-unique-price")
inputsArrayUpsales.addEventListener("click", () => {
    const arrayOfUpsales = []
    inputsUpsalesArray.forEach(input => {
        if (input.checked) {
            arrayOfUpsales.push(
                {
                    planName: input.nextElementSibling.querySelector(".upsale-topic").innerText,
                    price: input.closest(".single-upsale-option").querySelector(".upsale-price").innerText

                }
            )

        }
    })
    console.log(arrayOfUpsales)

    const recapForInput = arrayOfUpsales.map(item => {
        return `<div class="single-extra-service">
            <p>${item.planName}</p>
            <p>${item.price}</p>

        </div>`

    })

    extraServices.innerHTML = recapForInput.join("")
})

const inputContainer = document.getElementById("input-email")
const spanErrorEmail = document.createElement("p")
spanErrorEmail.textContent = "The email you have entered is not valid"

const plansOptions = document.querySelector(".plans-options")
const plansArray = [...plansOptions.querySelectorAll("label")]


time.addEventListener("click", () => {
    time.value === "monthly" ? time.value = "yearly" : time.value = "monthly"
    console.log(time.value)
    totalPrice.innerText = `Total(by ${time.value.slice(0, -2)})`
    console.log(totalPrice)
})


let chosenPlaneFinal = ""
plansArray.forEach(plan => plan.addEventListener("click", (e) => {
    e.preventDefault()
    plansArray.forEach(plan => {
        plan.classList.remove("chosen-plan-marked")
    })
    plan.classList.toggle("chosen-plan-marked")
    chosenPlaneFinal = document.querySelector(".chosen-plan-marked>input").value
    console.log(chosenPlaneFinal)
    chosePlane.innerText += chosenPlaneFinal
    planUniqePrice.innerText = document.querySelector(".chosen-plan-marked>.plan-details>.plan-price").innerText

}))



if (currentFormSections === null) {
    currentFormSections = 3
    removeOrAddBackBtn()
    allFormSections[currentFormSections].classList.add("active")
}

formContainer.addEventListener("click", e => {

    if (e.target.classList.contains("next-btn")) {
        const isValid = validationCheck()

        if (isValid) {

            if (currentFormSections <= 3) {
                currentFormSections += 1

            }
        }



    }

    else if (e.target.classList.contains("go-back-btn")) {

        if (currentFormSections >= 1) {
            currentFormSections -= 1
        }


    }

    updateFormStepNumber()
    hideNavigationButtonsOrNot()
    removeOrAddBackBtn()


})

function hideNavigationButtonsOrNot() {

    if (currentFormSections === 4) {
        buttonsContainer.classList.add("btns-gone")
    }
    else { buttonsContainer.classList.remove("btns-gone") }
}

function removeOrAddBackBtn() {
    if (currentFormSections === 0) {
        backBtn.classList.add("back-btn-gone")
    }
    else { backBtn.classList.remove("back-btn-gone") }
}

function updateFormStepNumber() {

    for (i = 0; i < allFormSections.length; i++) {
        if (i === currentFormSections) {
            if (allFormSections[currentFormSections].classList.contains("active") === false) {

                allFormSections[currentFormSections].classList.add("active")

            }

        }
        else {

            allFormSections[i].classList.remove("active")
        }

    }




}


function validationCheck() {
    let isValid = true
    inputsArray.map(input => {
        if (input.value.length < 1) {
            input.nextElementSibling.classList.add("error-input-shown")
            isValid = false
        }
        else {
            input.nextElementSibling.classList.remove("error-input-shown")
        }
    })

    if (!inputsArray[1].value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        isValid = false
        inputContainer.appendChild(spanErrorEmail)
    }

    return isValid
}

