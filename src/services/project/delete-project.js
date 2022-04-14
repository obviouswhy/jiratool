import 'dotenv/config'
import fetch from 'node-fetch'
import { parseArgs } from '../../utils/parseArgs.js'

const args = parseArgs(process.argv)

const endpoint = process.env.ENDPOINT
const user = process.env.JIRA_USER
const api_token = process.env.API_TOKEN

const { key, id } = args

if (!id && !key) {
  console.warn('Please provide a valid "key" or "id" value')
  console.log(
    'e.g. ->  npm run delete-project key=xxxxx or npm run delete-project id=xxxxx',
  )

  process.exit(1)
}

if (!id && (!key || typeof key === 'boolean')) {
  console.warn('Please provide a valid "key" value')
  console.log('e.g. ->  npm run delete-project key=xxxxx')
  process.exit(1)
}

if (!key && (!id || typeof id === 'boolean')) {
  console.warn('Please provide a valid "id" value')
  console.log('e.g. ->  npm run delete-project id=xxxxx')
  process.exit(1)
}

const project_id_or_key = key ? key : id

try {
  const respose = await fetch(
    endpoint + '/rest/api/3/project/' + project_id_or_key,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${Buffer.from(user + ':' + api_token).toString(
          'base64',
        )}`,
      },
    },
  )
  console.log(`Response: ${respose.status} ${respose.statusText}`)
  const resText = await respose.text()
  console.log(resText)
} catch (err) {
  console.warn(err.message)
}
