<?php
/**
 * Shortcake Shortcode Enblock block to Gutenberg enform block conversion.
 * Used to convert
 *
 * [shortcake_columns columns_block_style="no_image" title_1="People Power" description_1="This.." link_1="/act/" cta_text_1="Be the change" /]
 *
 * to
 *
 * <!-- wp:planet4-blocks/columns {"columns_block_style":"no_image","columns_title":"","columns_description":"","columns":[{"title":"People Power","description":"This...","cta_link":"/act/","cta_text":"Be the change","link_new_tab":false}]} /-->
 *
 * @package P4GBKS
 */

namespace P4GBKS\Command\Converters;

/**
 * Class for updating old shortcodes to Gutenberg blocks
 */
class ENBlock_Converter extends Shortcode_Converter {

	/**
	 * Constructor
	 * Initialize properties
	 *
	 * @param string $shortcode_name Shortcode name.
	 * @param array  $attributes Shortcode attributes.
	 */
	public function __construct( $shortcode_name, $attributes ) {
		parent::__construct( $shortcode_name, $attributes );

		$this->block_name = 'planet4-blocks/enform';
		$block_types      = \WP_Block_Type_Registry::get_instance()->get_all_registered();
		if ( array_key_exists( $this->block_name, $block_types ) ) {
			$this->block_type = $block_types[ $this->block_name ];
		}
	}
}
