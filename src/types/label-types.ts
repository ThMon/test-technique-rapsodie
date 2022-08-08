export interface LabelQuery {
  id: number;
  name: string;
  funds: number;
  league_id: number;
}

export interface LabelState {
  labels: LabelQuery[];
  selectedLabel: LabelQuery | null;
}
