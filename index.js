const btnGen = document.querySelector('.btnGenerate');
const btnCopyText = document.querySelector('.btnCopyText');
// const btnCopyImage = document.querySelector('.btnCopyImage');

const generatedImg = document.querySelector('.generatedImg');
const generatedText = document.querySelector('.generatedText');

const copyStatus = document.querySelector('.banner');

(async () => {
    const getPhoto = await getRandomPhoto()

    btnGen.addEventListener('click', async () => {
        generatedImg.classList.add('active');

        generatedImg.setAttribute('src', './loading-gif.gif') 
        
        const text = await generateRandomText();
        const img = getPhoto();
    
        console.log(img);
    
        generatedImg.setAttribute('src', img)
        generatedText.textContent = text;
    
        console.log(text, img);
    })

    btnCopyText.addEventListener('click', () => {
        navigator.clipboard.writeText(generatedText.textContent).then(() => {
            copyStatus.querySelector('.successCopy').classList.toggle('active');
            setTimeout(() => {
                copyStatus.querySelector('.successCopy').classList.toggle('active');
            }, 1500)
        }).catch(() => console.log('error'))
    })

    // btnCopyImage.addEventListener('click', () => {
    //     navigator.clipboard.writeText(generatedText.textContent).then(async () => {
    //         const response = await fetch(generatedImg.src);
    //         const image = await response.blob();

    //         console.log(image);

    //     }).catch(() => console.log('error'))
    // })
})()
