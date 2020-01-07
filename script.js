'use strict'

document.addEventListener('DOMContentLoaded', () => {

    const upload = document.querySelector('#upload'),
        addBtn = document.querySelector('#add'),
        output = document.querySelector('#files-area'),
        option = document.querySelector('#options'),
        uploadMenu = document.querySelector('.uploadMenu'),
        searchForm = document.querySelector('#form-search'),
        allBtn = document.querySelectorAll('.nav-link'),
        rate = document.querySelectorAll('label'),
        searchBtn = document.querySelector('#search-btn'),
        searchArea = document.querySelector('#search-area'),
        not = document.querySelector('#alert-area');


    const chooseType = () => {
        uploadMenu.style.display = 'block';
        option.value === 'Аудио' ? upload.setAttribute('accept', '.MP3, .WAV') : console.log('Выбран другой способ загрузки');
        option.value === 'Видео' ? upload.setAttribute('accept', '.MP4, .AVI, .MPEG, .MPG, .WMV') : console.log('Выбран другой способ загрузки');
        option.value === 'Текст' ? upload.setAttribute('accept', '.TXT, .DOCX, .PDF, .ODT, .DOC, .RTF') : console.log('Выбран другой способ загрузки');
    }
    const btnVisible = () => {
        upload.value === "" ? addBtn.setAttribute('disabled', 'true') : addBtn.removeAttribute('disabled');
    }

    const addFile = e => {
        const publishTime = new Date();
        const time = publishTime.getHours() + ':' + publishTime.getMinutes() + ':' + publishTime.getSeconds();
        let subs = document.querySelector('#textarea-field').value;
        const videoFormat = 'fa-file-video-o';
        const audioFormat = 'fa-file-audio-o';
        const textFormat = 'fa-file-text-o';

        const iff = () => {
            if (option.value === 'Аудио') {
                return audioFormat;
            } else if (option.value === 'Видео') {
                return videoFormat;
            } else if (option.value === 'Текст') {
                return textFormat;
            } else {
                return false;
            }
        }

        const emptyTitle = () => {
            let titleFile = document.querySelector('#title-file').value;
            if (titleFile === "") {
                let val = upload.value;
                let s = val.split('');
                s.splice(0, 12);
                return titleFile = s.join('');
            } else {
                return titleFile = titleFile;
            }
        }

        const emptySubscription = () => {
            if (subs === "") {
                return subs = 'Без описания';
            } else {
                return subs = subs;
            }
        }
        const ratingChange = () => {
            let i = Math.floor(Math.random() * 1000000);

            const rating =
                `
                    <input type="radio" id="${i+1}" name="${i}" value="5" /><label class="full" for="${i+1}" title="Awesome - 5 stars"></label>
                    <input type="radio" id="${i+2}" name="${i}" value="4" /><label class="full" for="${i+2}" title="Pretty good - 4 stars"></label>
                    <input type="radio" id="${i+3}" name="${i}" value="3" /><label class="full" for="${i+3}" title="Meh - 3 stars"></label>
                    <input type="radio" id="${i+4}" name="${i}" value="2" /><label class="full" for="${i+4}" title="Kinda bad - 2 stars"></label>
                    <input type="radio" id="${i+5}" name="${i}" value="1" /><label class="full" for="${i+5}" title="Sucks big time - 1 star"></label>
                       
                    `
            return rating;
        }
        const idCouner = () => {
            let titleFile = document.querySelector('#title-file').value;
            let val = upload.value;
            let s = val.split('');
            s.splice(0, 12);
            return titleFile = s.join('');
        }

        let newFile = document.createElement('div');
        newFile.classList.add('card');
        newFile.innerHTML += `
            <div class="card-body">
                <i class="fa fa-2x ${iff()} float-right"></i>
                <h5 class="card-title" id="card_${idCouner()}">${emptyTitle()}</h5>
                    <h6 class="card-subtitle mb-2 text-muted format">${option.value}</h6>
                    <fieldset class="rating">${ratingChange()}</fieldset>
                    <p class="card-text">${emptySubscription()}</p>
                    <a href="${upload.value}" class="card-link" download>Download</a>
                    <a href="#" class="card-link card-open" data-toggle="modal" data-target="#exampleModalCenter">Open</a>
            </div>
        `;
        const cards = document.querySelectorAll('.card-body');
        output.prepend(newFile);
        cards.forEach(e => {
            const elems = e.children;
        });

        const rateI = document.querySelectorAll('.rating');
        rateI.forEach(e => {
            e.addEventListener('change', () => {
                not.style.display = 'block';
                setTimeout(() => {
                    not.style.display = 'none';
                }, 1500)
                console.log(not);

            });
        });
        modalOpenIcon(time);
        e.preventDefault();
    }
    allBtn.forEach(e => {
        e.addEventListener('click', e => {
            const cardBodyMain = document.querySelectorAll('.card');
            const target = e.target;
            cardBodyMain.forEach(e => {
                e.style.height = '200px';
            })
            const cards = document.querySelectorAll('.card-body');
            cards.forEach(e => {
                target.textContent === 'Все' ? e.parentElement.style.display = 'flex' : e.parentElement.style.display = 'none';
                if (target.textContent === 'Аудио') {
                    cards.forEach(e => {
                        e.children[2].textContent === 'Аудио' ? e.parentElement.style.display = 'flex' : e.parentElement.style.display = 'none';
                    })
                }
                if (target.textContent === 'Видео') {
                    cards.forEach(e => {
                        e.children[2].textContent === 'Видео' ? e.parentElement.style.display = 'flex' : e.parentElement.style.display = 'none';
                    })
                }
                if (target.textContent === 'Текст') {
                    cards.forEach(e => {
                        e.children[2].textContent === 'Текст' ? e.parentElement.style.display = 'flex' : e.parentElement.style.display = 'none';
                    })
                }
            });
            e.preventDefault();
        });
    })
    const searchingKeyWords = () => {

        const cardsTitle = document.querySelectorAll('.card-title'),
            cardsBody = document.querySelectorAll('.card'),
            val = searchArea.value.toUpperCase();
        if (val != '') {
            for (let i = 0; i < cardsTitle.length; i++) {
                let a = cardsTitle[i],
                    txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(val) > -1) {
                    cardsBody[i].style.display = 'flex';
                } else {
                    cardsBody[i].style.display = 'none';
                }
            }
        } else {
            cardsBody.forEach(e => {
                e.style.display = 'flex';
            })
        }
    }


    searchArea.addEventListener('input', searchingKeyWords);
    upload.addEventListener('change', btnVisible);
    addBtn.addEventListener('click', addFile);
    option.addEventListener('change', chooseType);


    //Registration and Authorization part


    const reg = document.querySelector('#registration'),
        log = document.querySelector('#log-area'),
        pass = document.querySelector('#pass-area'),
        logInBtn = document.querySelector('#log-in-btn'),
        noData = document.querySelector('#no-data'),
        regModal = document.querySelector('#reg-modal');


    const registration = e => {

        const logReg = document.querySelector('#log-reg'),
            passReg = document.querySelector('#pass-reg'),
            regBtn = document.querySelector('#reg-btn');

        regBtn.addEventListener('click', () => {
            if (passReg.value === '') {
                alert('Введите пароль!');
            } else {
                localStorage.setItem('userLogin', logReg.value);
                localStorage.setItem('userPassword', passReg.value);
                const authMain = document.querySelector('.auth');
                const sign = document.querySelector('.sign');
                sign.style.display = 'none';
                authMain.style.display = '';
                noData.style.display = 'none';
            }
        });



        e.preventDefault();
    }

    const authorization = e => {
        if (log.value == '' || pass.value == '') {
            noData.style.display = 'block'
        } else {
            if (localStorage.getItem('userLogin') === log.value) {
                if (localStorage.getItem('userPassword') === pass.value) {
                    const authMain = document.querySelector('.auth');
                    const sign = document.querySelector('.sign');
                    sign.style.display = 'none';
                    authMain.style.display = '';
                    noData.style.display = 'none';
                    console.log('ok you signed in');
                }
            } else {
                alert('Неправильный пароль или логин');
            }
        }

        e.preventDefault();
    }

    logInBtn.addEventListener('click', authorization);
    reg.addEventListener('click', registration);

    // MODAL OPEN //
    const modalOpenIcon = time => {
        const cardsBody = document.querySelectorAll('.card-body'),
            titleModal = document.querySelector('#titleModalOpen'),
            iconFile = document.querySelector('#icon-file'),
            typeFile = document.querySelector('#type-file'),
            subsFile = document.querySelector('#subs-file'),
            cardOpen = document.querySelectorAll('.card-open'),
            currentTime = document.querySelector('#currentTime'),
            videoFormat = 'fa-file-video-o',
            audioFormat = 'fa-file-audio-o',
            textFormat = 'fa-file-text-o';

        cardsBody.forEach(elem => {
            console.log(elem);
            elem.addEventListener('click', e => {
                const target = e.target;
                console.log(target);
                console.log(typeFile.innerText);
                currentTime.innerText = time;
                titleModal.innerText = elem.children[1].innerText;
                typeFile.innerText = elem.children[2].innerText;
                subsFile.innerText = elem.children[4].innerText;
                if (target.innerText === 'Open') {
                    elem.children[2].innerText === 'Видео' ? iconFile.classList.add(videoFormat) : iconFile.classList.remove(videoFormat);
                    elem.children[2].innerText === 'Аудио' ? iconFile.classList.add(audioFormat) : iconFile.classList.remove(audioFormat);
                    elem.children[2].innerText === 'Текст' ? iconFile.classList.add(textFormat) : iconFile.classList.remove(textFormat);
                } else {
                    console.log('Упс');
                }

            });
        })

    }
    // ***************
});