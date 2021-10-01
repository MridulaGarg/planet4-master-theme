import { setupCookies } from './cookies';
import { setupHeader } from './header';
import { setupLoadMore } from './load_more';
import { setupPDFIcon } from './pdf_icon';
import { setupSearch } from './search';
import { setupExternalLinks } from './external_links';
import { setupEnhancedDonateButton } from './enhancedDonateButton';

import 'bootstrap';

function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../images/icons/', true, /\.svg$/));

window.$ = $ || jQuery;

jQuery(function($) {
  setupCookies($);
  setupHeader($);
  setupLoadMore($);
  setupPDFIcon($);
  setupSearch($);
  setupExternalLinks($);
  setupEnhancedDonateButton();
});
