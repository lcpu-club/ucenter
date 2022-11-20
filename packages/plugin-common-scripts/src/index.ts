import { Plugin, askString, askJson } from '@ucenter/server'

const plugin: Plugin = (hooks) => {
  hooks.hook('post-plugin-setup', async ({ scripts }) => {
    scripts.addScript('create-group', async (app) => {
      const id = await askString('id')
      await app.dbconn.group.create(id)
      console.log(`Created group ${id}`)
    })
    scripts.addScript('create-user', async (app) => {
      const name = await askString('name')
      const group = await askString('group')
      const id = await app.dbconn.user.create(name, group)
      console.log(`Created user ${name} with id ${id}`)
    })
    scripts.addScript('set-group-policy', async (app) => {
      const id = await askString('id')
      const name = await askString('policy name')
      const value = await askJson('policy value')
      await app.dbconn.group.setPolicies(id, {
        [name]: value
      })
      console.log(`Successfully set policy ${name} for group ${id}`)
    })
  })
}

export default plugin
