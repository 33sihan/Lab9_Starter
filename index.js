document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      let output = document.querySelector('output');
      let firstNum = document.querySelector('#first-num').value;
      let secondNum = document.querySelector('#second-num').value;
      let operator = document.querySelector('#operator').value;
      //output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
      // Custom error for invalid numbers
      class InvalidInputError extends Error {
        constructor(message) {
            super(message);
            this.name = 'InvalidInputError';
        }
      }
      // Try, Catch and Finally
      try {
        // Check is inputs are empty
        if (!firstNum || !secondNum) {
            throw new Error('Both numbers are required.');
          }
        // Check if inputs are valid numbers
        if (isNaN(firstNum) || isNaN(secondNum)) {
            throw new InvalidInputError('Inputs must be valid numbers.');
        }
        output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
        } catch (error) {
            console.error('Error during calculation:', error.message);
            output.innerHTML = 'Error';
            TrackJS.track('Error during calculation: ' + error.message);
        } finally {
            console.log('Calculation finished.');
        }
      });

// Add event listener for global errors
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error caught:', message);
    TrackJS.track('Global error caught: ' + message);
};

let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

// Event listeners for each button
errorBtns.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.textContent) {
            case 'Console Log':
            console.log('This is a console log message.^^');
            break;
            case 'Console Error':
            console.error('This is a console error message.^^');
            break;
            case 'Console Count':
            console.count('Counter');
            break;
            case 'Console Warn':
            console.warn('This is a console warning message.^^');
            break;
            case 'Console Assert':
            console.assert(false, 'This is a console assert message.^^'); // Fails assertion
            break;
            case 'Console Clear':
            console.clear();
            break;
            case 'Console Dir':
            console.dir(document.body);
            break;
            case 'Console dirxml':
            console.dirxml(document.body);
            break;
            case 'Console Group Start':
            console.group('Group 1');
            console.log('This is inside Group^^');
            break;
            case 'Console Group End':
            console.groupEnd();
            break;
            case 'Console Table':
            console.table([{ name: 'Sihan', age: 21 }, { name: 'Nora', age: 20 }]);
            break;
            case 'Start Timer':
            console.time('timer');
            break;
            case 'End Timer':
            console.timeEnd('timer');
            break;
            case 'Console Trace':
            function foo() {
                wooo();
            }
            function wooo() {
                console.trace();
            }
            foo();
            break;
            case 'Trigger a Global Error':
            // Intentionally causing a global error
            notExistFunction();
            break;
            default:
            break;
        }
    });
});
});