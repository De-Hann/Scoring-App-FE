import { Score } from './score';
import { Team } from './team';

export interface TeamScores {
  team: Team;
  scored: number;
  categories: number;
}

export interface TeamScoresNormalized {
  team: Team;
  score: number;
  maxScore: number;
  normalizedScore: number;
}
