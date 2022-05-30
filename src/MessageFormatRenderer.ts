/* eslint-disable class-methods-use-this */
import MessageFormat from '@messageformat/core'

// object to cache MessageFormat classes related to
// specific locales
const MF: {
  [locale: string]: MessageFormat
} = {}

/**
 * MessageFormat renderer
 *
 * @export
 * @class MessageFormatRenderer
 */
export default class MessageFormatRenderer {
  render(sourceString: string, localeCode: string, params: any) {
    // construct a MessageFormat class based on locale
    // to make dates and other content localizable
    const locale = (localeCode || '').split('_')[0]
    if (!MF[locale]) {
      try {
        MF[locale] = new MessageFormat(locale)
      } catch (err) {
        MF[locale] = new MessageFormat(null)
      }
    }
    const msg = MF[locale].compile(sourceString)
    return msg(params)
  }
}
