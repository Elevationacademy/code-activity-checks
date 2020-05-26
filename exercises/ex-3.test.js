
const path = require('path')
const simpleGit = require('simple-git/promise')
const git = simpleGit(path.join(__dirname, '../..'))
const { getCommitByMessage } = require('../utils')


describe('Exercise 3', () => {
  const srcBranchName = 'readme'
  const branchName = 'master'
  const commitMessage = 'added readme'

  it(`You should merge your '${srcBranchName}' branch to your '${branchName}' branch.`, async (done) => {
    try {
      await git.checkout([srcBranchName])
      let log = await git.log()
      const srcCommit = getCommitByMessage(log, commitMessage)

      await git.checkout([branchName])
      log = await git.log()
      const commit = getCommitByMessage(log, commitMessage)

      expect(log.all.length, `Could not find enough commits on the 'master' branch. Expected at least 3 commits instead found ${log.all.length}`).toBeGreaterThan(2)
      expect(commit, `Could not find a commit with the text '${commitMessage}' on the '${branchName}' branch. Please make sure that you make a commit on the '${srcBranchName}' branch where the message contains the word ${commitMessage}, and you merge the branch into '${branchName}'`).toBeDefined()
      expect(commit.hash, `When merging your '${srcBranchName}' to '${branchName}', the commit with message '${commitMessage}' should have the same hash (on both branches). When checking the log, the commit on branch '${srcBranchName}' has a hash of '${srcCommit.hash}' and the commit on branch '${branchName}' has a hash of '${commitMessage.hash}'`).toBe(srcCommit.hash)
    } catch (e) {
      expect(true, `${e.message}`).toBeFalsy()
    }
    done()
  })
  afterAll((done) => {
    done()
  })
})
