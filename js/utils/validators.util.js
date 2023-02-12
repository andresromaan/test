/**
 * Validates that the input only has numbers
 * @param {Event} event 
 */
export const validateOnlyNumbers =  ( word ) =>  {

    if ( isNaN( word ) ) {
        return false;
    }
    return true;

}

export const validateOnlyLetters = ( word ) => {
    const pattern = /^[A-Za-z ]+$/;
    return pattern.test( word );
}

/**
 * Validates the word is between min and max length
 * @param {String} word 
 * @param {Integer} min 
 * @param {Integer} max 
 * @returns {Boolean} - true if validated, false if not.
 */
export const validateLength = ( word, min, max ) => {

    if( word.length >= min && word.length <= max ) {
        return true;
    }

    return false
}

/**
 * Validates that the email only hast letters, numbers, @ symbol and an extension
 * @param {String} email 
 * @returns {Boolean} - true if the email is valid, false if not
 */
export const validateEmail = ( email ) => {

    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[com|net|cl|es]+$/;
    return pattern.test( email );

}

/**
 * Validates that the password has between 8 and 16 characters
 * @param {String} password 
 * @returns {Boolean} - true if the password is valid, false if not
 */
export const validatePassword = ( password ) => {
    
    if( password.length < 8 || password.length > 16 ) {
        return false;
    }

    return true;
}