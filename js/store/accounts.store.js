import { data } from '../data.js';

const state = {
    initialState: data.data,
    users: data.data,
};

const filterByGender = ( filter ) => {
    state.users = [...state.initialState];
    state.users = state.users.filter( user => user.sexo.toUpperCase() === filter.toUpperCase() );
}

const resetFilter = () => {
    state.users = [...state.initialState];
}

const addUser = ( user ) => {
    state.users=  [...state.users, user];
}

const deleteUser = ( id ) => {
    state.users = state.users.filter( user => user.id !== parseInt( id ) );
}

const getMaleUsersAmount = () => {
    return state.users.filter( user => user.sexo.toUpperCase() === 'MASCULINO' ).length;
}

const getFemaleUsersAmount = () => {
    return state.users.filter( user => user.sexo.toUpperCase() === 'FEMENINO' ).length;
}

const getUsersAverageAge = () => {
    return state.users.reduce( (a,b) => a + parseInt( b.edad ), 0 ) / state.users.length;
}

export default {
    getUsers: () => [...state.users],
    filterByGender,
    addUser,
    resetFilter,
    getMaleUsersAmount,
    getFemaleUsersAmount,
    getUsersAverageAge,
    deleteUser,
}