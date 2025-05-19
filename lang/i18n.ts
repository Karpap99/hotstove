import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import uk from "./uk.json"
import en from "./en.json"
import fr from "./fr.json"
import pl from "./pl.json"
import de from "./de.json"
import es from "./es.json"
import cs from "./cs.json"
import it from "./it.json"
import pt from "./pt.json"


export const resources = {
  "Čeština": cs,
  "Deutsch": de,
  "English": en,
  "Español": es,
  "Français": fr,
  "Italiano": it,
  "Polski": pl,
  "Português": pt,
  "Українська": uk
}

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng: "Українська",
  });



export default {i18n};