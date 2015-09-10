//
// CUSTOMIZABLE STUFF:
// 
// All geometries:
// 
//  - Color of each category
//  
// Point:
// 
//  - Marker width
//  - Marker fill opacity
//  - Stroke width
//  - Stroke color
//  - Stroke opacity
//  
// Polygon:
// 
//  - Polygon fill opacity
//  - Stroke width
//  - Stroke color
//  - Stroke opacity
//  
// Line:
// 
//  - Stroke width
//  - Stroke opacity
//
// TODO: Generate the right cartoCSS for the selected geometryType
// TODO: Allow more customization (fill, stroke, ...)
// TODO: What if the column doesn't exist?
//

CategoryCSSGenerator = function() {
  this.REQUIRED_OPTIONS = ['columnName'];
}

CategoryCSSGenerator.prototype.generateCartoCSS = function(options) {
  validatePresenceOfRequiredOptions(options);

  var visualizationType = options.visualizationType;
  var geometryType = options.geometryType;
  var tableName = options.tableName;
  var columnName = options.columnName;

  var colorSchema = options.colorSchema || 'blue';
  var categories = options.categories;

  var css = [];
  css.push(this._cartoCSSHeader(visualizationType));
  css.push(this._cartoCSSForTable(geometryType, tableName));
  css.push(this._cartoCSSForCategories(categories, tableName, columnName, colorSchema));

  return css.join("\n");
}


CategoryCSSGenerator.prototype._cartoCSSHeader = function(style) {
  var css = [];
  css.push("/** " + style + "**/\n\n");

  return css.join("\n");
}

CategoryCSSGenerator.prototype._cartoCSSForTable = function(geometryType, tableName) {
  var css = [];
  css.push('#' + tableName + '{');
  css.push('  marker-fill-opacity: 0.9;');
  css.push('  marker-line-color: #FFF;');
  css.push('  marker-line-width: 1;');
  css.push('  marker-line-opacity: 1;');
  css.push('  marker-placement: point;');
  css.push('  marker-type: ellipse;');
  css.push('  marker-width: 10;');
  css.push('  marker-allow-overlap: true;');
  css.push('}');

  return css.join("\n");
}

CategoryCSSGenerator.prototype._cartoCSSForCategories = function(categories, tableName, columnName, colorSchema) {
  var css = [];
  for (var i in categories) {
    css.push(this._cartoCSSForCategory(tableName, columnName, categories[i], COLOR_SCHEMAS[colorSchema][i]));
  }

  return css.join("\n");
}

CategoryCSSGenerator.prototype._cartoCSSForCategory = function(tableName, columnName, category, color) {
  var css = [];
  css.push('#' + tableName + '[' + columnName + '="' + category.name + '"] {');
  css.push('  marker-fill: ' + color + ';');
  css.push('}');

  return css.join("\n");
}

generators.CategoryCSSGenerator = CategoryCSSGenerator;
