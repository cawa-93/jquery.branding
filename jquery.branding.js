(function($) {
	var methods = {
		init : function( options ) {
			options = $.extend( true, {
				url :	"#",
				img :	"",
				css :	{
					'padding' : '250px 0px 0px',
					'position': 'relative',
					'background-position' : 'top',
					'background-repeat' : 'no-repeat',
					'background-size' : 'cover',
				},
				linkCss : {
					'position': 'absolute',
					'top': '0',
					'left': '0',
					'width': '100%',
					'height': '100%',
				}
			}, options );

			if ( !!options.img && !options.css['background-image'] ) {
				options.css['background-image'] = 'url("' + options.img + '")';
			}

			this.css( options.css ).trigger( 'styleContainer.branding' );
			var $bLink = $( '<a />', {
				id: "branding-link",
				href: options.url
			} ).css( options.linkCss );

			this.prepend($bLink).data('options.branding', options).trigger('createLink.branding');

			return this;
		},
		link : function( ) {
			return this.find('#branding-link');
		},
		destroy : function( ) {
			this.removeAttr('style').branding('link').remove();
			return this;
		},
		update : function( options ) {
			var newOptions = $.extend( true, {}, this.branding('options'), options );
			return this.branding('destroy').branding( newOptions );
		},
		options : function( options ) {
			return this.data('options.branding');
		},
	};


	jQuery.fn.branding = function (method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.branding' );
		}
	};
})(jQuery);