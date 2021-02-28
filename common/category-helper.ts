import * as recordCategory from '@historybookapp/record-category'
import { singletonSync } from './singleton'

import prisma from './prisma'

export interface Category {
  slug: string
  locales: {
    default: string
    [key: string]: string
  }
}

class CategoryHelper {
  extension?: {
    getCategories: typeof recordCategory.getCategories
    availableCategories: typeof recordCategory.availableCategories
  }

  isInit = false

  constructor() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
      this.extension = require('@historybookapp/record-category')
    } catch (err) {
      // no catch
    }
  }

  async init(): Promise<void> {
    if (this.isInit) return

    const availableCategories = this.getAvailableCategories()

    if (!availableCategories) return

    async function mapper(category: Category): Promise<void> {
      const result = await prisma.category.findUnique({
        where: {
          slug: category.slug,
        },
      })

      if (!result) {
        await prisma.category.create({
          data: {
            slug: category.slug,
          },
        })
      }
    }

    await Promise.all(availableCategories.map(mapper))

    this.isInit = true
  }

  getAvailableCategories(): Category[] | undefined {
    return this.extension ? this.extension.availableCategories : undefined
  }

  async getCategories(domain: string): Promise<Category[] | undefined> {
    await this.init()

    if (this.extension) {
      return this.extension.getCategories(domain)
    }
    return undefined
  }
}

const categoryHelper = singletonSync(
  'categoryHelper',
  () => new CategoryHelper(),
)

export default categoryHelper
