export class WordleEvaluator {
  /**
   * Evaluates the guess against the answer.
   * Returns a string of same length with characters:
   * 'G' - correct letter and position
   * 'Y' - correct letter, wrong position
   * 'B' - letter not in answer
   */
  static evaluateAttempt(input: string, answer: string): string {
    input = input.toUpperCase();
    answer = answer.toUpperCase();
    
    const result: string[] = Array(input.length).fill('B');
    const answerUsed = Array(answer.length).fill(false);

    // First pass: correct positions
    for (let i = 0; i < input.length; i++) {
      if (input[i] === answer[i]) {
        result[i] = 'G';
        answerUsed[i] = true;
      }
    }

    // Second pass: correct letters, wrong positions
    for (let i = 0; i < input.length; i++) {
      if (result[i] === 'G') continue;

      for (let j = 0; j < answer.length; j++) {
        if (!answerUsed[j] && input[i] === answer[j]) {
          result[i] = 'Y';
          answerUsed[j] = true;
          break;
        }
      }
    }

    return result.join('');
  }
}
