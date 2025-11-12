
/**
 * ----- Comment from Leetcode -----
 * 
 * Definition for read4()
 * 
 * @param {character[]} buf4 Destination buffer
 * @return {number} The number of actual characters read
 * read4 = function(buf4) {
 *     ...
 * };
 */

/**
 * @param {function} read4
 * @return {function}
 */
var solution = function (read4) {

    const MAX_READ_CHARS_PER_CALL_OF_READ4 = 4;
    const buffer = new Array(MAX_READ_CHARS_PER_CALL_OF_READ4);

    let numberOfActualCharsRead = 0;
    let numberOfRemainingOfCharsToRead = 0;

    /**
     * @param {string[]} destinationBuffer
     * @param {number} numberOfCharsToRead
     * @return {number} 
     */
    return function (destinationBuffer, numberOfCharsToRead) {
        numberOfRemainingOfCharsToRead = numberOfCharsToRead;

        let numberOfReadChars = read4(buffer);
        updateDestinationBuffer(destinationBuffer, numberOfReadChars);

        while (numberOfReadChars === 4 && numberOfRemainingOfCharsToRead > 0) {
            numberOfReadChars = read4(buffer);
            updateDestinationBuffer(destinationBuffer, numberOfReadChars);
        }

        return numberOfActualCharsRead;
    };

    function updateDestinationBuffer(destinationBuffer, numberOfReadChars) {
        for (let i = 0; i < Math.min(numberOfReadChars, numberOfRemainingOfCharsToRead); ++i) {
            destinationBuffer[numberOfActualCharsRead] = buffer[i];
            ++numberOfActualCharsRead;
        }
        numberOfRemainingOfCharsToRead -= numberOfReadChars;
    }
};
