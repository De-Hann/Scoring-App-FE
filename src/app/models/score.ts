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


export class LeaderBoardScore {
  id: string | null | undefined = "";
  activityId: string | null | undefined ="";
  categoryName: string | null | undefined = "";
  teamName: string | null | undefined = "";
  score: number | null | undefined = 0;

  constructor(init?: LeaderBoardScore) {
    this.id = init?.id;
    this.activityId = init?.activityId;
    this.categoryName = init?.categoryName;
    this.score = init?.score;
    this.teamName = init?.teamName;
  }
}
