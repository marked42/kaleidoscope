export type IPerformance = {
  playID: string;
  audience: number;
}

export type Invoice = {
  customer: string,
  performances: IPerformance[];
}

export const invoices: Invoice[] = [
  {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  },
]
