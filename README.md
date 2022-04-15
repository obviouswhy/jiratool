# JiraTool

This **Jira** management tool allows you to **create** and **delete** new projects and issues.

## Getting started

To use it, first clone this repo:

```shell
$ git@github.com:obviouswhy/jiratool.git
```

Then run `npm install` to install the necessary dependencies:

```shell
$ npm install
```

In order to use this tool, it is necessary to create a `.env` file.<br/>
Your `.env` file should contain the following data.

```
ENDPOINT = 'https://xxxxxx.atlassian.net'
JIRA_USER='xxxxxx@gmail.com'
API_TOKEN = 'NzJSiDxxxxxxxxx'
ACCOUNT_ID = '6257b67xxxxxxxxxx'
```

You can copy the the content of the `.env.example` file and fill it with your account information.

> **注意**: Don't forget to rename it as `.env`

## Commands

All the commands are using the [Jira Developer REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)

### Get Projects

Get the first 50 projects of your account.

```shell
$ npm run get-projects
```

### Create a Jira Project

Create a Jira project by setting the project **Key** and the project **Name**.

```shell
$ npm run create-project key=EX name=Example
```

### Delete a Jira Project

Delete a Jira project by setting the project **Key** or the project **ID**.

```shell
$ npm run delete-project key=EX
```

or

```shell
$ npm run delete-project id=10001
```

### Create an Issue

Create an Issue by setting the project **Key** or project **ID** and the issue **Summary**.

```shell
$ npm run create-issue project_key=EX summary="New Issue!"
```

or

```shell
$ npm run create-issue project_id=10001 summary="New Issue!"
```

### Delete an Issue

Delete an Issue by setting the issue **Key** or the issue **ID**.

```shell
$ npm run delete-project key=EX-1
```

or

```shell
$ npm run delete-project id=10001
```

## cli-tool

In order to make it easier to use, there is a cli-tool to help you **set/preview** the user information in the `.env` file and also **create/delete\*** **projects** and **issues**.<br/>
You can start the tool by running:

```shell
$ node index.js
```

or

```shell
$ npm run start
```

### Set and Preview User Information

![JiraTool](https://im5.ezgif.com/tmp/ezgif-5-611ac0f5e0.gif)

### Create/Delete Project and Issue

![JiraTool2](https://im4.ezgif.com/tmp/ezgif-4-4e9f8c69b0.gif)
