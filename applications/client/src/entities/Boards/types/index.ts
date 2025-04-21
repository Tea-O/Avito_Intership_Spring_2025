export interface Boards {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export interface BoardsData {
  data: Boards[];
}
