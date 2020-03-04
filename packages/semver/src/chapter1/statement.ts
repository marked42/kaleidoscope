import createStatementData, { StatementData } from './createStatementData'
import { Invoice, invoices } from './invoice'
import { Plays, plays } from './play'

function usd(num: number): string {
  const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format

  return format(num)
}

function renderPlainText(statementData: StatementData) {
  let result = `Statement for ${statementData.customer}\n`
  for (let perf of statementData.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount /100)} (${perf.audience}) seats\n`
  }

  result += `Amount owned is ${usd(statementData.totalAmount / 100)}\n`
  result += `You earned ${statementData.totalVolumeCredits} credits\n`

  return result
}

function statement(invoice: Invoice, plays: Plays): string {
  return renderPlainText(createStatementData(invoice, plays))
}


console.log(statement(invoices[0], plays))
