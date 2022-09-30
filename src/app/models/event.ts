export interface Event {
  id: string;
  dateStart: Date;
  dateEnd: Date;
  name: string;
  imgUrl: string;
}

export interface CreateEvent {
  dateStart: string;
  dateEnd: string;
  name: string;
  imgUrl: string;
}
