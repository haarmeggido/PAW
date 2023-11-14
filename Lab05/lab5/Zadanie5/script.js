
const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];

const countries = [
        { name: 'Nigeria', continent: 'Africa'},
        { name: 'Nepal', continent: 'Asia'},
        { name: 'Angola', continent: 'Africa'},
        { name: 'Poland', continent: 'Europe'},
        { name: 'Kenya', continent: 'Africa'},
        { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
        {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
        {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
        {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
        {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];

// 1. Na stronach internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)
const namesWithR = names.filter(name => name.includes('r'));
const namesWithRList = document.createElement('ul');
namesWithR.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    namesWithRList.appendChild(li);
});
document.getElementById('app').appendChild(namesWithRList);

/* 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
            sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
            inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
            Nesteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2
            */
const isLessThan9 = numbers.every(number => number < 9);
const isLessThan6 = numbers.some(number => number < 6);
const incrementedNumbers = numbers.map(number => number + 1);
const oddNumbers = incrementedNumbers.filter(number => number % 2 !== 0);
const sumOfOddNumbers = oddNumbers.reduce((acc, curr) => acc + curr, 0);
const result2 = `Is every number less than 9? ${isLessThan9}. Is there any number less than 6? ${isLessThan6}. Sum of odd numbers: ${sumOfOddNumbers}.`;
const result2El = document.createElement('p');
result2El.textContent = result2;
document.getElementById('app').appendChild(result2El);

// 3. Na stronach internetowych wyświetlają się kraje z Europy
const europeanCountries = countries.filter(country => country.continent === 'Europe');
const europeanCountriesList = document.createElement('ul');
europeanCountries.forEach(country => {
    const li = document.createElement('li');
    li.textContent = country.name;
    europeanCountriesList.appendChild(li);
});
document.getElementById('app').appendChild(europeanCountriesList);

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.
const replicantPeople = people.filter(person => person.email.includes('replicant.io'));
const replicantPeopleList = document.createElement('ul');
replicantPeople.forEach(person => {
    const li = document.createElement('li');
    li.textContent = person.name;
    replicantPeopleList.appendChild(li);
});
document.getElementById('app').appendChild(replicantPeopleList);

// 5. usuwanie zduplikowanych wartości z tablicy nazwaduplikatu
const uniqueNames = [...new Set(duplicateName)];
const uniqueNamesList = document.createElement('ul');
uniqueNames.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    uniqueNamesList.appendChild(li);
});
document.getElementById('app').appendChild(uniqueNamesList);
