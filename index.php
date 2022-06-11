<?php
/*
	Plugin Name: Aimee 2022 plugin
	Plugin URI: 
	Description: 
	Version: 1.0
	Author: 
	Author URI: 

*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Aimee2022Plugin {
    function __construct() {
        add_action('init'
        
        , array($this, 'adminAssets'));
    }

    function adminAssets() {
        wp_register_style('quizeditcss', plugin_dir_url(__FILE__) . 'build/index.css');
        wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type('ourplugin/aimee-22-plugin', array(
            'editor_script' => 'ournewblocktype',
            'editor_style' => 'quizeditcss',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    function theHTML($attributes) {
        if(!is_admin()) {
            wp_enqueue_script('quizFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
            wp_enqueue_style('quizFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
        }

        ob_start(); ?>
            <div class="myquizblock"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre></div>
        <?php return ob_get_clean();
    }
}

$aimee2022plugin = new Aimee2022Plugin();