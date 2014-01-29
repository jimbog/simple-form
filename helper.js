processClass = function(optionsHash) {
  if (optionsHash['class']) {
    html_class = " " + optionsHash['class']
  } else {
    html_class = ""
  }
  return html_class
}

processPlaceHolder = function(optionsHash) {
  if (optionsHash['placeholder']) {
    placeholder = " placeholder='" + optionsHash['placeholder'] + "' "
  } else {
    placeholder = ""
  }
  return placeholder
}

processLabel = function(optionsHash, field) {
  if (_.isString(optionsHash['label'])) {
    label_words = optionsHash['label']
  } else {
    label_words = _.humanize(field)
  }
  return label_words
}

buildLabel = function(optionsHash, field) {
  if (optionsHash['label'] === false) {
    return ''
  } else {
    label_words = processLabel(optionsHash, field)
    return "<label for='"+ field +"'>" + label_words + "</label>"
  }
}

/*----- HELPERS ------*/

Handlebars.registerHelper('text_field', function(field, options){
  var _this = this;
  if (!field) {
    return;
  }
  value = _this[field] || ""
  html_class = processClass(options.hash)
  type = options.hash['type'] || "text"
  placeholder = processPlaceHolder(options.hash)
  html = "<input type='"+ type +"' id='" + field + "' name='"+ field +"' value='"+ value +"' class='form-control"+ html_class +"'"+ placeholder +">"
  label = buildLabel(options.hash, field)
  return new Handlebars.SafeString(label + html);
});

Handlebars.registerHelper('text_area', function(field, options){
  var _this = this;
  if (!field) {
    return;
  }
  value = _this[field] || ""
  html_class = processClass(options.hash)
  if (options.hash['rows']) {
    rows = "rows='"+ options.hash['rows'] +"' "
  } else {
    rows = ""
  }

  html = "<textarea id='" + field + "' "+ rows +"name='"+ field +"' class='form-control"+ html_class +"'>"+ value +"</textarea>"
  label = buildLabel(options.hash, field)
  return new Handlebars.SafeString(label + html);
});

Handlebars.registerHelper('select_box', function(field, options) {
  var html_options,
  _this = this;
  if (!field) {
    return;
  }

  html_class = processClass(options.hash)

  if (options.hash.optionValues && options.hash.optionValues.length > 0) {
    optionsValues = options.hash.optionValues
  } else {
    optionsValues = _this["" + field + "Options"]();
  }

  html_options = [];
  _.each(optionsValues, function(option) {
    var selected;
    selected = _this[field] === option ? ' selected' : '';
    return html_options.push("<option value='" + option + "'" + selected + ">" + _.humanize(option) + "</option>");
  });
  html = "<select class='form-control" + html_class + "' name='" + field + "'>" + (html_options.join('')) + "</select>"
  label = buildLabel(options.hash, field)
  return new Handlebars.SafeString(label + html);
});


Handlebars.registerHelper('check_box', function(field) {
  var capitalizedField, checked;
  if (!field) {
    return;
  }
  html_class = processClass(options.hash)
  checked = this[field] === 'true' ? ' checked' : '';
  label = processLabel(options.hash, field)
  html = "<label for='"+ field +"'><input id='"+ field +"' name='" + field + "' type='hidden' value='false'><input name='" + field + "' class='"+ html_class +"' type='checkbox' value='true' " + checked + ">" + label + "</label>";
  return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('submit_button', function(text, options){
  var _this = this;
  klass = _this.constructor.name
  value = text || "Submit " + klass
  html_class = processClass(options.hash)
  html = "<input type='submit' value='"+ value +"' class='btn btn-default"+ html_class +"'>"
  return new Handlebars.SafeString(html);
});
