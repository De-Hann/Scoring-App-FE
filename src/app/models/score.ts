export interface Score {
  id: string;
  categoryId: string;
  teamId: string;
  judgeId: string;
  total: string;
}

export interface UpdateScoreRequest {
  userId: string;
  categoryId: string;
  score: number;
}


export class LeaderBoardScore {
  categoryName: string | null | undefined = "";
  teamName: string | null | undefined = "";
  score: number | null | undefined = 0;

  constructor(init?: LeaderBoardScore) {
    this.categoryName = init?.categoryName;
    this.score = init?.score;
    this.teamName = init?.teamName;
  }
}
