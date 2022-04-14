#!/usr/bin/env node
import 'dotenv/config'
import fs from 'fs/promises'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { execSync } from 'child_process'

let user = process.env.JIRA_USER
let endpoint = process.env.ENDPOINT
let api_token = process.env.API_TOKEN
let account_id = process.env.ACCOUNT_ID

// ________________________________________________________________________________
// _________________________________ setUserData __________________________________
// ________________________________________________________________________________

const askForUser = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'user',
      message: 'What is Jira Username?',
      default: 'snogal.bc@gmail.com',
    },
  ])
  return answer.user
}

const askForEndpoint = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'endpoint',
      message: 'What is your Jira Endpoint?',
      default: 'https://snogal.atlassian.net',
    },
  ])
  return answer.endpoint
}

const askForToken = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'token',
      message: 'What is Atlassian API Token?',
    },
  ])
  return answer.token
}

const askForAccountID = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'acc_id',
      message: 'What is Account ID?',
    },
  ])
  return answer.acc_id
}

const setUserData = async () => {
  user = await askForUser()
  endpoint = await askForEndpoint()
  api_token = await askForToken()
  account_id = await askForAccountID()

  const data = `JIRA_USER = ${user}\nENDPOINT = ${endpoint}\nAPI_TOKEN = ${api_token}\nACCOUNT_ID = ${account_id}`
  await fs.writeFile('.env', data)
  console.log('')
  console.log(
    `Your ${chalk.green.bold(
      'User Information',
    )} has been written in a ${chalk.green.bold('.env')} file`,
  )
}

// ________________________________________________________________________________
// ________________________________ checkUserData _________________________________
// ________________________________________________________________________________

const checkUserData = () => {
  const userData = [
    { name: 'JIRA_USER', value: user },
    { name: 'ENDPOINT', value: endpoint },
    { name: 'API_TOKEN', value: api_token },
    { name: 'ACCOUNT_ID', value: account_id },
  ]
  console.log('')
  userData.forEach(data =>
    // Print in this format -> "ENV_NAME = value"
    console.log(
      `   ${chalk.green.bold(data.name)} ${chalk.magenta('=')} ${chalk.blue(
        data.value,
      )}`,
    ),
  )
}

// ________________________________________________________________________________
// ________________________________ createProject _________________________________
// ________________________________________________________________________________

const handleCreateProject = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'key',
      message: `Write the ${chalk.green.underline.bold(
        'Key',
      )} for the new ${chalk.bold('Project')}: `,
    },
    {
      type: 'input',
      name: 'name',
      message: `Write the ${chalk.green.underline.bold(
        'Name',
      )} for the new ${chalk.bold('Project')}: `,
    },
  ])
  console.log('')
  return execSync(
    `npm run create-project key=${answer.key} name=${answer.name}`,
    { stdio: 'inherit' },
  )
}

// ________________________________________________________________________________
// ________________________________ deleteProject _________________________________
// ________________________________________________________________________________

const handleDeleteProject = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Which field do you want to use?',
      default: 0,
      choices: [`Project ${chalk.bold('ID')}`, `Project ${chalk.bold('Key')}`],
    },
    {
      type: 'input',
      name: 'id',
      message: `Write the ${chalk.green.underline.bold(
        'ID',
      )} of the ${chalk.bold('Project')}: `,
      when: answers => answers.type === `Project ${chalk.bold('ID')}`,
    },
    {
      type: 'input',
      name: 'key',
      message: `Write the ${chalk.green.underline.bold(
        'Key',
      )} of the ${chalk.bold('Project')}: `,
      when: answers => answers.type === `Project ${chalk.bold('Key')}`,
    },
  ])

  console.log('')

  if (answer.key) {
    return execSync(`npm run delete-project key=${answer.key}`, {
      stdio: 'inherit',
    })
  }
  return execSync(`npm run delete-project id=${answer.id}`, {
    stdio: 'inherit',
  })
}

// ________________________________________________________________________________
// _________________________________ createIssue __________________________________
// ________________________________________________________________________________

const handleCreateIssue = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Which field do you want to use?',
      default: 0,
      choices: [`Project ${chalk.bold('ID')}`, `Project ${chalk.bold('Key')}`],
    },
    {
      type: 'input',
      name: 'id',
      message: `Write the ${chalk.green.underline.bold(
        'ID',
      )} of the ${chalk.bold('Project')}: `,
      when: answers => answers.type === `Project ${chalk.bold('ID')}`,
    },
    {
      type: 'input',
      name: 'key',
      message: `Write the ${chalk.green.underline.bold(
        'Key',
      )} of the ${chalk.bold('Project')}: `,
      when: answers => answers.type === `Project ${chalk.bold('Key')}`,
    },
    {
      type: 'input',
      name: 'summary',
      message: `Write the ${chalk.green.underline.bold(
        'Summary',
      )} for this ${chalk.bold('Issue')}: `,
    },
  ])

  console.log('')
  if (answer.key) {
    return execSync(
      `npm run create-issue project_key=${answer.key} summary="${answer.summary}"`,
      { stdio: 'inherit' },
    )
  }

  return execSync(
    `npm run create-issue project_id=${answer.id} summary="${answer.summary}"`,
    { stdio: 'inherit' },
  )
}

// ________________________________________________________________________________
// ________________________________ deleteIssue _________________________________
// ________________________________________________________________________________

const handleDeleteIssue = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Which field do you want to use?',
      default: 0,
      choices: [`Issue ${chalk.bold('ID')}`, `Issue ${chalk.bold('Key')}`],
    },
    {
      type: 'input',
      name: 'id',
      message: `Write the ${chalk.green.underline.bold(
        'ID',
      )} of the ${chalk.bold('Issue')}: `,
      when: answers => answers.type === `Issue ${chalk.bold('ID')}`,
    },
    {
      type: 'input',
      name: 'key',
      message: `Write the ${chalk.green.underline.bold(
        'Key',
      )} of the ${chalk.bold('Issue')}: `,
      when: answers => answers.type === `Issue ${chalk.bold('Key')}`,
    },
  ])

  console.log('')

  if (answer.key) {
    return execSync(`npm run delete-issue key=${answer.key}`, {
      stdio: 'inherit',
    })
  }
  return execSync(`npm run delete-issue id=${answer.id}`, {
    stdio: 'inherit',
  })
}

// ________________________________________________________________________________
// _____________________________________ Exit _____________________________________
// ________________________________________________________________________________

const handleExit = () => {
  process.exit(0)
}

const init = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      default: 0,
      choices: [
        'Set/Reset User information',
        'Check User information',
        'Create a Jira Project',
        'Delete a Jira Project',
        'Create an Issue',
        'Delete an Issue',
        'Exit',
      ],
    },
  ])
  return answer.action
}

// ________________________________________________________________________________
// ________________________________________________________________________________

const action = await init()

if (action === 'Set/Reset User information') setUserData()
if (action === 'Check User information') checkUserData()
if (action === 'Create a Jira Project') handleCreateProject()
if (action === 'Delete a Jira Project') handleDeleteProject()
if (action === 'Create an Issue') handleCreateIssue()
if (action === 'Delete an Issue') handleDeleteIssue()
if (action === 'Exit') handleExit()
