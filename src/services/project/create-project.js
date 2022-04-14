import 'dotenv/config'
import fetch from 'node-fetch'
import { parseArgs } from '../../utils/parseArgs.js'

const args = parseArgs(process.argv)

const endpoint = process.env.ENDPOINT
const user = process.env.JIRA_USER
const api_token = process.env.API_TOKEN
const account_id = process.env.ACCOUNT_ID

const { key, name } = args

if (!key || typeof key === 'boolean') {
  console.warn('Please provide a valid "key" value')
  console.log('e.g. ->  npm run create-project key=xxxxx')
  process.exit(1)
}

if (!name || typeof name === 'boolean') {
  console.warn('Please provide a valid "name" value')
  console.log('e.g. ->  npm run create-project name=xxxxx')
  process.exit(1)
}

const bodyData = {
  key: key,
  name: name,
  leadAccountId: account_id,
  avatarId: 10200,
  projectTypeKey: 'software',
  projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-simplified-agility-kanban',
  assigneeType: 'UNASSIGNED',
}

try {
  const respose = await fetch(endpoint + '/rest/api/3/project', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(user + ':' + api_token).toString(
        'base64',
      )}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  })
  console.log(`Response: ${respose.status} ${respose.statusText}`)
  const resJson = await respose.json()
  console.log(JSON.stringify(resJson))
} catch (err) {
  console.warn(err.message)
}
