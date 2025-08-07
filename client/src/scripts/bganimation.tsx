const bgAnimation = document.getElementById('bg-container');
const numberOfColorBoxes = 400;

for (let i = 0; i < numberOfColorBoxes; i++) {
   const colorBox = document.createElement('div');
   colorBox.classList.add('colorBox');
   bgAnimation?.append(colorBox)
}