import Hashids from 'hashids'

const salt = process.env.HASHID_SALT

class HashidsSuite {
  hashids = new Hashids(
    salt,
    8,
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
  )

  encode(id: number): string {
    return this.hashids.encode(id)
  }

  decode(str: string): number {
    const result = this.hashids.decode(str)

    if (!result.length) {
      throw new Error('Bad hashed string.')
    }

    return result[0] as number
  }
}

const hashids = new HashidsSuite()

export default hashids
