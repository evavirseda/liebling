
# Actions required in admin panel to translate site content

In order to get every content translated please follow steps below logging is as admin in Ghost admin panel:


## Upload routes.yaml file

This file is located in root directory of this project. Please upload it to Settings - Labs - Routes - Upload routes YAML


## Translating posts

1. Create or edit a post in english
	* add in a tag to identify the post: `Getting Started / Technology / Announcements` **This tag needs to come up the first on the list of tags**
	* add in a tag to set the content as translatable: `#multilang` **# is needed**
2. Create another post with same content in a different language
	* add in the same identifier tag we used in first post **This tag needs to come up the first on the list of tags**
	* add in another tag to identify the new language: `#kr / #jp / #cn` **# is needed**
	* add in a tag to set the content as translatable: `#multilang` **# is needed**
	
	

## Translating pages

1. Create or edit a page in english
	* add in a tag to identify the page: `Getting Started / Technology / Announcements` **This tag needs to come up the first on the list of tags**
	* add in a tag to set the content as translatable: `#multilang` **# is needed**
2. Create another post with same content in a different language
	* add in the same identifier tag we used in first page  **This tag needs to come up the first on the list of tags**
	* add in another tag to identify the new language:  `/ #kr / #cn / #cn`
	* add in a tag to set the content as translatable: `#multilang` **# is needed**


## Multilingual navigation

**Default Ghost navigation gets disabled when enabling translation (Settings - Design - Navigation in Ghost admin panel)**

Menu items are picked from standard pages created in admin panel. In order to make a standar page show up in navigation follow steps below:

2. Create or edit a page
	* add in a tag to make it belong to nav: `#en-nav / #cn-nav / #kr-nav / #jp-nav`  **# is needed**


## Translating dates

Dates are translated using momentjs. There's a custom script that uses this library `/assets/js/formatDate.js`
**momentjs needs to get imported** in admin panel in Settings - Code injection - Site footer
Please include scripts below: 
```
<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js"></script>
```

# Actions required in code

## Translating strings

Each language has its own translated strings file located in /partials
```
* en.hbs
* cn.hbs
* jp.hbs
* kr.hbs
```
Please edit these files to add in your custom translated strings


## Translating reading time

Posts display an estimate of reading time. This strings are declared in /partials/reading-time.hbs
Please update this file with your custom translated strings


