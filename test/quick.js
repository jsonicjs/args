const { Jsonic } = require('@jsonic/jsonic-next')
const { Debug } = require('@jsonic/jsonic-next/debug')
const { Args } = require('..')

const tlog = []

const args = Jsonic.make()
  // .use(Debug, { trace: true })
  .use(Args, {
    command: [
      {
        pattern: {
          list: true,
          user: true,
          data: {},
        },
        action: (argm, args) => {
          console.log('argm', argm, args)
        },
      },
    ],
  })
  .sub({ lex: (t) => tlog.push(t) })

const P = (x) => console.log(args(x))

try {
  // P('foo')

  // P('list user foo:1,bar:zed 11')
  P('list user foo:1,bar:zed')
  P('list user 11')
} catch (e) {
  console.log(e)
}

// console.log(tlog)
