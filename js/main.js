import { renderTable } from './presentation/render-table.js';
import usersStore from './store/accounts.store.js';
import { validateEmail, validatePassword } from './utils/validators.util.js';

const table = document.querySelector('#table-container');
const btnFilter = document.querySelector('.btn-filter');
const btnResetFilter = document.querySelector('.btn-reset-filter');
const genderFilterSelect = document.querySelector('#filter-select');
const averageAge = document.querySelector('#average-age');
const femaleUsers = document.querySelector('#female-users');
const maleUsers = document.querySelector('#male-users');
const btnLogin = document.querySelector('#btn-login');
const btnTogglePassword = document.querySelector('#toggle-password');
const email = document.querySelector('#email-modal');
const password = document.querySelector('#password-modal');

renderTable( table );

if( sessionStorage.getItem('logged') ) {
    document.getElementById('login-link').style.display = 'none';
}else{
    document.getElementById('accounts-link').style.display = 'none';
}

maleUsers.innerText = 'Edad promedio: ' + usersStore.getMaleUsersAmount();
femaleUsers.innerText = 'Usuarios femeninos: ' + usersStore.getFemaleUsersAmount();
averageAge.innerText = 'Edad promedio: ' + usersStore.getUsersAverageAge().toFixed( 0 ) ;

let selectedGenderFilter = '';

genderFilterSelect.addEventListener('change', ( event ) => {
    selectedGenderFilter = event.target.value;
});

btnResetFilter.addEventListener('click', () => {
    usersStore.resetFilter();
    renderTable( table );
});

btnFilter.addEventListener('click', () => {
    event.preventDefault()
    usersStore.filterByGender( selectedGenderFilter );
    renderTable( table );
});

const validateLoginFields = () => {

    if( password.value !== '' && email.value !== '' ) {
        btnLogin.disabled = false;
    }else{
        btnLogin.disabled = true;
    }
}

password.addEventListener('input', validateLoginFields );
email.addEventListener('input', validateLoginFields );

btnLogin.addEventListener('click', () => {
    event.preventDefault();

    const emailError = document.querySelector('#email-error');
    const passwordError = document.querySelector('#password-error');
    const missingFields = document.querySelector('#btn-login');

    if ( !validateEmail( email.value ) ) {
        emailError.innerText = 'Ingrese un email válido'
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    } 

    if ( !validatePassword( password.value ) ){
        passwordError.innerText = 'Ingrese un contraseña válida';
        passwordError.style.display = 'block';
    } else{
        passwordError.style.display = 'none';
        sessionStorage.setItem('logged', true);

        $('.modal').modal('hide');

        document.getElementById('login-link').style.display = 'none';
        document.getElementById('accounts-link').style.display = 'block';
    }
});

let showPassword = false;
btnTogglePassword.addEventListener('click', () => {
    const eyeIcon = document.getElementById('eye-icon');
    const password = document.getElementById('password-modal');

    showPassword = !showPassword;
    if( showPassword ) {
        password.type = 'text';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }else{
        password.type = 'password';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash'); 
        
    }
});

