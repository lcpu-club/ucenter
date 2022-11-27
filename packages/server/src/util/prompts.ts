import prompts from 'prompts'

function checkRet<T>(ret: prompts.Answers<'input'>): T {
  if ('input' in ret) return ret.input
  throw new Error('User cancelled')
}

export async function askString(message: string) {
  const ret = await prompts({
    type: 'text',
    name: 'input',
    message
  })
  return checkRet<string>(ret)
}

export async function askNumber(message: string) {
  const ret = await prompts({
    type: 'number',
    name: 'input',
    message
  })
  return checkRet<number>(ret)
}

export async function askJson(message: string) {
  for (;;) {
    const ret = await prompts({
      type: 'text',
      name: 'input',
      message
    })
    const input = checkRet<string>(ret)
    try {
      return JSON.parse(input)
    } catch (err) {
      console.error(err)
    }
  }
}
