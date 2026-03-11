/**
 * Calculates Step-Up SIP Returns
 * @param {number} initialSIP - The initial monthly investment amount
 * @param {number} annualRate - The expected annual return rate in percentage
 * @param {number} years - The total duration in years
 * @param {number} stepUpRate - The annual step-up percentage
 * @returns {object} { totalInvested, estimatedReturns, finalValue, yearlyData }
 */
export function calculateStepUpSIP(initialSIP, annualRate, years, stepUpRate) {
  const monthlyRate = annualRate / 12 / 100;
  const stepUpMultiplier = 1 + stepUpRate / 100;
  
  let currentSIP = initialSIP;
  let totalInvested = 0;
  let currentValue = 0;
  const yearlyData = [];
  
  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      totalInvested += currentSIP;
      currentValue = (currentValue + currentSIP) * (1 + monthlyRate);
    }
    yearlyData.push({
      year,
      invested: totalInvested,
      value: Math.round(currentValue)
    });
    // Apply step-up at the end of every year for the next year
    currentSIP = currentSIP * stepUpMultiplier;
  }

  const finalValue = Math.round(currentValue);
  const estimatedReturns = finalValue - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns,
    finalValue,
    yearlyData
  };
}
