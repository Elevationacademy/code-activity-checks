
const path = require('path')
const simpleGit = require('simple-git/promise')
const git = simpleGit(path.join(__dirname, '../..'))
const { getCommitByMessage } = require('../utils')


describe('Exercise 2', () => {
  const branchName = 'readme'
  const commitMessage = 'readme'

  it(`You should create a new branch called '${branchName}'.`, async (done) => {
    const branch = await git.branch()

    expect(branch.all.length, `Could not find any other branches except for the 'master' branch. Make sure to 'checkout' to a new branch called '${branchName}'`).toBeGreaterThan(1)
    expect(branch.all.includes(branchName), `Could not find a branch with the name '${branchName}'. When creating the new branch make sure it has the name '${branchName}`).toBeDefined()
    done()
  })
  it(`When on your '${branchName}' branch you should add a 'README.md' file with some content, and then commit it with a message that contains the text '${commitMessage}'.`, async (done) => {
    try {
      await git.checkout([branchName])
      const log = await git.log()
      const commit = getCommitByMessage(log, commitMessage)

      expect(commit, `Could not find a commit with the text '${commitMessage}' on the '${branchName}' branch. Please make sure that your commit message contains the text ${commitMessage}`).toBeDefined()
      expect(log.all.length, `Could not find enough commits on the '${branchName}' branch. Expected at least 3 commits instead found ${log.all.length}`).toBeGreaterThan(2)
    } catch (e) {
      expect(true, `${e.message}`).toBeFalsy()
    }
    done()
  })
  afterAll((done) => {
    done()
  })
})
