import { adminRouter } from './admin.js'
import { rootBuilder } from './base.js'
import { publicRouter } from './public.js'
import { userRouter } from './user.js'

export const rootRouter = rootBuilder
  .route('/admin', adminRouter)
  .route('/user', userRouter)
  .route('/', publicRouter)
