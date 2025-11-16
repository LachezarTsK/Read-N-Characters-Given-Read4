
using namespace std;

/**
* ----- Comment from Leetcode -----
* 
* The read4 API is defined in the parent class Reader4.
*     int read4(char *buf4);
*/

class Solution {

    static const int MAX_READ_CHARS_PER_CALL_OF_READ4 = 4;
    inline static char* buffer = new char[MAX_READ_CHARS_PER_CALL_OF_READ4];

    int numberOfActualCharsRead = 0;
    int numberOfRemainingOfCharsToRead = 0;

public:
    int read(char* destinationBuffer, int numberOfCharsToRead) {
        numberOfRemainingOfCharsToRead = numberOfCharsToRead;

        int numberOfReadChars = read4(buffer);
        updateDestinationBuffer(destinationBuffer, numberOfReadChars);

        while (numberOfReadChars == MAX_READ_CHARS_PER_CALL_OF_READ4 && numberOfRemainingOfCharsToRead > 0) {
            numberOfReadChars = read4(buffer);
            updateDestinationBuffer(destinationBuffer, numberOfReadChars);
        }

        return numberOfActualCharsRead;
    }

private:
    void updateDestinationBuffer(char* destinationBuffer, int numberOfReadChars) {
        for (int i = 0; i < min(numberOfReadChars, numberOfRemainingOfCharsToRead); ++i) {
            destinationBuffer[numberOfActualCharsRead] = buffer[i];
            ++numberOfActualCharsRead;
        }
        numberOfRemainingOfCharsToRead -= numberOfReadChars;
    }
};
