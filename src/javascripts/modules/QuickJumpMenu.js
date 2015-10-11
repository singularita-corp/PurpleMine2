var PurpleMine = PurpleMine || {};

PurpleMine.QuickJumpMenu = (function()
{
    'use strict';

    var self;
    var baseClass = 'quick-jump';

    function QuickJumpMenu()
    {
        if (self) {
            return self;
        }

        if (!PurpleMine.isSelectorInCss ||
            !PurpleMine.isSelectorInCss(
                'application.css', '#header .' + baseClass
            )
        ) {
            return;
        }

        self = this;

        this.$quickSearch  = $('#quick-search');
        this.$quickJump    = $('#project_quick_jump_box');
        this.$toggleButton = null;
        this.$dropdown     = null;

        if (this.$quickJump.length > 0) {
            buildMenu();
            bindEvents();
        }
    }

    function buildMenu()
    {
        var $options = self.$quickJump.children();
        var buttonLabel = $options.first().text();
        var wrapper = $('<span class="' + baseClass + '"></span>');

        self.$toggleButton = $(buildToggleButton(buttonLabel));
        self.$dropdown = $(buildDropdown($options));

        wrapper.append(
            self.$toggleButton,
            self.$dropdown
        );
        self.$quickJump.before(wrapper);
    }

    function buildToggleButton(label)
    {
        return '<button class="' + baseClass + '__toggle">' +
                label +
                '</button>';
    }

    function buildDropdown($options)
    {
        var html = '<ul class="' + baseClass + '__dropdown">';

        $options.each(function(index, el) {
            if (!el.value) {
                return;
            }

            html += '<li class="dropdown-item">';
            html += '<a href="' + el.value + '" class="dropdown-item__link">';
            html += el.text +'</a>';
            html += '</li>';
        });

        html += '</ul>';

        return html;
    }

    function bindEvents()
    {
        $(document).on('click.quickjump', clearMenu);
        self.$toggleButton.on('click', toggleMenu);
        self.$toggleButton.on('keydown', keydown);
        self.$dropdown.on('keydown', keydown);
    }

    function toggleMenu()
    {
        self.$dropdown.toggleClass('open');
    }

    function clearMenu(event)
    {
        if (event && event.target === self.$toggleButton[0]) {
            return;
        }

        self.$dropdown.removeClass('open');
    }

    function keydown(event)
    {
        if (!/(38|40|27|32)/.test(event.which)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (self.$dropdown.hasClass('open') && event.which === 27) {
            return clearMenu();
        }

        cursorNavigation(event);
    }

    function cursorNavigation(event)
    {
        var $items = self.$dropdown.find('.dropdown-item__link');

        if (!$items.length) {
            return;
        }

        var index = $items.index(event.target);

        if (event.which === 38 && index > 0) { // Up
            index--;
        }

        if (event.which === 40 && index < $items.length - 1) { // Down
            index++;
        }

        if (!~index) {
            index = 0;
        }

        $items.eq(index).trigger('focus');
    }

    return QuickJumpMenu;
}());
