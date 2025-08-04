export type EvaluatedGuess = string; // Runtime-enforced to be of correct length

export interface RejectedGuess {
  //kind: 'Rejected';
  reason: string;
}

export type GuessResult = EvaluatedGuess | RejectedGuess;
