export interface Score {
  id: string;
  categoryId: string;
  teamId: string;
  judgeId: string;
  total: string;
}

export interface UpdateScoreRequest {
  userId: string;
  teamId: string;
  score: number;
}
