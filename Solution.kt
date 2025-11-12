
/**
 * ----- Comment from Leetcode -----
 * 
 * The read4 API is defined in the parent class Reader4.
 * fun read4(buf4:CharArray): Int {}
 */

class Solution : Reader4() {

    private companion object {
        const val MAX_READ_CHARS_PER_CALL_OF_READ4 = 4
        val buffer = CharArray(MAX_READ_CHARS_PER_CALL_OF_READ4)
    }

    private var numberOfActualCharsRead = 0
    private var numberOfRemainingOfCharsToRead = 0

    override fun read(destinationBuffer: CharArray, numberOfCharsToRead: Int): Int {
        numberOfRemainingOfCharsToRead = numberOfCharsToRead

        var numberOfReadChars = read4(buffer)
        updateDestinationBuffer(destinationBuffer, numberOfReadChars)

        while (numberOfReadChars == 4 && numberOfRemainingOfCharsToRead > 0) {
            numberOfReadChars = read4(buffer)
            updateDestinationBuffer(destinationBuffer, numberOfReadChars)
        }

        return numberOfActualCharsRead
    }

    private fun updateDestinationBuffer(destinationBuffer: CharArray, numberOfReadChars: Int) {
        for (i in 0..<min(numberOfReadChars, numberOfRemainingOfCharsToRead)) {
            destinationBuffer[numberOfActualCharsRead] = buffer[i]
            ++numberOfActualCharsRead
        }
        numberOfRemainingOfCharsToRead -= numberOfReadChars
    }
}
