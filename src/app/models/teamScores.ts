import { Score } from './score';
import { Team } from './team';

export interface TeamScores {
  team: Team;
  score: number;
  maxScore: number;
  myScore: number;
}
