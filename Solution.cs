
using System;

/**
 * ----- Comment from Leetcode -----
 * 
 * The Read4 API is defined in the parent class Reader4.
 *     int Read4(char[] buf4);
 */

public class Solution : Reader4
{
    private static readonly int MAX_READ_CHARS_PER_CALL_OF_READ4 = 4;
    private static readonly char[] buffer = new char[MAX_READ_CHARS_PER_CALL_OF_READ4];

    private int numberOfActualCharsRead;
    private int numberOfRemainingOfCharsToRead;

    public int Read(char[] destinationBuffer, int numberOfCharsToRead)
    {
        numberOfRemainingOfCharsToRead = numberOfCharsToRead;

        int numberOfReadChars = Read4(buffer);
        UpdateDestinationBuffer(destinationBuffer, numberOfReadChars);

        while (numberOfReadChars == MAX_READ_CHARS_PER_CALL_OF_READ4 && numberOfRemainingOfCharsToRead > 0)
        {
            numberOfReadChars = Read4(buffer);
            UpdateDestinationBuffer(destinationBuffer, numberOfReadChars);
        }

        return numberOfActualCharsRead;
    }

    private void UpdateDestinationBuffer(char[] destinationBuffer, int numberOfReadChars)
    {
        for (int i = 0; i < Math.Min(numberOfReadChars, numberOfRemainingOfCharsToRead); ++i)
        {
            destinationBuffer[numberOfActualCharsRead] = buffer[i];
            ++numberOfActualCharsRead;
        }
        numberOfRemainingOfCharsToRead -= numberOfReadChars;
    }
}
