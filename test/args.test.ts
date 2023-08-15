/* Copyright (c) 2021-2023 Richard Rodger and other contributors, MIT License */

import Util from 'util'

import { Jsonic } from '@jsonic/jsonic-next'
import { Args } from '..'

describe('args', () => {

  test('happy', async () => {
    let ja = Jsonic.make().use(Args)
  })
})


