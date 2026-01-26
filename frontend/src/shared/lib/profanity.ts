import leoProfanity from 'leo-profanity'

leoProfanity.clearList()
leoProfanity.add(leoProfanity.getDictionary('en'))
leoProfanity.add(leoProfanity.getDictionary('ru'))

export const containsProfanity = (text: string) => {
  return leoProfanity.check(text)
}

export const cleanProfanity = (text: string) => {
  return leoProfanity.clean(text, { nbLetters: 1 })
}
