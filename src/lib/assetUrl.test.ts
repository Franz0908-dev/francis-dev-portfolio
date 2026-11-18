import { assetUrl } from './assetUrl'

describe('public asset paths', () => {
  it.each(['images/example.webp', 'documents/resume.pdf', 'certificates/shareable.pdf'])('supports root and subpath deployments: %s', path => {
    expect(assetUrl(path, '/')).toBe(`/${path}`)
    expect(assetUrl(`/${path}`, '/portfolio/')).toBe(`/portfolio/${path}`)
    expect(assetUrl(`/${path}`, './')).toBe(`./${path}`)
  })
  it('preserves external verification and contact URLs', () => {
    expect(assetUrl('https://issuer.example/verify/123', '/portfolio/')).toBe('https://issuer.example/verify/123')
    expect(assetUrl('mailto:francislee.0908@gmail.com')).toBe('mailto:francislee.0908@gmail.com')
  })
})
