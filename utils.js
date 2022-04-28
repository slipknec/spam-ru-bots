

function getRandomInDiapason(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

async function getRandomPhoto() {
    const taken = [];

    const photoUrls = (await (await fetch('./populated/photos.json')).json()).photos;

    console.log(photoUrls);

    return function innerFn (photoUrlsList = photoUrls) {
        const free = photoUrlsList.find(url => !Boolean(taken.includes(url)));

        if (Boolean(free)) {
            taken.push(free);
            return free;
        } else {
            taken.length = 0;
            return innerFn(photoUrlsList);
        }
    };
};
