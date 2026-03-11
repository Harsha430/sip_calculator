/**
 * Calculates Standard SIP Returns
 * @param {number} monthlyInvestment - The monthly investment amount (P)
 * @param {number} annualRate - The expected annual return rate in percentage
 * @param {number} years - The total duration in years
 * @returns {object} { totalInvested, estimatedReturns, finalValue, yearlyData }
 */
export function calculateSIP(monthlyInvestment, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = years * 12;
  
  let totalInvested = 0;
  let currentValue = 0;
  const yearlyData = [];
  
  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      totalInvested += monthlyInvestment;
      currentValue = (currentValue + monthlyInvestment) * (1 + monthlyRate);
    }
    yearlyData.push({
      year,
      invested: totalInvested,
      value: Math.round(currentValue)
    });
  }

  // Exact Future Value formula for cross-validation on the final output
  // FV = P × ((1 + r)^n − 1) / r × (1 + r)
  const finalValue = Math.round(
    monthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate)
  );

  const estimatedReturns = finalValue - totalInvested;

  return {
    totalInvested,
    estimatedReturns,
    finalValue,
    yearlyData
  };
}
