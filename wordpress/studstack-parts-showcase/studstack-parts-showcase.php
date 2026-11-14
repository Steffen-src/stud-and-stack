<?php
/**
 * Plugin Name: StudStack Parts Showcase
 * Description: Bilingual standalone parts-shop presentation with simulated checkout. Shortcode: [studstack_shop].
 * Version: 1.3.0
 * License: GPL-2.0-or-later
 * Requires PHP: 7.4
 * Requires at least: 6.0
 */
if (!defined('ABSPATH')) exit;
add_action('admin_init', function(){
 register_setting('studstack','studstack_options',array('sanitize_callback'=>function($v){return array('brand'=>sanitize_text_field($v['brand']??'STUD & STACK'),'accent'=>sanitize_hex_color($v['accent']??'#ffcf00')?:'#ffcf00','language'=>($v['language']??'en')==='de'?'de':'en','assembly_min'=>max(0,min(10000,absint($v['assembly_min']??295))),'assembly_rate'=>max(0,min(100,floatval($v['assembly_rate']??20))));}));
});
add_action('admin_menu',function(){add_options_page('StudStack','StudStack','manage_options','studstack',function(){
 if(!current_user_can('manage_options'))return;
 $v=get_option('studstack_options',array());
 echo '<div class="wrap"><h1>StudStack Showcase</h1><p>EN: Add [studstack_shop] to a page. This page uses the full shop canvas instead of the theme layout. Presentation only: no real orders or payments.</p><p>DE: [studstack_shop] in eine Seite einfügen. Diese Seite verwendet die vollständige Shop-Ansicht statt des Theme-Layouts. Nur Vorschau: keine echten Bestellungen oder Zahlungen.</p><form method="post" action="options.php">';
 settings_fields('studstack');
 echo '<p><label>Brand / Marke <input name="studstack_options[brand]" value="'.esc_attr($v['brand']??'STUD & STACK').'"></label></p><p><label>Accent / Akzent <input type="color" name="studstack_options[accent]" value="'.esc_attr($v['accent']??'#ffcf00').'"></label></p><p><label>Language / Sprache <select name="studstack_options[language]"><option value="en" '.selected($v['language']??'en','en',false).'>English</option><option value="de" '.selected($v['language']??'en','de',false).'>Deutsch</option></select></label></p>';
 echo '<p><label>Assembly minimum / Mindestaufschlag (Eurocent) <input type="number" min="0" max="10000" name="studstack_options[assembly_min]" value="'.esc_attr($v['assembly_min']??295).'"></label></p><p><label>Assembly rate / Montageaufschlag (%) <input type="number" min="0" max="100" step="0.1" name="studstack_options[assembly_rate]" value="'.esc_attr($v['assembly_rate']??20).'"></label></p>';
 submit_button();echo '</form></div>';
 });});
add_shortcode('studstack_shop',function(){return '<p>StudStack Parts Showcase</p>';});
add_action('template_redirect',function(){
 if(!is_singular())return;
 $p=get_post();if(!$p||!has_shortcode($p->post_content,'studstack_shop'))return;
 $v=get_option('studstack_options',array());
 $conf=array('brand'=>$v['brand']??'STUD & STACK','accent'=>$v['accent']??'#ffcf00','language'=>$v['language']??'en','assemblyMinimumCents'=>intval($v['assembly_min']??295),'assemblyRate'=>floatval($v['assembly_rate']??20)/100);
 $base=plugin_dir_url(__FILE__);
 status_header(200);nocache_headers();header('Content-Type: text/html; charset=UTF-8');
 echo '<!doctype html><html lang="'.esc_attr($conf['language']).'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>'.esc_html($conf['brand']).'</title><link rel="stylesheet" href="'.esc_url($base.'style.css?ver=1.3.0').'"><link rel="stylesheet" href="'.esc_url($base.'creative.css?ver=1.3.0').'"><link rel="stylesheet" href="'.esc_url($base.'studio3d.css?ver=1.3.0').'"><script type="module" src="'.esc_url($base.'studio3d.js?ver=1.3.0').'"></script><link rel="stylesheet" href="'.esc_url($base.'experience.css?ver=1.3.0').'"><script defer src="'.esc_url($base.'experience.js?ver=1.3.0').'"></script><script defer src="'.esc_url($base.'creative.js?ver=1.3.0').'"></script><script>window.StudStackConfig='.wp_json_encode($conf,JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_HEX_QUOT).';</script><script defer src="'.esc_url($base.'app.js?ver=1.3.0').'"></script></head><body><div id="ss-app" class="ss-app"></div></body></html>';
 exit;
},20);
