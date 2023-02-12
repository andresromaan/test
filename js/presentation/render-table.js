import usersStore from '../store/accounts.store.js';

let table;

const createTable = ( ) => {
    const table = document.createElement('table');
    table.className = 'table';
    const tableHeaders = document.createElement('thead');
    if( window.location.href.includes('accounts.html') ) {
        tableHeaders.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Sexo</th>
            <th>Acción</th>
        </tr>
    `;
    }else{
        tableHeaders.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Sexo</th>
        </tr>
        `; 
    }

    const tableBody = document.createElement('tbody');
    table.append( tableHeaders, tableBody )
    return table;
}

export const renderTable = ( element ) => {

    element.innerHTML = 'Loading...';

    const users = usersStore
                    .getUsers()
                    .sort( (a,b) => a.edad - b.edad );
                    
    element.innerHTML = '';

    table = createTable();
    element.append( table );

    let tableHTML = '';

    users.forEach( user => {
        if( window.location.href.includes( 'accounts.html' ) ) {
            tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.nombre }</td>
                <td>${ user.email }</td>
                <td>${ user.edad }</td>
                <td>${ user.telefono }</td>
                <td>${ user.sexo }</td>
                <td class="text-center"><i class="delete fa-solid fa-trash-can" data-id=${ user.id }></i></td>

                </tr>
        `;
        }else{
            tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.nombre }</td>
                <td>${ user.email }</td>
                <td>${ user.edad }</td>
                <td>${ user.telefono }</td>
                <td>${ user.sexo }</td>
            </tr>
        `;
        }
    });
                    // <td class="text-center"><span class="delete" data-id=${ user.id }><i class="fa-solid fa-trash-can"></i></span></td>


    table.querySelector('tbody').innerHTML = tableHTML;

}