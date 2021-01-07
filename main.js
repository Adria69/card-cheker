// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Iterate every number in a array based on Luhn algorithm
const validateCard = arr => {
    // Make a copy of the array to not mutate the original array
    const array = [...arr];

    // Remove the last number of the array and keep it in a variable for further use
    const lastDigit = array.pop();

    // Reverse the array so iterating from the last element is not necessary (as per Luhn algorithm)
    array.reverse();

    // Looping through the array elements and do the math (as per Luhn algorithm)
    for (i = 0; i < array.length; i += 2) {
        array[i] *= 2;
        (array[i] > 9) ? array[i] -= 9 : false;
    }

    // Returning the last element to the array so its added in the total sum
    array.push(lastDigit);

    // Summing the numbers in the array
    const totalNum = array.reduce((acc, curr) => acc + curr);

    // Checking if the reminder is zero and return true if so
    return (totalNum % 10 === 0) ? true : false;
}

// Using the validateCard() function, check which cards are invalid from the nested (batch) array
const findInvalidCards = (arr) => {

    // Set an empty array to collect all the invalid cards
    let invalidCards = [];

    arr.forEach(item => {
        // Pushing the invalid cards in the array
        !validateCard(item) ? invalidCards.push(item) : false;
    });

    return invalidCards;

}

console.log(findInvalidCards(batch));

// Check which Card issuing company issued the invalid cards
const idInvalidCardCompanies = (arr) => {

    // Set an empty array to collect all the companies that issued invalid cards
    let cardIssuers = [];

    // Get an array of all the invalid cards using the findInvalidCards() function
    const invalidCards = findInvalidCards(arr);

    invalidCards.forEach(item => {

        // Get the first element (number) of the array for further checking
        let firstNumber = item[0];

        // 1. Check the first number to identify the issuer
        // 2. Check if the card issuer is not present in the array before pushing it,
        //    to prevent duplicates issuers
        if (firstNumber === 3) {
            const cardIssuer = 'Amex (American Express)';
            if (cardIssuers.indexOf(cardIssuer) === -1) {
                cardIssuers.push(cardIssuer);
            }

        } else if (firstNumber === 4) {
            const cardIssuer = 'Visa';
            if (cardIssuers.indexOf(cardIssuer) === -1) {
                cardIssuers.push(cardIssuer);
            }
        } else if (firstNumber === 5) {
            const cardIssuer = 'MasterCard';
            if (cardIssuers.indexOf(cardIssuer) === -1) {
                cardIssuers.push(cardIssuer);
            }
        } else if (firstNumber === 6) {
            const cardIssuer = 'Discover';
            if (cardIssuers.indexOf(cardIssuer) === -1) {
                cardIssuers.push(cardIssuer);
            }
        }

    });

    return cardIssuers;

}

console.log(idInvalidCardCompanies(batch));