import i18n from 'i18n';
import path from 'path';

const locales = ['en', 'fa'];
const localesDir = 'locales';

/**
 * Select correct local file based on accept-language header
 */
i18n.configure({
    locales: locales,
    defaultLocale: i18n.getLocale(),
    fallbacks: { nl: 'en' },
    header: 'accept-language',
    staticCatalog: {
      en: require(path.join(__dirname, localesDir) + '/en.json'),
      fa: require(path.join(__dirname, localesDir) + '/fa.json')
    },
    extension: '.json',
    register: global,
    autoReload: true,
    syncFiles: true,
    objectNotation: true,
    updateFiles: false
});

/**
 * i18n is a name space which the translate function is a member of this namespace.
 */
export default i18n;