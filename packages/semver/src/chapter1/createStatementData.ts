import { IPerformance, Invoice } from './invoice'
import { Play, Plays } from './play'

export type EnhancedPerformance = {
  play: Play;
  amount: number;
  volumeCredits: number;
} & IPerformance;

export interface StatementData {
  customer: string;
  performances: EnhancedPerformance[];
  totalAmount: number;
  totalVolumeCredits: number;
}

class PerformanceCalculator {
    public readonly performance: IPerformance;
    public readonly play: Play;

    constructor(perf: IPerformance, play: Play) {
        this.performance = perf
        this.play = play
    }

    public get amount(): number {
        throw new Error("subclass's resposibility")
    }

    public get volumeCredits(): number {
        return Math.max(this.performance.audience - 30, 0)
    }
}

class TragedyPerformanceCalculator extends PerformanceCalculator {
    public get amount(): number {
        let result = 40000
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30)
        }
        return result
    }
}

class ComedyPerformanceCalculator extends PerformanceCalculator {
    public get amount(): number {
        let result = 30000
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20)
        }
        result += 300 * this.performance.audience

        return result
    }

    public get volumeCredits(): number {
        return super.volumeCredits + Math.floor(this.performance.audience / 5)
    }
}

function createPerformanceCalculator(perf: IPerformance, play: Play) {
    switch (play.type) {
        case "tragedy":
            return new TragedyPerformanceCalculator(perf, play)
        
        case "comedy":
            return new ComedyPerformanceCalculator(perf, play)
        
        default:
            throw new Error(`unknow play type: ${play.type}`)
    }
}

export default function createStatementData(invoice: Invoice, plays: Plays): StatementData {
    return {
        customer: invoice.customer,
        performances: invoice.performances.map(enrichPerformance),
        get totalAmount(): number {
            return this.performances.reduce((total, p) => total + p.amount, 0)
        },
        get totalVolumeCredits(): number {
            return this.performances.reduce((total, p) => total + p.volumeCredits, 0)
        }
    }

    // remove local variable
    function playFor(perf: IPerformance): Play {
        return plays[perf.playID]
    }

    function enrichPerformance(perf: IPerformance): EnhancedPerformance {
        const performanceCalculator = createPerformanceCalculator(perf, playFor(perf))

        return {
            ...perf,
            play: performanceCalculator.play,
            amount: performanceCalculator.amount,
            volumeCredits: performanceCalculator.volumeCredits,
        }
    }
}
