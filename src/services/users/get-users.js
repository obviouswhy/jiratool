import 'dotenv/config'
import fetch from 'node-fetch'

const endpoint = process.env.ENDPOINT
const user = process.env.JIRA_USER
const api_token = process.env.API_TOKEN

try {
  const respose = await fetch(endpoint + '/rest/api/3/users', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(user + ':' + api_token).toString(
        'base64',
      )}`,
      Accept: 'application/json',
    },
  })
  console.log(`Response: ${respose.status} ${respose.statusText}`)
  const resText = await respose.text()
  console.log(resText)
} catch (err) {
  console.warn(err.message)
}
