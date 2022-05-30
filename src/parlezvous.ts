import fs from "fs"
import path from "path"

const languageCodes = [
  "en_US",
  "fr_FR",
  "es_ES",
  "de_DE",
  "it_IT",
  "pt_BR",
  "ru_RU",
  "zh_CN",
  "ja_JP",
] as const
type LanguageCode = typeof languageCodes[number]
type Lexicon = {
  [phrase: string]: string
}
type Dictionary = {
  [languageCode in LanguageCode]?: Lexicon
}

function isValidLanguageCode(
  languageCode: string,
): languageCode is LanguageCode {
  const maybeLanguageCode: any = languageCode
  if (languageCodes.includes(maybeLanguageCode)) {
    return true
  }
  throw new Error(`Invalid language code: ${languageCode}`)
}

export default class ParlezVous {
  public dictionary: Dictionary = { en_US: {} }
  public currentLanguage: LanguageCode = "en_US"

  constructor() {}

  init(options: {
    currentLanguage?: LanguageCode
    dictionaryOrDir?: Dictionary | string
  }) {
    this.currentLanguage = options?.currentLanguage ?? this.currentLanguage
    if (options.dictionaryOrDir) {
      this.loadDictionary(options.dictionaryOrDir)
    }
  }

  loadDictionary(dictionaryOrDir: Dictionary | string) {
    if (typeof dictionaryOrDir === "string") {
      const dictionaryFiles = fs.readdirSync(dictionaryOrDir)
      dictionaryFiles.forEach((file) => {
        const languageCode = file.split(".")[0]
        if (isValidLanguageCode(languageCode)) {
          const dictionary = JSON.parse(
            fs.readFileSync(path.join(dictionaryOrDir, file), "utf8"),
          )
          this.dictionary[languageCode] = dictionary
        }
      })
    } else {
      this.dictionary = dictionaryOrDir
    }
  }

  phrase(key: string, value?: string) {
    if (this.dictionary) {
      const currentLanguage = this.dictionary[this.currentLanguage]
      if (currentLanguage) {
        const phrase = currentLanguage[key]
        if (phrase) {
          return phrase
        } else {
          if (value) {
            currentLanguage[key] = value
            return value
          }
        }
      } else if (value) {
        return value
      }
      return key
    }
  }
}
