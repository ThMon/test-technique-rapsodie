export interface ProfitQuery {
  id: number;
  label_id: number;
  date: string;
  daily_profit: number;
}

export interface ProfitState {
  profits: ProfitQuery[];
}
