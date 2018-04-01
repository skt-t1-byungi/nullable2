const test = require('ava')
const n = require('.')

test('if null', t => {
  t.is(n({}, v => v.test), undefined)
  t.is(n({}, v => v.test.test()), undefined)
  t.is(n({}, v => v.test.test(1).test.test({})), undefined)
})

test('exists primitive', t => {
  t.is(n({a: 1}, v => v.a), 1)
  t.is(n({a: v => ({b: {c: v}})}, v => v.a(10).b.c), 10)
  t.is(n({a: v => ({b: {get c () { return v }}})}, v => v.a(10).b.c), 10)
})

test('complex null', t => {
  t.is(n({a: 1}, v => v.a.b), undefined)
  t.is(n({a () {}}, v => v.a.name.test()), undefined)
  t.is(n({a: v => ({b: {get c () { return v }}})}, v => v.a(10).b.c.d), undefined)
})

test('curry', t => {
  const obj$ = n({a: {b: {c: 1}}})

  t.is(obj$(v => v.a.test), undefined)
  t.is(obj$(v => v.a.b.c), 1)
})
