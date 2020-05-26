
const path = require('path')
const simpleGit = require('simple-git/promise')
const git = simpleGit(path.join(__dirname, '../..'))
const { getCommitByMessage } = require('../utils')


describe('Exercise 4', () => {
  const branchName = 'master'
  const commitMessage = 'ex1'

  it(`You should revert your original commit (from exercise 1) that has a commit message of '${commitMessage}'.`, async (done) => {
    try {
      await git.checkout([branchName])
      const log = await git.log()
      const srcCommit = getCommitByMessage(log, commitMessage)
      const commit = log.latest

      expect(log.all.length, `Could not find enough commits on the '${branchName}' branch. Expected at least 4 commits instead found ${log.all.length}`).toBeGreaterThan(3)
      expect(commit.message, `When reverting a previous commit, a new commit is created at the head of the logs with a message that contains the hash of the previous commit. The new commit's message should contain the hash '${srcCommit.hash}'. The resulting message was '${commit.message}'`).toContain(srcCommit.hash)
    } catch (e) {
      expect(true, `${e.message}`).toBeFalsy()
    }
    done()
  })
  afterAll((done) => {
    done()
  })
})
