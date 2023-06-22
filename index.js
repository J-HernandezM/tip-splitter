const priceTip = document.querySelector('.priceTip')
const priceTotal = document.querySelector('.priceTotal')

const billInput = document.querySelector('#billTotal')
const customInput = document.querySelector('.customTipInput')
const percentageInputNodes = document.querySelectorAll('.percentages')
const peopleInput = document.querySelector('#peopleNum')
const allPercentages = [...percentageInputNodes]

const spanError = document.querySelector('.peopleError')

const resetBtn = document.querySelector('.resetBtn')

let bill
let numPpl
let tip

function updatePrices({numPpl, bill, tip}){
    if(!!bill && !!numPpl && !!tip ){
        let finalPriceTotal = ((bill*(tip/100))+bill)/numPpl
        let finalPriceTip = ((bill*(tip/100)))/numPpl
        let roundedPTo = finalPriceTotal.toFixed(2)
        let roundedPTi = finalPriceTip.toFixed(2)
        priceTip.innerHTML = `$${roundedPTi}`
        priceTotal.innerHTML = `$${roundedPTo}`
    }
}
billInput.addEventListener('blur', (event)=>{
    bill = Number(event.target.value)
    updatePrices({bill, numPpl, tip})
})
peopleInput.addEventListener('blur', (event)=>{
    if(event.target.value!=0){
        spanError.classList.add('inactive')
        peopleInput.classList.remove('inputError')
        numPpl = Number(event.target.value)
        updatePrices({bill, numPpl, tip})
    }else{
        spanError.classList.remove('inactive')
        peopleInput.classList.add('inputError')
    }

})
allPercentages.forEach((input)=>{
    input.addEventListener('click', (event)=>{
        tip = Number(event.target.value)
        event.target.form[6].value=''
        updatePrices({bill, numPpl, tip})
    })
})
customInput.addEventListener('click', (event)=>{
    const form = event.target.form
    const formArray = [...form]
    formArray.forEach((input)=>{
        if(input.checked){
            input.checked=false
        }
    })
})
customInput.addEventListener('blur', (event)=>{
    tip = Number(event.target.value)
    updatePrices({bill, numPpl, tip})
})
//Validations
billInput.addEventListener('keydown', (event)=>{
    if((/^[a-zA-Z\W_]+$/g).test(event.key) && !isSpecialKey(event)) {
        event.preventDefault();
    }
});
function isSpecialKey(event) {
    const specialKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    return specialKeys.includes(event.key);
}
//Reset btn
resetBtn.addEventListener('click', ()=>{
    location.reload()
})