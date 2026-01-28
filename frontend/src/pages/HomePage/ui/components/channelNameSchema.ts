import { z } from 'zod'
import { containsProfanity } from '@shared/lib/profanity'

export const buildChannelNameSchema = (
  t: (key: string, options?: Record<string, unknown>) => string,
  existingNames: string[],
) =>
  z.object({
    name: z
      .string()
      .min(1, { message: t('Введите имя канала') })
      .min(3, { message: t('От {{minSymbols}} до {{maxSymbols}} символов', { minSymbols: 3, maxSymbols: 140 }) })
      .max(140, { message: t('От {{minSymbols}} до {{maxSymbols}} символов', { minSymbols: 3, maxSymbols: 140 }) })
      .refine((val) => !existingNames.includes(val), {
        message: t('Канал с таким именем уже существует'),
      })
      .refine((val) => !containsProfanity(val), {
        message: t('Нецензурные слова запрещены'),
      }),
  })
