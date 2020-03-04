type Play = {
  name: string,
  type: string,
}

interface Plays {
  [key: string]: Play;
}

const plays: Plays = {
  hamlet: {
    name: "Hamlet",
    type: "tragedy",
  },
  "as-like": {
    name: "As You Like It",
    type: "comedy",
  },
  othello: {
    name: "Othello",
    type: "tragedy",
  },
}

type IPerformance = {
  playID: string;
  audience: number;
}

type Invoice = {
  customer: string,
  performances: IPerformance[];
}

const invoices: Invoice[] = [
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

function statement(invoice: Invoice, plays: Plays): string {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`
  // const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format

  function format(num: number): string {
    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format

    return format(num)
  }

  for (let perf of invoice.performances) {
    // inline variable
    // let thisAmount = amountFor(perf)
    volumeCredits += volumeCreditsFor(perf)
    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}) seats\n`
    totalAmount += amountFor(perf)
  }

  result += `Amount owned is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`

  return result

  // remove local variable
  function playFor(perf: IPerformance): Play {
    return plays[perf.playID]
  }

  function amountFor(perf: IPerformance): number {
    let result = 0

    switch (playFor(perf).type) {
      case "tragedy":
        result = 40000
        if (perf.audience > 30) {
          result += 1000 * (perf.audience - 30)
        }
        break

        case "comedy":
          result = 30000
          if (perf.audience > 20) {
            result += 10000 + 500 * (perf.audience - 20)
          }
          result += 300 * perf.audience
          break

        default:
          throw new Error(`unknown type: ${playFor(perf).type}`)
    }

    return result
  }

  function volumeCreditsFor(perf: IPerformance): number {
    let result = Math.max(perf.audience - 30, 0)
    if ("comedy" === playFor(perf).type) {
      result += Math.floor(perf.audience / 10)
    }

    return result
  }
}


console.log(statement(invoices[0], plays))
