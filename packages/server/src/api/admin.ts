import { CONFIG } from '../config/index.js'
import { adminChain } from './base.js'

export const adminRouter = adminChain
  .router()
  .handle('GET', '/config', (C) => C.handler().handle(async () => CONFIG))
