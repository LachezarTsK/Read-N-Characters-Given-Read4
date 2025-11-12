
/**
 * ----- Comment from Leetcode -----
 *
 * Definition for read4()
 * read4 = function(buf4: string[]): number {
 *     ...
 * };
 */

var solution = function(read4: any) {

    const MAX_READ_CHARS_PER_CALL_OF_READ4 = 4;
    const buffer: string[] = new Array(MAX_READ_CHARS_PER_CALL_OF_READ4);

    let numberOfActualCharsRead = 0;
    let numberOfRemainingOfCharsToRead = 0;

    return function(destinationBuffer: string[], numberOfCharsToRead: number): number {
        numberOfRemainingOfCharsToRead = numberOfCharsToRead;

        let numberOfReadChars = read4(buffer);
        updateDestinationBuffer(destinationBuffer, numberOfReadChars);

        while (numberOfReadChars === 4 && numberOfRemainingOfCharsToRead > 0) {
            numberOfReadChars = read4(buffer);
            updateDestinationBuffer(destinationBuffer, numberOfReadChars);
        }

        return numberOfActualCharsRead;
    };

    function updateDestinationBuffer(destinationBuffer: string[], numberOfReadChars: number): void {
        for (let i = 0; i < Math.min(numberOfReadChars, numberOfRemainingOfCharsToRead); ++i) {
            destinationBuffer[numberOfActualCharsRead] = buffer[i];
            ++numberOfActualCharsRead;
        }
        numberOfRemainingOfCharsToRead -= numberOfReadChars;
    }
};
