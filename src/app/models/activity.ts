export interface Activity {
  id: string;
  eventId: string;
  name: string;
  imgUrl: string;
}

export interface CreateActivity {
  name: string;
  eventId: string;
  imgUrl: string;
}
