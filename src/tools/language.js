let lang = {
  "MAIN_PAGE_BODY_TITLE": {
    context: "",
    en : {
      CA : "Change your world",
      }
    },
  "MAIN_PAGE_BODY_TEXT" : {
    context: "",
    en: {
      CA: "Where to start? Dream big! Set yourself a goal and shoot for the moon. Now think... what does success look like?  How will you know that the goal is achieved?  Is there something to measure there?\nNow take a moment to consider where you are right now...got it?  Good. What is the next step you'll take on the journey to complete you goal?"
    }
  },
  "LOGIN_TEXT" : {
    context: "Login action link",
    en: {
      CA: "Login"
    }
  },
  "GOOGLE_LOGIN" : {
    context: "Alt text for Google Login button image",
    en: {
      CA: "Google Login"
    }
  },
  "NEXT" : {
    context: "Move to the next form field.",
    en: {
      CA: "Next"
    }
  },
  "GOAL_INPUT_DESCRIPTION" : {
    context: "",
    en: {
      CA: "What do you want to do?"
    }
  },
  "GOAL_INPUT_PLACEHOLDER" : {
    context: "",
    en: {
      CA: "Become a pro athlete, paint like Bob Ross..."
    }
  },
  "GOAL_SUCCESS_INSTRUCTIONS" : {
    context: "",
    en: {
      CA: "When achieved, describe what success looks like."
    }
  },
  "GOAL_SUCCESS_PLACEHOLDER" : {
    context: "",
    en: {
      CA: "I'll be at center court..."
    }
  },
  "GOAL_METRIC_INSTRUCTIONS" : {
    context: "",
    en: {
      CA: "What will you measure? Describe it in one word.  What it the total you're aiming for?"
    }
  },
  "TOTAL" : {
    context: "",
    en: {
      CA: "Total"
    }
  },
  "METRIC" : {
    context: "",
    en: {
      CA: "Metric"
    }
  },
  "DOLLARS" : {
    context: "",
    en: {
      CA: "Dollars"
    }
  },
  "MEASURE_PROGRESS" : {
    context: "",
    en: {
      CA: "Just measure progress."
    }
  },
  "ONE_MILLION" : {
    context: "",
    en: {
      CA: "1,000,000"
    }
  },
  "CREATE_GOAL" : {
    context: "",
    en: {
      CA: "Create Goal"
    }
  },
  "NO_GOALS" : {
    context: "",
    en: {
      CA: "You haven't created a goal yet."
    }
  },
  "LORUM_IPSUM" : {
    context: "",
    en: {
      CA: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  }
}

class Language {
  constructor() {
    //this.default_language = process.env.REACT_APP_DEFAULT_LANGUAGE;
    this.current_language = this.default_language;
    //this.default_locale = process.env.REACT_APP_DEFAULT_LOCALE;
    this.current_locale = this.default_locale;
    
  }
  setLanguage(language, locale) {
    this.current_language = language;
    this.current_locale = locale;
  }
  t(code) {
    let ret_string = this.verify(code, this.current_language, this.current_locale);
    if(ret_string === false) {
      ret_string = this.verify(code, this.current_language, this.default_locale);
      if(ret_string === false) {
        ret_string = this.verify(code, this.default_language, this.default_locale);
        ret_string = (ret_string === false) ? "" : ret_string;
      }
    }
    return ret_string;
  }
  verify(code, language, locale) {
    if (lang[code]) {
      if (lang[code][language]) {
        if (lang[code][language][locale]) {
          return lang[code][language][locale]; 
        }
      }
    }
    return false;
  }
}
export default Language;