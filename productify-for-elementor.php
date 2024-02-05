<?php
/*
 * Plugin Name:       Productify For Elementor
 * Plugin URI:        http://wp-plugins.themeatelier.net/productify
 * Description:       WooCommerce Products Displayes For Elementor
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            ThemeAtelier
 * Author URI:        https://themeatelier.net/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://wordpress.org/plugins/productify/
 * Text Domain:       productify-for-elementor
 * Domain Path:       /languages
 * Elementor tested up to: 3.16.0
 * Elementor Pro tested up to: 3.16.0
 */

 if( ! defined( 'ABSPATH' ) ) exit();
/**
 * Elementor Extension main CLass
 * @since 1.0.0
 */
final class PRFE_For_Elementor {

    // Minimum Elementor Version
    const PRFE_MINIMUM_ELEMENTOR_VERSION = '3.5.0';

    // Minimum PHP Version
    const PRFE_MINIMUM_PHP_VERSION = '7.3';

    // Instance
    private static $_instance = null;

    /**
    * SIngletone Instance Method
    * @since 1.0.0
    */
    public static function instance() {
        if( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
    * Construct Method
    * @since 1.0.0
    */
    public function __construct() {
        // Call Constants Method
        $this->define_constants();
        add_action( 'wp_enqueue_scripts', [ $this, 'scripts_styles' ] );
        add_action( 'init', [ $this, 'i18n' ] );
        add_action( 'plugins_loaded', [ $this, 'init' ] );
    }

    /**
    * Define Plugin Constants
    * @since 1.0.0
    */
    public function define_constants() {
        define( 'PRFE_PLUGIN_VERSION', '1.0.0' );
        define( 'PRFE_PLUGIN_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );
        define( 'PRFE_PLUGIN_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
    }

    /**
    * Load Scripts & Styles
    * @since 1.0.0
    */
    public function scripts_styles() {
        wp_register_style( 'productify-main', PRFE_PLUGIN_URL . 'assets/dist/css/productify.main.min.css', [], PRFE_PLUGIN_VERSION, 'all' );
        wp_enqueue_script( 'productify-main' );
    }

    /**
    * Load Text Domain
    * @since 1.0.0
    */
    public function i18n() {
       load_plugin_textdomain( 'productify-for-elementor', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
    }

    /**
    * Initialize the plugin
    * @since 1.0.0
    */
    public function init() {
        // Check if the ELementor installed and activated
        if( ! did_action( 'elementor/loaded' ) ) {
            add_action( 'admin_notices', [ $this, 'prfe_admin_notice_missing_main_plugin' ] );
            return;
        }
        
        if( ! version_compare( ELEMENTOR_VERSION, self::PRFE_MINIMUM_ELEMENTOR_VERSION, '>=' ) ) {
            add_action( 'admin_notices', [ $this, 'prfe_admin_notice_minimum_elementor_version' ] );
            return;
        }

        if( ! version_compare( PHP_VERSION, self::PRFE_MINIMUM_PHP_VERSION, '>=' ) ) {
            add_action( 'admin_notices', [ $this, 'prfe_admin_notice_minimum_php_version' ] );
            return;
        }

        add_action( 'elementor/init', [ $this, 'init_category' ] );
        add_action( 'elementor/widgets/widgets_registered', [ $this, 'init_widgets' ] );
    }

    /**
    * Init Widgets
    * @since 1.0.0
    */
    public function init_widgets() {
        require_once PRFE_PLUGIN_PATH . '/widgets/productify-post-grid.php';
    }

    /**
    * Init Category Section
    * @since 1.0.0
    */
    public function init_category() {
        Elementor\Plugin::instance()->elements_manager->add_category(
            'prfe-for-elementor',
            [
                'title' => 'Productify'
            ],
            1
        );
    }

    /**
    * Admin Notice
    * Warning when the site doesn't have Elementor installed or activated
    * @since 1.0.0
    */
    public function prfe_admin_notice_missing_main_plugin() {
        if( isset( $_GET[ 'activate' ] ) ) unset( $_GET[ 'activate' ] );
        $message = sprintf(
            esc_html__( '"%1$s" requires "%2$s" to be installed and activated.', 'productify-for-elementor' ),
            '<strong>'.esc_html__( 'Productify For Elementor', 'productify-for-elementor' ).'</strong>',
            '<strong>'.esc_html__( 'Elementor', 'productify-for-elementor' ).'</strong>'
        );

        printf( '<div class="notice notice-warning is-dimissible"><p>%1$s</p></div>', wp_kses_post($message) );
    }

    /**
    * Admin Notice
    * Warning when the site doesn't have a minimum required Elementor version.
    * @since 1.0.0
    */
    public function prfe_admin_notice_minimum_elementor_version() {
        if( isset( $_GET[ 'activate' ] ) ) unset( $_GET[ 'activate' ] );
        $message = sprintf(
            esc_html__( '"%1$s" requires "%2$s" version %3$s or greater', 'productify-for-elementor' ),
            '<strong>'.esc_html__( 'Productify For Elementor', 'productify-for-elementor' ).'</strong>',
            '<strong>'.esc_html__( 'Elementor', 'productify-for-elementor' ).'</strong>',
            self::PRFE_MINIMUM_ELEMENTOR_VERSION
        );
        printf( '<div class="notice notice-warning is-dimissible"><p>%1$s</p></div>',  wp_kses_post($message) );
    }

    /**
    * Admin Notice
    * Warning when the site doesn't have a minimum required PHP version.
    * @since 1.0.0
    */
    public function prfe_admin_notice_minimum_php_version() {
        if( isset( $_GET[ 'activate' ] ) ) unset( $_GET[ 'activate' ] );
        $message = sprintf(
            esc_html__( '"%1$s" requires "%2$s" version %3$s or greater', 'productify-for-elementor' ),
            '<strong>'.esc_html__( 'Productify For Elementor', 'productify-for-elementor' ).'</strong>',
            '<strong>'.esc_html__( 'PHP', 'productify-for-elementor' ).'</strong>',
            self::PRFE_MINIMUM_PHP_VERSION
        );
        printf( '<div class="notice notice-warning is-dimissible"><p>%1$s</p></div>', wp_kses_post($message) );
    }
}
PRFE_For_Elementor::instance();