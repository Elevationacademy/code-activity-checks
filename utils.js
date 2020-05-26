const getCommitByMessage = (log, message) => log.all.find(c => c.message.includes(message))

module.exports = { getCommitByMessage }