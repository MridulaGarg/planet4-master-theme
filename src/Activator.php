<?php

declare(strict_types=1);

namespace P4\MasterTheme;

/**
 * Class Activator.
 * The main class that has activation/deactivation hooks for planet4 master-theme.
 */
class Activator
{
	/**
	 * Activator constructor.
	 */
	public function __construct()
	{
		$this->hooks();
	}

	/**
	 * Run activation functions.
	 */
	public static function run(): void
	{
		Campaigner::register_role_and_add_capabilities();
		Migrator::migrate();
	}

	/**
	 * Hooks the activator functions.
	 */
	protected function hooks(): void
	{
		add_action('after_switch_theme', [ self::class, 'run' ]);
	}
}
