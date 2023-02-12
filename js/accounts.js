import { renderTable } from './presentation/render-table.js';
import usersStore from './store/accounts.store.js';
import { validateEmail, validateOnlyNumbers, validatePassword, validateLength, validateOnlyLetters } from './utils/validators.util.js';

const table = document.querySelector('#table-container');
const submitButton = document.querySelector('#submit');

renderTable( table );

const genderSelect = document.querySelector('#gender-select');
let selectedGender = genderSelect.value;
genderSelect.addEventListener('change', ( event ) => {
    selectedGender = event.target.value;
});

/**
 * Add new user to the table
 */
submitButton.addEventListener('click', ( event ) => {
    
    event.preventDefault();

    let validated = true;

    const user = {
        id: usersStore.getUsers().length + 1 ,
        nombre: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        edad: document.querySelector('#age').value,
        password: document.querySelector('#password').value,
        telefono: document.querySelector('#phone').value,
        sexo: selectedGender,
    };

    if( !validateLength( user.nombre, 10, 55 ) ) {
        const nameError = document.querySelector('#name-error'); 
        nameError.style.display = 'block';
        nameError.innerText = 'El nombre debe tener entre 10 y 55 caracteres';
        validated = false;
    } else {
        document.querySelector('#name-error').style.display = 'none';
    }
    
    if( !validateEmail( user.email ) ) {
        const emailError = document.querySelector('#email-error');
        emailError.style.display = 'block';
        emailError.innerText = 'Por favor ingrese un email válido';
        validated = false;
    }else if( !validateLength( user.email, 8, 30 ) ){
        
        const emailError = document.querySelector('#email-error');
        emailError.innerText = 'El mail debe tener entre 8 y 30 caracteres';
        emailError.style.display = 'block';
        validated = false;
    }else{
        document.querySelector('#email-error').style.display = 'none';
    }

    if( !validatePassword( user.password ) ) {
        const passwordError = document.querySelector('#password-error');
        passwordError.innerText = 'La contraseña debe tener entre 8 y 16 caracteres';
        passwordError.style.display = 'block';
        validated = false;
    }else{
        document.querySelector('#password-error').style.display = 'none';
    }

    if( (user.telefono.length < 9 && user.telefono.length > 0|| user.telefono.length > 9)  ) {
        const phoneError = document.querySelector('#phone-error');
        phoneError.innerText = 'El teléfono debe tener 9 dígitos';
        phoneError.style.display = 'block'
        validated = false;
    }else{
        document.querySelector('#phone-error').style.display = 'none';
    }

    if( user.nombre === '' || user.email === '' || user.edad === '' || user.password === '' || user.sexo === '' ) {
        const missingFieldsError = document.querySelector('#missing-fields-error');
        missingFieldsError.innerText = 'Por favor complete todos los campos';
        missingFieldsError.style.display = 'block';
        validated = false;
    }else{
        document.querySelector('#missing-fields-error').style.display = 'none';
    }

    if( validated ) {
        usersStore.addUser( user );
        document.querySelector('#new-user-form').reset();
        renderTable( table );
    }
});

document.querySelector('#age').addEventListener('input', ( event ) => {
    if( !validateOnlyNumbers( event.target.value ) ) {
        event.target.value = event.target.value.slice(0, -1);
    }
});

document.querySelector('#name').addEventListener('input', ( event ) => {
    if( !validateOnlyLetters( event.target.value ) ) {
        event.target.value = event.target.value.slice(0, -1);
    }
}); 

document.querySelector('#table-container').addEventListener('click', (event) =>{

    const element = event.target.closest('[data-id]');
    const id = element && element.getAttribute('data-id');

    if( !event.target.attributes.class ) return;

    if( event.target.attributes.class.value.includes('delete') ) {

        usersStore.deleteUser( id );
        renderTable( table );
    }

})