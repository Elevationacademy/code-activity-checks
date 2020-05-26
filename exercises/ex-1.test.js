
const path = require('path')
const simpleGit = require('simple-git/promise')
const git = simpleGit(path.join(__dirname, '../..'))
const { getCommitByMessage } = require('../utils')


describe('Exercise 1', () => {
  const commitMessage = 'ex1'
  const branchName = 'master'

  it(`You should make a commit that includes the text '${commitMessage}' (on the '${branchName}' branch)`, async (done) => {
    try {
      await git.checkout([branchName])
      const log = await git.log()

      const commit = getCommitByMessage(log, commitMessage)

      expect(log.all.length, `Could not find any new commits (after the original commit)`).toBeGreaterThan(1)
      expect(commit, `Could not find a commit with the text '${commitMessage}'. Please make sure that your commit message contains the text ${commitMessage}`).toBeDefined()
    } catch (e) {
      expect(true, `${e.message}`).toBeFalsy()
    }
    done()
  })
})
