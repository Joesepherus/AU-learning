/**
 * Modify the `value` stored in the contract
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise of transaction
 */
function setValue(contract) {
  contract.modify(10);
}

module.exports = setValue;
