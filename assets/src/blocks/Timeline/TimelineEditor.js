import {useCallback, useState} from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	CheckboxControl,
	Tooltip
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import { URLInput } from '../../components/URLInput/URLInput';
import { Timeline } from './Timeline';
import { languages } from './TimelineLanguages'
import { URLDescriptionHelp } from './URLDescriptionHelp'
import { debounce } from 'lodash';

const { RichText } = wp.blockEditor;
const { __ } = wp.i18n;

const positions = [
	{label: 'Bottom', value: 'bottom'},
	{label: 'Top', value: 'top'},
];

const renderEdit = ({ google_sheets_url, language, timenav_position, start_at_end }, toAttribute) => {
  // Using a state to prevent the input losing the cursor position, a React issue reported multiple times
  const [ sheetURL, setSheetURL ] = useState(google_sheets_url);
  const debounceSheetURLUpdate = useCallback(debounce(toAttribute('google_sheets_url'), 300), []);

  return (
    <InspectorControls>
      <PanelBody title={__('Setting', 'planet4-blocks-backend')}>
        <URLInput
          label={__('Google Sheets URL', 'planet4-blocks-backend')}
          placeholder={__('Enter URL', 'planet4-blocks-backend')}
          value={sheetURL}
          onChange={
            value => {
              setSheetURL(value)
              debounceSheetURLUpdate(value)
            }
          }
        />

        <URLDescriptionHelp />

        <SelectControl
          label={__('Language', 'planet4-blocks-backend')}
          value={language}
          options={languages}
          onChange={toAttribute('language')}
        />

        <SelectControl
          label={__('Timeline navigation position', 'planet4-blocks-backend')}
          value={timenav_position}
          options={positions}
          onChange={toAttribute('timenav_position')}
        />

        <CheckboxControl
          label={__('Start at end', 'planet4-blocks-backend')}
          help={__('Begin at the end of the timeline', 'planet4-blocks-backend')}
          value={start_at_end}
          checked={start_at_end}
          onChange={toAttribute('start_at_end')}
        />

      </PanelBody>
    </InspectorControls>
	)
}

const renderView = (attributes, toAttribute) => {
  return (
    <section className="block timeline-block">
      <Tooltip text={__('Edit text', 'planet4-blocks-backend')}>
        <header className="articles-title-container">
          <RichText
            tagName="h2"
            className="page-section-header"
            placeholder={__('Enter title', 'planet4-blocks-backend')}
            value={attributes.timeline_title}
            onChange={toAttribute('timeline_title')}
            keepPlaceholderOnFocus={true}
            withoutInteractiveFormatting
            characterLimit={40}
            multiline="false"
          />
        </header>
      </Tooltip>
      <RichText
        tagName="p"
        className="page-section-description"
        placeholder={__('Enter description', 'planet4-blocks-backend')}
        value={attributes.description}
        onChange={toAttribute('description')}
        keepPlaceholderOnFocus={true}
        withoutInteractiveFormatting
        characterLimit={200}
      />
      {
        ! attributes.google_sheets_url
        ? <div className="block-edit-mode-warning components-notice is-warning">
            { __( 'Please include a Sheet URL.', 'planet4-blocks' ) }
          </div>
        : <Timeline {...attributes} />
      }
		</section>
	)
}

export const TimelineEditor = ({ isSelected, attributes, setAttributes }) => {
  const toAttribute = attributeName => value => setAttributes({ [attributeName]: value });

  return (
    <div>
      {
        isSelected && renderEdit(attributes, toAttribute)
      }
      {
        renderView(attributes, toAttribute)
      }
    </div>
  );
}