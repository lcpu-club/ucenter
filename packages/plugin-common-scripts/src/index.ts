import { Plugin, askString, askJson } from '@ucenter/server'

const plugin: Plugin = (hooks) => {
  hooks.hook('post-plugin-setup', async ({ scripts }) => {
    scripts.addScript('create-group', async (app) => {
      const name = await askString('name')
      const id = await app.dbconn.group.create(name)
      console.log(`Created group ${name} with id ${id}`)
    })
    scripts.addScript('create-user', async (app) => {
      const name = await askString('name')
      const group = await askString('group')
      const id = await app.dbconn.user.create(name, group)
      console.log(`Created user ${name} with id ${id}`)
    })
    scripts.addScript('set-group-policy', async (app) => {
      const gname = await askString('name')
      const group = await app.dbconn.group.get({
        'attributes.name': gname
      })
      const name = await askString('policy name')
      const value = await askJson('policy value')
      await app.dbconn.group.setPolicies(group._id, {
        [name]: value
      })
      console.log(`Successfully set policy ${name} for group ${group._id}`)
    })
  })
}

export default plugin
