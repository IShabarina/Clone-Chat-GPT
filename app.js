// !!! Please create your own secret API key here https://platform.openai.com/account/api-keys

const API_KEY = '...';
const submitButton = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');
const inputElement = document.querySelector('.main_input')
const historyElement = document.querySelector('.side-bar_history')
const buttonElement = document.querySelector('.side-bar_btn')

function changeInput(value) {
   const inputElement = document.querySelector('.main_input')
   inputElement.value = value
}


async function getMessage() {
    // console.log('clicked')
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputElement.value }],
            max_tokens: 100
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/completions', options)
        const data = await response.json()
        // console.log(data)
        outPutElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch (error) {
        // console.error(error)
        outPutElement.textContent = `Oops! something went wrong :(`
    }
}

submitButton.addEventListener('click', getMessage)

function  clearInput() {
    clearInput.value = ''
}

buttonElement.addEventListener('click', clearInput)