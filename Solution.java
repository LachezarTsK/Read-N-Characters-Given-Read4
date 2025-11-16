
/**
 * ----- Comment from Leetcode -----
 *
 * The read4 API is defined in the parent class Reader4. int read4(char[]
 * buffer4);
 */
public class Solution extends Reader4 {

    private static final int MAX_READ_CHARS_PER_CALL_OF_READ4 = 4;
    private static final char[] buffer = new char[MAX_READ_CHARS_PER_CALL_OF_READ4];

    private int numberOfActualCharsRead;
    private int numberOfRemainingOfCharsToRead;

    public int read(char[] destinationBuffer, int numberOfCharsToRead) {
        numberOfRemainingOfCharsToRead = numberOfCharsToRead;

        int numberOfReadChars = super.read4(buffer);
        updateDestinationBuffer(destinationBuffer, numberOfReadChars);

        while (numberOfReadChars == MAX_READ_CHARS_PER_CALL_OF_READ4 && numberOfRemainingOfCharsToRead > 0) {
            numberOfReadChars = super.read4(buffer);
            updateDestinationBuffer(destinationBuffer, numberOfReadChars);
        }

        return numberOfActualCharsRead;
    }

    private void updateDestinationBuffer(char[] destinationBuffer, int numberOfReadChars) {
        for (int i = 0; i < Math.min(numberOfReadChars, numberOfRemainingOfCharsToRead); ++i) {
            destinationBuffer[numberOfActualCharsRead] = buffer[i];
            ++numberOfActualCharsRead;
        }
        numberOfRemainingOfCharsToRead -= numberOfReadChars;
    }
}
