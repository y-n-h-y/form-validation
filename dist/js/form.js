const form = document.querySelector('form');
const requiredElms = document.getElementsByClassName('required');
const kana = document.getElementById('kana');
const tel = document.getElementById('tel');
const mail = document.getElementById('mail');
const code = document.getElementById('code');
const address1 = document.getElementById('address-level1');
const checkBoxGroup = document.querySelector('.checkValidate');
const radioButtonxGroup = document.querySelector('.radioValidate');
const checkBox = document.getElementsByName('checkbox');
const radioButtons = document.getElementsByName('radio');
const file = document.getElementById('file');
const fileValue = file.files;
const openIcon = document.querySelector('.openEye');
const closeIcon = document.querySelector('.closeEye');
const password = document.getElementById('pw');
const pwCheck = form.querySelector('.pw-check-list');
const pw01 = form.querySelector('.pw01');
const pw02 = form.querySelector('.pw02');
const pw03 = form.querySelector('.pw03');

const hiraganaPattern = /^[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]+$/mu;
const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
const telPattern = /^0\d{9,10}$/;
const postalCodePattern = /^[0-9]{7}$/;
const addressPattern = /(ι½|ι|εΊ|η)$/;
const bigStr = /(?=.*[A-Z])/;

let checkedCount = 0;

let radioCheckFlag = false;

openIcon.classList.add('is-none');


const scrollElm = () => {
    const errorElm = form.querySelector('.error');
    console.log(errorElm);
    if (errorElm) {
        const errorElmPosition = errorElm.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: errorElmPosition - 70,
            behavior: "smooth"
        });
    }
};

const errorMessage = (elm, message) => {
    let errSpan = document.createElement('span');
    errSpan.classList.add('error');
    errSpan.textContent = message;
    elm.parentNode.append(errSpan);
};

for (const check of checkBox) {
    check.addEventListener('click', function () {
        if (check.checked) {
            console.log('on');
            checkedCount++;
        } else {
            console.log('off');
            checkedCount--;
        }
    });
}

for (const radio of radioButtons) {
    radio.addEventListener('click', function () {
        radioCheckFlag = true;
    });
}

closeIcon.addEventListener('click', function () {
    closeIcon.classList.add('is-none');
    openIcon.classList.remove('is-none');
    password.setAttribute('type', 'text');
});

openIcon.addEventListener('click', function () {
    openIcon.classList.add('is-none');
    closeIcon.classList.remove('is-none');
    password.setAttribute('type', 'password');
});

//ιδΏ‘γγΏγ³ζΌδΈζγ?ε€ε?
form.addEventListener('submit', function (e) {
    const hiraganaTest = hiraganaPattern.test(kana.value);
    const telTest = telPattern.test(tel.value);
    const emailTest = emailPattern.test(mail.value);
    const codeTest = postalCodePattern.test(code.value);
    const addressTest = addressPattern.test(address1.value);
    const erroElms = document.querySelectorAll('.error');

    for (const errorElm of erroElms) {
        errorElm.remove();
    }

    for (const elm of requiredElms) {
        const elmValue = elm.value;
        if (!elmValue) {
            if (elm.id === 'select') {
                errorMessage(elm, 'ιΈζγγ¦γγ γγ');
            } else {
                errorMessage(elm, 'ε₯εεΏι ι η?γ§γ');
            }
        }
    }

    if (checkedCount === 0) {
        e.preventDefault();
        errorMessage(checkBoxGroup, 'εΏι ι η?γ§γ');
    }

    if (!radioCheckFlag) {
        e.preventDefault();
        errorMessage(radioButtonxGroup, 'εΏι ι η?γ§γ');
    }

    if (fileValue.length === 0) {
        e.preventDefault();
        errorMessage(file, 'γγ‘γ€γ«γγ’γγγ­γΌγγγ¦γγ γγ');
    }

    if (!hiraganaTest && kana.value.length > 0) {
        e.preventDefault();
        errorMessage(kana, 'γ²γͺγγͺγ§ε₯εγγ¦γγ γγ');
    }

    if (!emailTest && mail.value.length > 0) {
        e.preventDefault();
        errorMessage(kana, 'γ‘γΌγ«γ’γγ¬γΉγζ­£γγγγγΎγγ');
    }

    if (!codeTest && code.value.length > 0) {
        e.preventDefault();
        errorMessage(code, 'ι΅δΎΏηͺε·γζ­£γγγγγΎγγ');
    }

    if (!telTest && tel.value.length > 0) {
        e.preventDefault();
        errorMessage(tel, 'ι»θ©±ηͺε·γζ­£γγγγγΎγγ');
    }

    if (!addressTest && address1.value.length > 0) {
        e.preventDefault();
        errorMessage(address1, 'ι½γ»ιγ»εΊγ»ηγε₯εγγγ¦γγΎγγ');
    }

    scrollElm();
});

password.addEventListener('input', () => {
    const bigStrTest = bigStr.test(password.value);
    if (!bigStrTest && password.value.length > 0) {
        pwCheck.style.color = '#ff0000';
        pw01.classList.remove('is-ok');
        pw01.classList.add('is-ng');
        pwCheck.style.color = '#ff0000';
    } else if (password.value.length === 0) {
        pw01.classList.add('is-ng');
    } else if (bigStrTest) {
        pw01.classList.remove('is-ng');
        pw01.classList.add('is-ok');
    }
});