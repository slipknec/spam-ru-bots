// const {groupOne, groupTwo} = require('./populated/cities.json');



async function generateRandomText() {

    function generateRandomTechnique(entityTypes) {
        const chosenTechniqueTypes = [];
        const maxQuantityOfOneTypeEntity = 20;
        const quantityOfTechniqueTypes = getRandomInDiapason(1, entityTypes.length - 2);

        while (chosenTechniqueTypes.length !== quantityOfTechniqueTypes) {
            const randType = entityTypes[getRandomInDiapason(0, entityTypes.length - 1)];

            if (!chosenTechniqueTypes.includes(randType)) {
                chosenTechniqueTypes.push(randType)
            }
        }

        const result = chosenTechniqueTypes.map(item => {
            return `${getRandomInDiapason(6, maxQuantityOfOneTypeEntity)} ${Math.random() < 0.8 ? 'ед.' : 'eдин.'} ${item}`;
        })

        return result;
    }

    const parts = Object.values(await (await fetch('./populated/sentences.json')).json())


    const [
        start,
        near,
        cities,
        vision,
        techniqueGroup,
        technique,
        department,
        which,
        movement,
        direction,
        entities,
        entityTypes
    ] = parts;

    const sentenceVariants = [
        start,
        near,
        cities,
        vision,
        techniqueGroup,
        technique,
        department,
        which,
        movement,
        direction,
        cities,
        entities,
    ]

        let string = '';
        let isFirstSentenceEnded = false;
        let isFirstCityUsed = false;

        const {groupOne, groupTwo} = await (await fetch('./populated/cities.json')).json();

        sentenceVariants.forEach((part, index) => {
            const min = 0;
            const max = part.length;

            const rand = Math.floor(min + Math.random() * (max - min));

            if (typeof part[rand] === 'object' && part[rand].hasOwnProperty('cityName')) {

                if (isFirstCityUsed) {
                    string += groupTwo[getRandomInDiapason(0, groupTwo.length)].cityType[getRandomInDiapason(0, groupTwo[rand].cityType.length - 1)] + ' ' + groupTwo[getRandomInDiapason(0, groupTwo.length)].cityName + " ";
                } else {
                    string += groupOne[getRandomInDiapason(0, groupOne.length)].cityType[getRandomInDiapason(0, groupOne[rand].cityType.length - 1)] + ' ' + groupOne[getRandomInDiapason(0, groupOne.length)].cityName + " ";
                    isFirstCityUsed = true;
                }
            } else {
                string += part[rand] + ' ';
            }

            if (typeof part[0] === 'object' && part[0].cityName) {
                if (isFirstSentenceEnded) {
                    string = string.slice(0, string.length - 1) + '. ';
                } else {
                    isFirstSentenceEnded = true;
                }
            }
        });

    string += `${generateRandomTechnique(entityTypes).join(Math.random() > 0.5 ? ', ' : ' ')}`;

    return string;
}

generateRandomText().then(data => console.log(data));

console.log();