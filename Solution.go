
package main

/**
* ----- Comment from Leetcode -----
* 
* The read4 API is already defined for you.
*
*     read4 := func(buf4 []byte) int
*
* // Below is an example of how the read4 API can be called.
* file := File("abcdefghijk") // File is "abcdefghijk", initially file pointer (fp) points to 'a'
* buf4 := make([]byte, 4) // Create buffer with enough space to store characters
* read4(buf4) // read4 returns 4. Now buf = ['a','b','c','d'], fp points to 'e'
* read4(buf4) // read4 returns 4. Now buf = ['e','f','g','h'], fp points to 'i'
* read4(buf4) // read4 returns 3. Now buf = ['i','j','k',...], fp points to end of file
*/

const MAX_READ_CHARS_PER_CALL_OF_READ4 = 4

var numberOfActualCharsRead int
var numberOfRemainingOfCharsToRead int
var buffer = make([]byte, MAX_READ_CHARS_PER_CALL_OF_READ4)

var solution = func(read4 func([]byte) int) func([]byte, int) int {

    return func(destinationBuffer []byte, numberOfCharsToRead int) int {
        numberOfActualCharsRead = 0
        numberOfRemainingOfCharsToRead = numberOfCharsToRead

        var numberOfReadChars = read4(buffer)
        updateDestinationBuffer(destinationBuffer, numberOfReadChars)

        for numberOfReadChars == MAX_READ_CHARS_PER_CALL_OF_READ4 && numberOfRemainingOfCharsToRead > 0 {
            numberOfReadChars = read4(buffer)
            updateDestinationBuffer(destinationBuffer, numberOfReadChars)
        }

        return numberOfActualCharsRead
    }
}

func updateDestinationBuffer(destinationBuffer []byte, numberOfReadChars int) {
    for i := 0; i < min(numberOfReadChars, numberOfRemainingOfCharsToRead); i++ {
        destinationBuffer[numberOfActualCharsRead] = buffer[i]
        numberOfActualCharsRead++
    }
    numberOfRemainingOfCharsToRead -= numberOfReadChars
}
