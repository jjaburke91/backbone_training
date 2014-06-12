var tags = ["*"],
	page = 1,
	pageSize = 5,
	excludes = [],
	baseUrl = "/scrip/article-listings";
	
	

// ***** MODELS *****

// Article model
var Article = Backbone.Model.extend( {
	intialize: function() {
		console.log("A new article has been created.");
	},
	
	defaults: {
		"id": 0,
		"title": "Default Article title",
		"summary": "This is the article summary. This is the article summary. This is the article summary. This is the article summary."
	}
});
var articles = {
	items: [],
	addItem: function(i) {
		this.items.push( new Article( {
			"id": i
		}));
	}
}	
for (var i=1; i <= 5; i++) { articles.addItem(i); }


// Listing model
var Listing = Backbone.Collection.extend({
	model: Article,
	url: createQueryURL(tags, page, pageSize, excludes)
});
var listing = new Listing(articles.items);



// ***** VIEWS ******

var ListingView = Backbone.View.extend( {
	el: $("#article-listing"),
	tagName: 'div',
	listingTmpl: Handlebars.compile( $("#article-template").html() ),
	collection: listing,
	
	initialize: function (options) {
		this.options = options || {};
		this.render();
	},
	
	render: function() {
		var that = this;
		
		this.collection.forEach( function(model) {
			that.$el.append( that.listingTmpl( model.toJSON() ) );
		});
					
		return this;
	}

});
var listingView = new ListingView();



// ***** MISC *****

function createQueryURL(tags, page, pageSize, excludes) {
    var url = "tags="+tags + "&page="+page + "&pageSize="+pageSize + "&returnExtraRow=true&exclude="+excludes;
    console.log("Controller Query URL: " + "http://localhost:8080/scrip/article-listings/get-tagged-articles-OR.json?" + url);
    return "http://localhost:8080/scrip/article-listings/get-tagged-articles-OR.json?" + url;
}
