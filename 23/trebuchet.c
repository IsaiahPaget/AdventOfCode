#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>

void solve(char* line, size_t len, char* answer) {
	char current;
	char first = '\0';
	char last = '\0';
	for (size_t i = 0; i < len - 1; i++) {
		current = line[i];
		if (isdigit(current) != 0) {
			printf("%c isDigit\n", line[i]);
			if (first == '\0') {
				first = current;
			}			
			last = current;
		}
	}
	printf("first: %c\n", first);
	printf("last: %c\n", last);
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
		printf("%s", pLine);
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


