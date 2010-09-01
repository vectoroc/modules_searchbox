Drupal.behaviors.coolmodule = function() {
	$('<div class="coolmodule-container"><label> Filter By <input id="coolmodule-mask" value="" /></label> </div>').prependTo('#system-modules');	
	
	$('#coolmodule-mask').keyup(Drupal.coolmodule.handler);
};

Drupal.coolmodule = {};

Drupal.coolmodule.handler = function() {
	if (Drupal.coolmodule._timer) {
		clearTimeout(Drupal.coolmodule._timer);
	}
	
	var mask = this.value;
	
	Drupal.coolmodule._timer = setTimeout(function() {
		Drupal.coolmodule.filter_modules(mask);
	}, 500)
};

Drupal.coolmodule.restore = function() {
	$('#system-modules fieldset.collapsed').each(function () {
		Drupal.toggleFieldset(this);
		$(this).stop();
	});
	
	$('#system-modules .package tbody tr:hidden').show()
}

Drupal.coolmodule.collapse_empty_fieldsets = function() {
	$('#system-modules fieldset:not(.collapsed)').each(function() { 
		if ($(this).find('.package tbody tr:visible').size() == 0) {
			Drupal.toggleFieldset(this);
			$(this).stop();
		}  
	});	
}

Drupal.coolmodule.filter_modules = function(mask) {
	if (Drupal.coolmodule._lastMask == mask) {
		return;
	}
	Drupal.coolmodule._lastMask = mask;
	
	if (mask) {
		$('#system-modules input.form-checkbox').each(function() {
			if ($(this).val().indexOf(mask) == -1) {
				$(this).parents('tr').hide();
			}
			else {
				if ($(this).is(':hidden')) {
				}
			}
		})
		
		Drupal.coolmodule.collapse_empty_fieldsets();
	}
	else {
		Drupal.coolmodule.restore();
	}
	
	setTimeout(function() {
		Drupal.collapseScrollIntoView($('#system-modules').get(0));		
	}, 100);	
}