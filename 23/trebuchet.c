#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char* words[] = {"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
const int numbers[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};

int isWord(char* string, size_t len, size_t i) {
	char temp[50] = "\0"; 
	for (size_t j = 0; j < len - i; j++) {
		strcpy(temp, string);
		temp[j] = '\0';
		for (size_t k = 0; k < 9; k++) {
			if (strcmp(temp, words[k]) == 0) {
				return numbers[k];
			}
		}
	}
	return -1;
}

void solve(char* line, size_t len, char* answer) {
	char current;
	char first = '\0';
	char last = '\0';
	for (size_t i = 0; i < len - 1; i++) {
		int val = isWord(line + i, len, i);
		if (val != -1) {
			if (first == '\0') {
				first = val + '0';
			}			
			last = val + '0';

		}
		current = line[i];
		if (isdigit(current) != 0) {
			if (first == '\0') {
				first = current;
			}			
			last = current;
		}
	}
	answer[0] = first;
	answer[1] = last;
}
int main() {
	FILE* pFile;
	char* pLine = NULL;
	size_t len = 0;
	size_t read;

	int finalNumber = 0;

	pFile = fopen("sample.txt", "r");
	if (pFile == NULL) {
		exit(EXIT_FAILURE);
	}

	while ((read = getline(&pLine, &len, pFile)) != -1) {
		char answer[2];
		solve(pLine, read, answer);
		finalNumber += atoi(answer);
	}

	printf("Answer: %d\n", finalNumber);

	fclose(pFile);
	if (pLine) {
		free(pLine);
	}
	exit(EXIT_SUCCESS);
}


