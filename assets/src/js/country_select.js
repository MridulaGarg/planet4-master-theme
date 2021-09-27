const { __ } = wp.i18n;

export const setupCountrySelect = function() {
  'use strict';

  let data, json;
  try {
    data = document.getElementById('countries_script')?.innerText;
    json = data ? JSON.parse(data) : null;
    if (!json) return;
  } catch (e) {
    return;
  }

  let countries_by_initial = json;
  const international = countries_by_initial[0][0];
  delete countries_by_initial[0];
  //const countries_list = Object.keys(json).map(k => json[k]).flat();

  const list_by_initial = (by_initial) => {
    console.log('by_initial', by_initial);
    console.log('initial', Object.keys(by_initial));

    let entries = Object.keys(by_initial).map((initial) => {
      console.log('initial', initial.toUpperCase());
      let countries = by_initial[initial];
      return `<li class="country-group-letter"><h3>${ initial.toUpperCase() }</h3>
        <ul
          aria-label="${ __('Sites starting with the letter .' + initial.toUpperCase() + '.', 'planet4-master-theme') }"
        role="list">
          ${ countries.map((country) => country_entry(country)).join('') }
        </ul>
      </li>`;
    });

    return entries.join('');
  }

  let country_entry = (country) => {
    const main_lang = country.lang[0];

    return `<li>
      <a href="${ main_lang.url }"
        hreflang="${ main_lang.locale[0] }"
        data-ga-category="Country Selector"
        data-ga-action="${ country.name + ' | ' + main_lang.name }"
        data-ga-label="n/a"
      >
        ${ country.name }
      </a>
      ${ country.lang.length > 1 ? country_languages(country) : '' }
    </li>`
  };

  let country_languages = (country) => {
    const lang_count = country.lang.length;

    const languages = country.lang.map((lang, k) => `<li>
      <a href="${ lang.url }"
        hreflang="${ lang.locale[0] }"
        data-ga-category="Country Selector"
        data-ga-action="${ country.name + ' | ' + lang.name }"
        data-ga-label="n/a"
      >
        ${ lang.name }
      </a>
      ${ lang_count > 1 && (k+1) < lang_count ? '<span aria-hidden="true"> • </span>' : '' }
    </li>`)

    return `<ul class="lang-list">${ languages.join('') }</ul>`;
  };

  const content = list_by_initial(countries_by_initial);
  const countries_html = `<div class="container">
    <ul class="countries"
        aria-label="${ __('Worldwide site list', 'planet4-master-theme') }"
        role="list">
        <li class="international"><a href="${ international.url }">${ international.name }</a></li>
        ${ content }
    </ul>
  </div>`;

  document.getElementById('country-list').innerHTML = countries_html;
  return;
};
