import { z } from 'zod'
import { containsProfanity } from '@shared/lib/profanity'

export const buildChannelNameSchema = (
  t: (key: string) => string,
  existingNames: string[],
) =>
  z.object({
    name: z
      .string()
      .min(1, { message: t('Введите имя канала') })
      .min(3, { message: t('Минимум 3 символа') })
      .max(140, { message: t('Максимум 140 символов') })
      .refine((val) => !existingNames.includes(val), {
        message: t('Канал с таким именем уже существует'),
      })
      .refine((val) => !containsProfanity(val), {
        message: t('Нецензурные слова запрещены'),
      }),
  })
