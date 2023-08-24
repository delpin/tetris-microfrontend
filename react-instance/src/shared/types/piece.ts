export const pieces = <const>['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

export type Piece = typeof pieces[number];

export type Rotation = 0 | 1 | 2 | 3;