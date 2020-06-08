
const path = require('path')
const simpleGit = require('simple-git/promise')
const git = simpleGit(path.join(__dirname, '../..'))
const { getCommitByMessage } = require('../utils')


describe('Exercise 4', () => {
  const branchName = 'master'
  const commitMessage = 'ex4'

  it(`You should create two commits, one with a message that contains '${commitMessage}' and the other with any message you'd like. You should reset your commit history to the first of the two.`, async (done) => {
    try {
      await git.checkout([branchName])
      const log = await git.log()
      const srcCommit = getCommitByMessage(log, commitMessage)
      const commit = log.latest

      expect(commit.message, `When reseting to the previous commit, that commit should now be at the head of the logs. The message of the HEAD commit should contain ${commitMessage}. Instead the message was ${commit.message}`).toContain(commitMessage)
      expect(commit.hash, `When reseting to the previous commit, that commit should now be at the head of the logs. The commit at the HEAD should have a hash of '${srcCommit.hash}'. Instead the hash was '${commit.hash}'`).toContain(srcCommit.hash)
      expect(log.all.length, `Could not find enough commits on the '${branchName}' branch. Expected at least 4 commits instead found ${log.all.length}`).toBeGreaterThan(3)
    } catch (e) {
      expect(true, `${e.message}`).toBeFalsy()
    }
    done()
  })
  afterAll((done) => {
    done()
  })
})
