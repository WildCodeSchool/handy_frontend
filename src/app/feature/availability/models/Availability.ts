export type Availability = {
  id?: number;
  startTime: string;
  endTime: string;
  userEmail: string;
  status: 'available' | 'booked';
};
