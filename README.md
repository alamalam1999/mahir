## Versions
CoreUI is built on top of Bootstrap 4 and supports popular frameworks.
* [CoreUI Free Laravel Admin Template](https://github.com/coreui/coreui-free-laravel-admin-template)

## CoreUI Pro
* 💪  [CoreUI Pro Laravel Admin Template](https://coreui.io/pro/laravel)

## Admin Templates built on top of CoreUI Pro

| Default Theme | Legacy Theme | Dark Layout |
| --- | --- | --- |
| [![CoreUI Pro Bootstrap Admin Template](https://coreui.io/images/mockups/mockup_3_1_default.png)](https://coreui.io/pro/laravel/) | [![CoreUI Pro Bootstrap Admin Template](https://coreui.io/images/mockups/mockup_3_1_legacy.png)](https://coreui.io/pro/laravel/)| [![CoreUI Pro Bootstrap Admin Template](https://coreui.io/images/mockups/mockup_3_1_dark.png)](https://coreui.io/pro/laravel/)

## Installation

``` bash
# clone the repo
$ git clone https://github.com/coreui/coreui-free-laravel-admin-template.git my-project

# go into app's directory
$ cd my-project

# install app's dependencies
$ composer install

# install app's dependencies
$ npm install

```

### Set APP_URL

> If your project url looks like: example.com/sub-folder 
Then go to `my-project/.env`
And modify this line:

* APP_URL = 

To make it look like this:

* APP_URL = http://example.com/sub-folder


### Next step

``` bash
# in your app directory
# generate laravel APP_KEY
$ php artisan key:generate

# run database migration and seed
$ php artisan migrate:refresh --seed

# generate mixing
$ npm run dev

# and repeat generate mixing
$ npm run dev
```

## Usage

``` bash
# start local server
$ php artisan serve

# test
$ php vendor/bin/phpunit
```

Open your browser with address: [localhost:8000](localhost:8000)  
Click "Login" on sidebar menu and log in with credentials:

* E-mail: _admin@admin.com_
* Password: _password_

This user has roles: _user_ and _admin_

--- 

### How to add a link to the sidebar:

> Instructions for CoreUI Free Laravel admin template only. _Pro and Vue.js versions have separate instructions._

#### To add a __link__ to the sidebar - modify seeds file:  
`my-project/database/seeds/MenusTableSeeder.php`

In `run()` function - add `insertLink()`:
```php
$id = $this->insertLink( $rolesString, $visibleName, $href, $iconString);
```
* `$rolesString` - a string with list of user roles this menu element will be available, ex. `"guest,user,admin"`
* `$visibleName` - a string caption visible in sidebar
* `$href` - a href, ex. `/homepage` or `http://example.com`
* `$iconString` - a string containing valid CoreUI Icon name (kebab-case), ex. `cil-speedometer` or `cil-pencil`

To add a __title__ to the sidebar - use function `insertTitle()`:
```php
$id = $this->insertTitle( $rolesString, $title );
```
* `$rolesString` - a string with list of user roles this menu element will be available, ex. `"guest,user,admin"`
* `$title` - a string caption visible in sidebar

To add a __dropdown__ menu to the sidebar - use function `beginDropdown()`:
```php
$id = $this->beginDropdown( $rolesString, $visibleName, $iconString);
```
* `$rolesString` - a string with list of user roles this menu element will be available, ex. `"guest,user,admin"`
* `$visibleName` - a string caption visible in sidebar
* `$iconString` - a string containing valid CoreUI icon name (kebab-case). For example: `cil-speedometer` or `cil-pencil`

To end dropdown section - use function `endDropdown()`. 

To add __link__ to __dropdown__ call function `insertLink()` between function calls `beginDropdown()` and `endDropdown()`. 
Example:
```php
$id = $this->beginDropdown('guest,user,admin', 'Some dropdown', 'cil-puzzle');
$id = $this->insertLink('guest,user,admin', 'Dropdown name', 'http://example.com');
$this->endDropdown();
```

__IMPORTANT__ - At the end of `run()` function, call `joinAllByTransaction()` function:
```php
$this->joinAllByTransaction();
```

Once done with seeds file edit, __run__:
``` bash 
$ php artisan migrate:refresh --seed
# This command also rollbacks database and migrates it again.
```

## Features

### Table of contents:
* [Notes](#notes)
* [Users](#users)
* [Management of menus](#menu-management)
* [Manage menu items](#Manage-menu-items)
* [Role management](#Role-management)
* [Management of the media](#Manage-media)
* [BREAD](#BREAD-system)
* [Email Templates](#E-mail-Templates)

#### Notes
It is an example of data presentation in a pagination table, and CRUD functionality.

#### Users
It is a simple example of how to manage registered users.

#### Menu management 
It is a system that allows you to create a new menu and edit existing menus. To place a new menu named "new" in any view use this code:
```php
        <?php
            use the App\MenuBuilder\FreelyPositionedMenus;
            if(isset($appMenus['new'])){
                FreelyPositionedMenus::render( $appMenus['new'] , '', 'your-css-class-of-ul-element');
            }
        ?>  
```