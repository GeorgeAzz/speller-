document.addEventListener('DOMContentLoaded', e => {
    const search = document.getElementById('search');

    search.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('input').value;
        const div = document.getElementById('div');
        const divInc = document.getElementById('divInc');


        let res = await fetch('/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                word: searchInput
            })
        });

        // window.location = '/search';

        let answer = await res.json();
        let incorrectWords = answer.map(el => el.word);
        let correctedWords = answer.map(el => el.s);

        function connectingArr(arr) {
            let otp = [];

            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    otp.push(arr[i][j])
                }
            }
            return otp;
        };

        let corectWords = connectingArr(correctedWords);

        div.innerHTML = `<a style="background-color: #06AED5; color: #F9F5FF" class="list-group-item list-group-item-action active">Возможно, вы имели ввиду: 
        </a>`
        for (let i = 0; i < corectWords.length; i++) {
            div.innerHTML += `            
            <a   class="list-group-item list-group-item-action">${corectWords[i]}</a> `
        };

        divInc.innerHTML = `<a style="background-color: #06AED5; color: #F9F5FF" class="list-group-item list-group-item-action active">Допущены ошибки(опечатки) в словах: 
        </a>`
        for (let j = 0; j < incorrectWords.length; j++) {
            divInc.innerHTML += `            
            <a  class="list-group-item list-group-item-action">${incorrectWords[j]}</a> `
        };


    });
});