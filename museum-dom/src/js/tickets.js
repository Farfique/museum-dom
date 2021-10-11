

export default function buyTickets() {
    let basicPermanentPrice = 20;
    let basicTemporaryPrice = 25;
    let basicCombinedPrice = 40;
    let seniorDiscount = 0.5;
    
    let ticketTypeSet = document.querySelector('.ticket-type-set');
    let ticketTypesInputs = ticketTypeSet.querySelectorAll('input');

    let selectedTicketType;
    let isLocalStorage = true;

    let basicAmountInput = document.querySelector('.basic-amount');
    let seniorAmountInput = document.querySelector('.senior-amount');

    let amountFieldset = document.querySelector('.amount-fieldset');
    let lessButtons = amountFieldset.querySelectorAll('.less');
    let moreButtons = amountFieldset.querySelectorAll('.more');
    let totalSum = amountFieldset.querySelector('.total-sum');
    
    let basicAmount;
    let seniorAmount;



    try {
        localStorage.setItem('test', '1');
        localStorage.getItem('test');
    }
    catch {
        isLocalStorage = false;    
        alert('Please turn on local storage');   
    }

    if (isLocalStorage && localStorage.getItem('ticketType') && localStorage.getItem('ticketType').length > 0){
        selectedTicketType = localStorage.getItem('ticketType');       
    }
    else {
        selectedTicketType = 'permanent';
    }

    if (isLocalStorage && localStorage.getItem('basicAmount') && localStorage.getItem('basicAmount').length > 0){
        basicAmount = +localStorage.getItem('basicAmount');  
        basicAmountInput.value = basicAmount;     
    }
    else {
        basicAmount = +basicAmountInput.value;
    }

    if (isLocalStorage && localStorage.getItem('seniorAmount') && localStorage.getItem('seniorAmount').length > 0){
        seniorAmount = +localStorage.getItem('seniorAmount');  
        seniorAmountInput.value = seniorAmount;
    }
    else {
        seniorAmount = +seniorAmountInput.value;
    }

    totalSum.innerText = calculateTotal();



    lessButtons.forEach((button) => {
        button.addEventListener('click', () => {
            let input = button.nextElementSibling;
            input.stepDown();
            let change = new Event('change');
            input.dispatchEvent(change);
        })
    })

    moreButtons.forEach((button) => {
        button.addEventListener('click', () => {
            let input = button.previousElementSibling;
            input.stepUp();
            let change = new Event('change');
            input.dispatchEvent(change);
        })
    })

    

    ticketTypesInputs.forEach((input) => {
        if (input.value == selectedTicketType){
            input.checked = true;
        }
        else {
            input.checked = false;
        }
    })
    
    ticketTypesInputs.forEach((radio) => {
        radio.addEventListener('change', (e) => {
            //console.log("event radio button = ", e.target.value);
            selectedTicketType = e.target.value;
            if (isLocalStorage){
                localStorage.setItem('ticketType', e.target.value);
            }         
            totalSum.innerText = calculateTotal();   
        });
    
    });

    basicAmountInput.addEventListener('change', () => {
        basicAmount = +basicAmountInput.value;
        if (isLocalStorage){
            localStorage.setItem('basicAmount', basicAmount);
        }   
        totalSum.innerText = calculateTotal();
    });

    seniorAmountInput.addEventListener('change', () => {
        seniorAmount = +seniorAmountInput.value;
        if (isLocalStorage){
            localStorage.setItem('seniorAmount', seniorAmount);
        }   
        totalSum.innerText = calculateTotal();
    });

    function calculateTotal(){
        let price = basicPermanentPrice;
        switch (selectedTicketType) {
            case('permanent'):
                price = basicPermanentPrice;
                break;
            case('temporary'):
                price = basicTemporaryPrice;
                break;
            case('combined'):
                price = basicCombinedPrice;
        };
        let total = price * (basicAmount + seniorAmount * seniorDiscount);
        //console.log("total = ", total);
        return total;
    }
}


