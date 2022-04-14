import 'dotenv/config'
import fetch from 'node-fetch'
import { parseArgs } from '../../utils/parseArgs.js'

const args = parseArgs(process.argv)

const endpoint = process.env.ENDPOINT
const user = process.env.JIRA_USER
const api_token = process.env.API_TOKEN

const { summary, project_id, project_key } = args

if (!project_id && !project_key) {
  console.warn('Please provide a valid "project_key" or "project_id" value')
  console.log(
    'e.g. ->  npm run create-issue project_key=xxxxx or npm run create-issue project_id=xxxxx',
  )
  process.exit(1)
}

if (!project_id && (!project_key || typeof project_key === 'boolean')) {
  console.warn('Please provide a valid "project_key" value')
  console.log('e.g. ->  npm run create-issue key=xxxxx')
  process.exit(1)
}

if (!project_key && (!project_id || typeof project_id === 'boolean')) {
  console.warn('Please provide a valid "project_id" value')
  console.log('e.g. ->  npm run create-issue project_id=xxxxx')
  process.exit(1)
}

if (!summary || typeof summary === 'boolean') {
  console.warn('Please provide a valid "summary" value')
  console.log(
    'e.g. ->  npm run create-issue summary=xxxxx or npm run create-issue summary="xxxxx xxx xxxxx"',
  )
  process.exit(1)
}

const project = project_key ? { key: project_key } : { id: project_id }

const bodyData = {
  fields: {
    project,
    summary,
    issuetype: {
      name: 'Task',
    },
  },
}

try {
  const respose = await fetch(endpoint + '/rest/api/3/issue', {
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
